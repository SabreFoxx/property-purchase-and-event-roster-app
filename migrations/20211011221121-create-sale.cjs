'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sale', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      paymentProvider: {
        type: Sequelize.ENUM('paystack', 'offline')
      },
      paymentReference: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      clientHasConfirmedPayment: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      webhookHasConfirmedPayment: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      paymentGatewayPayload: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sale');
  }
};