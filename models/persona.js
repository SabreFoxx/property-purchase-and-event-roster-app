import * as sequelizeExport from 'sequelize';
import env from 'dotenv';
import jwt from 'jsonwebtoken';
env.config();

const { Model } = sequelizeExport.default || sequelizeExport;

export default (sequelize, DataTypes) => {
  class Persona extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Persona.hasOne(models.Pin);
      Persona.hasOne(models.Cohost);
    }

    /**
     * generates a signed jwt token for this user account object
     */
    generateJwt(pin) {
      const expiry = new Date;
      expiry.setDate(expiry.getDate() + 7);
      return jwt.sign({
        pin: pin,
        exp: parseInt(expiry.getTime() / 1000, 10)
      }, process.env.JWT_SECRET);
    }
  };

  Persona.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    class: {
      type: DataTypes.ENUM,
      values: ['Cohost', 'Invitee'],
      defaultValue: 'Invitee'
    }
  }, {
    sequelize,
    modelName: 'Persona',
  });
  return Persona;
};