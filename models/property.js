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
      Property.addScope('visibleProperty', {
        where: { isHiddenTill: null },
        attributes: { exclude: ['isHiddenTill'] }
      });
      models.PropertyCategory.addScope('visibleProperties', {
        include: [{ model: models.Property.scope('visibleProperty') }]
      });

      Property.hasMany(models.Sale);
    }
  };

  Property.init({
    plotId: DataTypes.STRING,
    size: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    price: DataTypes.INTEGER,
    thumbnailUrl: DataTypes.STRING,
    isTaken: DataTypes.BOOLEAN,
    isHiddenTill: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};