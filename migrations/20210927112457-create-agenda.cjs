'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Agenda', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      startTimestamp: {
        type: Sequelize.STRING
      },
      endTimestamp: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      youtubeLink: {
        type: Sequelize.STRING
      },
      mainSpeakerId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Agenda');
  }
};