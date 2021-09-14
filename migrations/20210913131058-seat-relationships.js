'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // Seat.belongsTo(models.Pin)
    await queryInterface.addColumn(
      'Seat',
      'pin',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Pin',
          key: 'pin'
        }
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
    await queryInterface.removeColumn('Seat', 'pin')
  }
};
