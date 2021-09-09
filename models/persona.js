'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Persona extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Persona.init({
    name: DataTypes.STRING,
    title: {
      type: DataTypes.ENUM,
      values: ['Mr.', 'Mrs.', 'Master', 'Miss', 'Chief', 'Lady', 'Dr.', 'Barr.', 'Engr.', 'Arc.']
    },
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    class: {
      type: DataTypes.ENUM,
      values: ['Cohost', 'Invitee']
    },
    type: {
      type: DataTypes.ENUM,
      values: ['Person', 'Company']
    }
  }, {
    sequelize,
    modelName: 'Persona',
  });
  return Persona;
};