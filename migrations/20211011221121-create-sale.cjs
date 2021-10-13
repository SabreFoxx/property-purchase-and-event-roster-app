'use strict';

const { DataTypes } = require("sequelize/types");

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
        type: Sequelize.STRING
      },
      paymentReference: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      clientHasConfirmedPayment: {
        type: DataTypes.BOOLEAN
      },
      webhookHasConfirmedPayment: {
        type: DataTypes.BOOLEAN
      },
      paymentGatewayPayload: {
        type: DataTypes.JSON
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