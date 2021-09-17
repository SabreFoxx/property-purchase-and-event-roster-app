import models, { sequelize } from '../models/index.js';
import sha1 from 'js-sha1';

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

        res.status(200)
            .json({
                data: { cohost: user, pins },
                message: 'Cohost created successfully'
            })
    } catch (error) {
        await t.rollback();
        console.log(error);
        res.status(503)
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
            res.status(200)
                .json({
                    data: { pin, guest },
                    message: 'Guest added successfully'
                })
        }).catch(error => {
            console.log(error);
            res.status(400)
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
                    data: { name: user.name, user },
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
    models.Pin.findByPk(req.payload.pin)
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
                    data: { otp: sha1(otp), user },
                    message: 'Details updated successfully',
                    metadata: {
                        testOTP: otp,
                        description1: 'data.otp is a sha1 hash of OTP',
                        description2: 'The sha1 hash of user\'s OTP input must match data.otp',
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
        res.status(200)
            .json({
                data: {
                    otp: sha1(otp),
                    user,
                    pin: pin.pin,
                },
                token: user.generateJwt(pin.pin),
                message: 'Account created successfully',
                metadata: {
                    testOTP: otp,
                    description1: 'data.otp is a sha1 hash of OTP',
                    description2: 'The sha1 hash of user\'s OTP input must match data.otp',
                }
            })
    }).catch(error => {
        console.log(error);
        res.status(400)
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

export { addCohost, inviteGuest, submitPin, updateDetails, submitDetails, verifyOTP }