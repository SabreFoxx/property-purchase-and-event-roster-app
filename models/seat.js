import * as sequelize from 'sequelize';

const { Model } = sequelize.default || sequelize;

export default (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Seat.belongsTo(models.Pin, {
        foreignKey: 'pin'
      })
    }
  };
  Seat.init({
    pin: DataTypes.INTEGER,
    taken: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};