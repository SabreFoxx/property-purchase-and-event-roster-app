'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pin', {
      pin: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      valid: {
        type: Sequelize.BOOLEAN
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
    // set initial auto increment value for Postgres, doesn't work for MySQL
    if (queryInterface.sequelize.getDialect() == 'postgres')
      await queryInterface.sequelize
        .query('ALTER SEQUENCE "Pin_pin_seq" RESTART WITH 1111', { raw: true });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Pin');
  }
};