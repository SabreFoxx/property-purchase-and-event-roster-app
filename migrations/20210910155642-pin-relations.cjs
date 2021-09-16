'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // Pin.belongsTo(models.Persona);
    await queryInterface.addColumn(
      'Pin',
      'PersonaId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Persona',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      }
    )
      // Pin.belongsTo(models.Cohost);
      .then(() => {
        return queryInterface.addColumn(
          'Pin',
          'CohostId',
          {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'Cohost',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            allowNull: false
          }
        )
      })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Pin', 'PersonaId')
      .then(() => {
        return queryInterface.removeColumn('Pin', 'CohostId');
      })
  }
};
