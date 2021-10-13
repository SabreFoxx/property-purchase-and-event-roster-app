import * as sequelizeExport from 'sequelize';

const { Model } = sequelizeExport.default || sequelizeExport;

export default (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sale.hasMany(models.Property);
      Sale.hasMany(models.Persona);
    }
  };
  
  Sale.init({
    paymentProvider: DataTypes.STRING,
    paymentReference: DataTypes.STRING,
    amount: DataTypes.STRING,
    clientHasConfirmedPayment: DataTypes.BOOLEAN,
    webhookHasConfirmedPayment: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Sale',
  });
  return Sale;
};