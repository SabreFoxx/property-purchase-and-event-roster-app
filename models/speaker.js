import * as sequelizeExport from 'sequelize';

const { Model } = sequelizeExport.default || sequelizeExport;

export default (sequelize, DataTypes) => {
  class Speaker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Speaker.belongsToMany(models.Agenda, { through: 'AgendaSpeaker', uniqueKey: false })
    }
  };
  Speaker.init({
    name: DataTypes.STRING,
    titles: DataTypes.STRING,
    bio: DataTypes.TEXT,
    thumbnailUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Speaker',
  });
  return Speaker;
};