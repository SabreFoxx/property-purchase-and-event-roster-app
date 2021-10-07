import * as sequelizeExport from 'sequelize';
import env from 'dotenv';
env.config();

const { Model } = sequelizeExport.default || sequelizeExport;

export default (sequelize, DataTypes) => {
  class PropertyCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PropertyCategory.hasMany(models.Property);
    }
  };
  PropertyCategory.init({
    categoryName: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'PropertyCategory',
  });
  return PropertyCategory;
};