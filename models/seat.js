import * as sequelizeExport from 'sequelize';

const { Model } = sequelizeExport.default || sequelizeExport;

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
    seatNumber: {
      type: DataTypes.INTEGER,
      unique: true
    },
    tableNumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};