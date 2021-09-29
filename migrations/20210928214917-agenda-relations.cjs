'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // Agenda.belongsTo(models.Speaker)
    await queryInterface.addColumn(
      'Agenda',
      'MainSpeakerId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Speaker',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    );

    await queryInterface.createTable(
      'AgendaSpeaker',
      {
        AgendaId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Agenda',
            key: 'id'
          }
        },
        SpeakerId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Speaker',
            key: 'id'
          }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(
      'Agenda',
      'MainSpeakerId'
    );
    await queryInterface.dropTable('AgendaSpeaker');
  }
};
