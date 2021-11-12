import * as sequelizeExport from 'sequelize';

const { Model } = sequelizeExport.default || sequelizeExport;

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
    // set initial auto increment value for MySQL, doesn't work for Postgres
    // see 1127 in seed file test-data.cjs
    initialAutoIncrement: 1127
  });
  return Pin;
};