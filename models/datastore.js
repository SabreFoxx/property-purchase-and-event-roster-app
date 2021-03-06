import * as sequelizeExport from 'sequelize';

const { Model } = sequelizeExport.default || sequelizeExport;

export default (sequelize, DataTypes) => {
  class DataStore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DataStore.init({
    key: {
      type: DataTypes.STRING,
      unique: true
    },
    value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DataStore',
  });
  return DataStore;
};