'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      'Sale',
      'PropertyId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Property',
          key: 'id'
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
      }
    );

    await queryInterface.addColumn(
      'Sale',
      'PersonaId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Persona',
          id: 'key'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('PropertyId');
    await queryInterface.removeColumn('PersonaId');
  }
};
