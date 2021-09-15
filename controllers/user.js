import Sequelize from 'sequelize';
import models, { sequelize } from '../models/index.js';
import passport from 'passport';

const addCohost = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const user = await models.Persona.create({
            name: req.body.name,
            class: 'Cohost'
        }, { transaction: t });

        await user.addSibling({
            firstName: 'Lisa',
            lastName: 'Simpson'
        }, { transaction: t });

        await t.commit();
    } catch (error) {
        await t.rollback();
    }
}

export { addCohost }