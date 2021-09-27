import * as sequelizeExport from 'sequelize';

const { Model } = sequelizeExport.default || sequelizeExport;

export default (sequelize, DataTypes) => {
  class Agenda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Agenda.belongsToMany(models.Speaker, { through: 'AgendaSpeaker', uniqueKey: false });
    }
  };
  Agenda.init({
    title: DataTypes.STRING,
    startTimestamp: DataTypes.STRING,
    endTimestamp: DataTypes.STRING,
    description: DataTypes.TEXT,
    youtubeLink: DataTypes.STRING,
    mainSpeakerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Agenda',
  });
  return Agenda;
};