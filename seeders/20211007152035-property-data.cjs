'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('PropertyCategory', [
      {
        categoryName: 'Detached Plots',
        description: 'This plot of land is situated at the heart of GVE.'
          + 'It features a very comfortable view and fresh wind.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Terrace',
        description: 'This plot of land is situated at the heart of GVE.'
          + 'It features a very comfortable view and fresh wind.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryName: 'Luxury',
        description: 'This plot of land is situated at the heart of GVE.'
          + 'It features a very comfortable view and fresh wind.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    await queryInterface.bulkInsert('Property', [
      {
        size: 600,
        price: 400000,
        unit: "sqm",
        plotId: "Plot 567",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 1
      },
      {
        size: 600,
        price: 500000,
        unit: "sqm",
        plotId: "Plot 568",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 1
      },
      {
        size: 600,
        price: 457300,
        unit: "sqm",
        plotId: "Plot 569",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 1
      },
      {
        size: 1200,
        price: 566000,
        unit: "sqm",
        plotId: "Plot 570",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 2
      },
      {
        size: 1200,
        price: 880000,
        unit: "sqm",
        plotId: "Plot 571",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 2
      },
      {
        size: 600,
        price: 354800,
        unit: "sqm",
        plotId: "Plot 572",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 2
      },
      {
        size: 600,
        price: 872000,
        unit: "sqm",
        plotId: "Plot 573",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 2
      },
      {
        size: 600,
        price: 3400000,
        unit: "sqm",
        plotId: "Plot 574",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 2
      },
      {
        size: 600,
        price: 6433000,
        unit: "sqm",
        plotId: "Plot 575",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 2
      },
      {
        size: 600,
        price: 200000000,
        unit: "sqm",
        plotId: "Plot 576",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 3
      },
      {
        size: 600,
        price: 450000000,
        unit: "sqm",
        plotId: "Plot 577",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 3
      },
      {
        size: 600,
        price: 76400000,
        unit: "sqm",
        plotId: "Plot 578",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 3
      },
      {
        size: 600,
        price: 58430000,
        unit: "sqm",
        plotId: "Plot 579",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 3
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
