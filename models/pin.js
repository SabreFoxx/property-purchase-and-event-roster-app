'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Pin.init({
    pin: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cohostId: DataTypes.INTEGER,
    seatId: DataTypes.INTEGER,
    valid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Pin',
  });
  return Pin;
};