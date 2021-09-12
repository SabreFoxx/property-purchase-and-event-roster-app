import * as sequelize from 'sequelize';

const { Model } = sequelize.default || sequelize;

export default (sequelize, DataTypes) => {
  class Pin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pin.hasOne(models.Seat, {
        foreignKey: 'pin'
      });
      Pin.belongsTo(models.Persona);
      Pin.belongsTo(models.Cohost);
    }
  };
  Pin.init({
    pin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
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