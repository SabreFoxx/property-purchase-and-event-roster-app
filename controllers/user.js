import models, { sequelize } from '../models/index.js';

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

const submitPin = (req, res) => {
    
}

export { addCohost, submitPin }