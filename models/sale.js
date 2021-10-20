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
      Sale.belongsTo(models.Persona);
      Sale.belongsTo(models.Property);
    }
  };

  Sale.init({
    paymentProvider: DataTypes.ENUM('paystack', 'offline'),
    paymentReference: DataTypes.STRING,
    amount: DataTypes.STRING,
    clientHasConfirmedPayment: DataTypes.BOOLEAN,
    webhookHasConfirmedPayment: DataTypes.BOOLEAN,
    paymentGatewayPayload: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Sale',
  });
  return Sale;
};