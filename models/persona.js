import * as sequelizeExport from 'sequelize';

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