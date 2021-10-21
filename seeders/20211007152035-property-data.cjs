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
        plotId: "Plot567",
        thumbnailUrl: "/images/land.jpeg",
        isTaken: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 1
      },
      {
        size: 600,
        price: 500000,
        unit: "sqm",
        plotId: "Plot568",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 1
      },
      {
        size: 600,
        price: 457300,
        unit: "sqm",
        plotId: "Plot569",
        thumbnailUrl: "/images/land.jpeg",
        isTaken: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 1
      },
      {
        size: 1200,
        price: 566000,
        unit: "sqm",
        plotId: "Plot570",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 2
      },
      {
        size: 1200,
        price: 880000,
        unit: "sqm",
        plotId: "Plot571",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 2
      },
      {
        size: 600,
        price: 354800,
        unit: "sqm",
        plotId: "Plot572",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 2
      },
      {
        size: 600,
        price: 872000,
        unit: "sqm",
        plotId: "Plot573",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 2
      },
      {
        size: 600,
        price: 3400000,
        unit: "sqm",
        plotId: "Plot574",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 2
      },
      {
        size: 600,
        price: 6433000,
        unit: "sqm",
        plotId: "Plot575",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 2
      },
      {
        size: 600,
        price: 200000000,
        unit: "sqm",
        plotId: "Plot576",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 3
      },
      {
        size: 600,
        price: 450000000,
        unit: "sqm",
        plotId: "Plot577",
        thumbnailUrl: "/images/land.jpeg",
        isTaken: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 3
      },
      {
        size: 600,
        price: 76400000,
        unit: "sqm",
        plotId: "Plot578",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 3
      },
      {
        size: 600,
        price: 58430000,
        unit: "sqm",
        plotId: "Plot579",
        thumbnailUrl: "/images/land.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        PropertyCategoryId: 3
      }
    ]);

    await queryInterface.bulkInsert('Sale', [
      {
        paymentProvider: 'offline',
        paymentReference: 'kv0yiekpbr3m9a980b',
        amount: 400000,
        clientHasConfirmedPayment: true,
        webhookHasConfirmedPayment: true,
        PropertyId: 1,
        PersonaId: 5
      },
      {
        paymentProvider: 'offline',
        paymentReference: 'kv0zgl4rp4dvilv0sv',
        amount: 457300,
        clientHasConfirmedPayment: true,
        webhookHasConfirmedPayment: true,
        PropertyId: 3,
        PersonaId: 5
      },
      {
        paymentProvider: 'offline',
        paymentReference: 'kv0zt6us23vviejeook',
        amount: 450000000,
        clientHasConfirmedPayment: true,
        webhookHasConfirmedPayment: true,
        PropertyId: 11,
        PersonaId: 5
      },
      {
        paymentProvider: 'offline',
        paymentReference: 'kv10r2xtq35s4ano83r',
        amount: 354800,
        clientHasConfirmedPayment: true,
        webhookHasConfirmedPayment: false,
        PropertyId: 6,
        PersonaId: 5
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
