import models, { sequelize } from '../models/index.js';
import sha1 from 'js-sha1';

const addCohost = async (req, res) => {
    let pins_ = {
        [Symbol.iterator]() {
            let numberOfPins = req.body.numberOfPins;
            return {
                next() {
                    const done = numberOfPins-- < 1;
                    const value = {};
                    return { value, done }
                }
            }
        }
    }

    const t = await sequelize.transaction();

    try {
        const user = await models.Persona.create({
            name: req.body.name,
            class: 'Cohost'
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

}

const submitPin = (req, res) => {
    const pin = models.Pin.findByPk(req.body.pin, { include: models.Persona })
        .then(() => {
            res.status(200)
                .json({
                    data: {
                        name: pin.persona.name,
                        user: pin.persona
                    },
                    token: pin.persona.generateJwt(pin.pin),
                    message: 'Pin correct'
                })
        })
        .catch(error => {
            console.log(error);
            res.status(400)
                .json({
                    message: 'Pin incorrect'
                });
        })
}

const updateDetails = (req, res) => {
    const pin = models.Pin.findByPk(req.body.pin, { include: models.Persona })
        .then(() => {
            pin.persona.email = req.body.email;
            pin.persona.phone = req.body.phone;
            return pin.persona.save();
        })
        .then(() => {
            res.status(200)
                .json({
                    data: {
                        otp: sha1(1234),
                        user: pin.persona
                    },
                    message: 'Details updated successfully'
                })
        })
        .catch(error => {
            console.log(error);
            res.status(400)
                .json({
                    message: 'Details update failed, invite not found'
                });
        })
}

const submitDetails = (req, res) => {
    // TODO there will be a general cohost that invites all
    // this cohost will be created first using seed, and its pin will start from 11111
    const user = models.Persona.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    })
        .then(async () => {
            // This general cohost invites all open guests
            const generalCohost = await models.Cohost.findByPk(1);
            const pin = await generalCohost.createPin({
                PersonaId: user.getId()
            });
            res.status(200)
                .json({
                    data: {
                        user,
                        pin: pin.pin,
                        otp: sha1(1234),
                        token: user.generateJwt(pin.pin)
                    },
                    message: 'Account created successfully'
                })
        })
        .catch(error => {
            console.log(error);
            res.status(400)
                .json({
                    message: 'Account creation unsuccessful'
                });
        })
}

export { addCohost, submitPin, updateDetails, submitDetails }