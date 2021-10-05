import Sequelize from 'sequelize';
import models, { sequelize } from '../models/index.js';
import sha256 from 'js-sha256';

const addCohost = async (req, res) => {
    // generates n pin initializers to be used in a Model.create() method
    let pins_ = {
        [Symbol.iterator]() {
            let numberOfPins = req.body.numberOfPins;
            return {
                next() {
                    const done = numberOfPins-- < 1;
                    const value = {}; // the initializer
                    return { value, done }
                }
            }
        }
    }

    const t = await sequelize.transaction();
    try {
        const user = await models.Persona.create({
            name: req.body.name,
            inactive: 0, // cohosts don't need OTP validation
            class: 'cohost'
        }, { transaction: t });

        const cohost = await user.createCohost({
            name: req.body.name,
        }, { transaction: t });

        let newPinPromises = Array.from(pins_).map(pin => {
            return cohost.createPin(pin, { transaction: t });
        });
        let pins = await Promise.all(newPinPromises);

        await t.commit();

        delete user.dataValues["id"];
        res.status(201)
            .json({
                data: { cohost: user, pins },
                message: 'Cohost created successfully'
            })
    } catch (error) {
        await t.rollback();
        console.log(error);
        res.status(500)
            .json({ message: 'There was an error while creating the Cohost' });
    }
}

const inviteGuest = (req, res) => {
    models.Pin.findOne({
        where: {
            CohostId: req.body.cohostId,
            PersonaId: null
        },
    }).then(pin => {
        pin.createPersona({
            name: req.body.guestName
        }).then(guest => {
            res.status(201)
                .json({
                    data: { pin, guest },
                    message: 'Guest added successfully'
                })
        }).catch(error => {
            console.log(error);
            res.status(500)
                .json({
                    message: 'Error adding guest'
                });
        })
    }).catch(error => {
        // don't log, it's not an error
        res.status(400)
            .json({
                message: 'Cohost can no longer add any guest'
            });
    })
}

const submitPin = (req, res) => {
    models.Pin.findByPk(req.body.pin)
        .then(async pin => {
            const user = await pin.getPersona();
            res.status(200)
                .json({
                    data: user.name,
                    token: user.generateJwt(pin.pin),
                    message: 'Pin correct'
                })
        }).catch(error => {
            console.log(error);
            res.status(400)
                .json({
                    message: 'Pin incorrect'
                });
        })
}

const updateDetails = (req, res) => {
    models.Pin.findOne({ where: { pin: req.payload.pin } })
        .then(async pin => {
            const user = await pin.getPersona();
            user.email = req.body.email;
            user.phone = req.body.phoneNumber;
            user.deviceId = req.body.deviceId;
            user.inactive = Math.floor(1000 + Math.random() * 9000);
            return user.save();
        }).then(user => {
            const otp = user.inactive;
            user.inactive = undefined; // remove from object
            res.status(200)
                .json({
                    data: sha256(otp.toString()),
                    message: 'Details updated successfully',
                    metadata: {
                        testOTP: otp,
                        description1: 'data.otp is a sha256 hash of OTP',
                        description2: 'The sha256 hash of user\'s OTP input must match data.otp',
                    }
                })
        }).catch(error => {
            console.log(error);
            res.status(400)
                .json({
                    message: 'Details update failed, invite not found'
                });
        })
}

const submitDetails = (req, res) => {
    models.Persona.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phoneNumber,
        deviceId: req.body.deviceId,
        inactive: Math.floor(1000 + Math.random() * 9000)
    }).then(async user => {
        // This general cohost of id 1, added with a seeder,
        // handles all open guests and invites
        const generalCohost = await models.Cohost.findByPk(1);
        const pin = await generalCohost.createPin({
            PersonaId: user.id
        });
        const otp = user.inactive;
        user.inactive = undefined; // remove from object
        res.status(201)
            .json({
                data: sha256(otp.toString()),
                token: user.generateJwt(pin.pin),
                message: 'Account created successfully',
                metadata: {
                    testOTP: otp,
                    description1: 'data.otp is a sha256 hash of OTP',
                    description2: 'The sha256 hash of user\'s OTP input must match data.otp',
                }
            })
    }).catch(error => {
        console.log(error);
        res.status(500)
            .json({ message: 'Account creation failed' });
    })
}

const verifyOTP = (req, res) => {
    models.Persona.findOne({
        where: {
            email: req.body.email,
            inactive: req.body.otp
        }
    }).then(user => {
        user.inactive = 0;
        user.save()
            .then(user => {
                res.status(200)
                    .json({
                        data: { user },
                        message: 'OTP validated successfully'
                    })
            }).catch(() => { });
    }).catch(() => {
        res.status(400)
            .json({ message: 'OTP validation failed' })
    });
}

const setUserSeat = async (req, res) => {
    try {
        await models.Seat.findOrCreate({
            where: { pin: req.body.pin },
            defaults: {
                pin: req.body.pin,
                seatNumber: req.body.seatNumber,
                tableNumber: req.body.tableNumber
            }
        }).then(seat_ => {
            if (seat_[1]) // return if we created a new record...
                return res.status(201).json({
                    data: seat_[0],
                    message: "New sit created successfully"
                });

            // ...or modify existing record if it exists already
            // seatNumber is unique, so a possible exception can be thrown here
            seat_[0].seatNumber = req.body.seatNumber;
            seat_[0].tableNumber = req.body.tableNumber;
            seat_[0].save()
                .then(seat => {
                    res.status(200).json({ data: seat, message: "Seat modified successfully" });
                }).catch(err => {
                    if (err instanceof Sequelize.UniqueConstraintError)
                        return seatIsAlreadyAllocated();
                    else
                        res.status(400).json({ message: "Seat set failed" });
                });
        })
    } catch (err) { // should catch if seatNumber is having an attempted duplicate
        if (err instanceof Sequelize.UniqueConstraintError)
            return seatIsAlreadyAllocated();
        res.status(500).json({ message: "Unknown error while setting sit" });
    }

    const seatIsAlreadyAllocated = () => {
        return models.Seat.findOne({
            where: { seatNumber: req.body.seatNumber }
        }).then(async usedSeat => {
            let pin = await usedSeat.getPin();
            let usedId = await pin.getPersona();
            usedId = usedId.id;

            // is seatNumber unique?
            return res.status(409).json({
                message: `It appears a seat ${req.body.seatNumber} has been allocated`
                    + ` to a userId ${usedId}`
            });
        });
    }
}

const getUserSeat = (req, res) => {
    models.Seat.findOne({
        where: { pin: req.payload.pin }
    }).then(async seat => {
        if (seat)
            res.status(200).json({ data: seat, message: "Success" });
        else
            res.status(404).json({ message: "No seat allocated to user pin" });
    });
}

export {
    addCohost,
    inviteGuest,
    submitPin,
    updateDetails,
    submitDetails,
    verifyOTP,
    setUserSeat,
    getUserSeat
}