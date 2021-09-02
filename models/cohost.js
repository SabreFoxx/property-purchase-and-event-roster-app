import * as sequelize from 'sequelize';
import { Sequelize } from 'sequelize';

const { Model } = sequelize.default || sequelize;

export default (sequelize, DataTypes) => {
  class Cohost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cohost.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    personaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cohost'
  });
  return Cohost;
};