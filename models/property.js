import * as sequelizeExport from 'sequelize';
import env from 'dotenv';
env.config();

const { Model } = sequelizeExport.default || sequelizeExport;

export default (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Property.belongsTo(models.PropertyCategory);
      Property.belongsTo(models.Sale);
    }
  };
  Property.init({
    plotId: DataTypes.STRING,
    size: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    price: DataTypes.INTEGER,
    thumbnailUrl: DataTypes.STRING,
    isTaken: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};