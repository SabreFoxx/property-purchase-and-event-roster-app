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
    await queryInterface.bulkInsert('Persona', [
      {
        name: 'Adanonso',
        class: 'cohost',
        inactive: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nnaemeka',
        class: 'cohost',
        inactive: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jide',
        class: 'cohost',
        inactive: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ndidiamaka',
        phone: '123456',
        email: 'ndidi@gmail.com',
        class: 'invitee',
        inactive: 0,
        deviceId: 'ABCDEFG',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chiamaka',
        class: 'invitee',
        inactive: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chisimdi',
        phone: '123456',
        email: 'simdi@gmail.com',
        class: 'invitee',
        inactive: 3944,
        deviceId: 'ABCDEFG',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chikodi',
        class: 'invitee',
        inactive: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Okodie',
        class: 'invitee',
        inactive: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Femi',
        class: 'invitee',
        inactive: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lotanna',
        phone: '123456',
        email: 'lota@gmail.com',
        class: 'invitee',
        inactive: 0,
        deviceId: 'ABCDEFG',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

    await queryInterface.bulkInsert('Cohost', [
      {
        name: 'Adanonso',
        PersonaId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nnaemeka',
        PersonaId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jide',
        PersonaId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

    await queryInterface.bulkInsert('Speaker', [
      {
        name: 'Dorothy Carnwill',
        titles: 'Chief. Lady. Mrs.',
        bio: 'She is a well deserved woman who loves to speak to the public',
        thumbnailUrl: '/images/speakers/1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Luke Skyhaven',
        titles: 'Chief. Barr. Mr.',
        bio: 'He is a well deserved man who loves to speak to the public',
        thumbnailUrl: '/images/speakers/2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kelvin Hart',
        titles: 'Lord. Prof. Mr.',
        bio: 'He is a well deserved man who loves to speak to the public',
        thumbnailUrl: '/images/speakers/3.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dwain Johnson',
        titles: 'Lord. Prof. Mr.',
        bio: 'He is a well deserved man who loves to speak to the public',
        thumbnailUrl: '/images/speakers/4.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);

    await queryInterface.bulkInsert('Agenda', [
      {
        title: 'Opening prayer',
        startDatetime: '2021-10-01 11:06:22.000 +00:00',
        endDatetime: '2021-10-01 12:06:22.000 +00:00',
        description: 'This is an important event',
        youtubeLink: 'youtube.com',
        MainSpeakerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'National anthem',
        startDatetime: '2021-10-01 11:06:22.000 +00:00',
        endDatetime: '2021-10-01 12:06:22.000 +00:00',
        description: 'This is an important event',
        youtubeLink: 'youtube.com',
        MainSpeakerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cutting of kolanut',
        startDatetime: '2021-10-01 11:06:22.000 +00:00',
        endDatetime: '2021-10-01 12:06:22.000 +00:00',
        description: 'This is an important event',
        youtubeLink: 'youtube.com',
        MainSpeakerId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'HSE presentation',
        startDatetime: '2021-10-01 11:06:22.000 +00:00',
        endDatetime: '2021-10-01 12:06:22.000 +00:00',
        description: 'This is an important event',
        youtubeLink: 'youtube.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'GVE main event',
        startDatetime: '2021-10-01 11:06:22.000 +00:00',
        endDatetime: '2021-10-01 12:06:22.000 +00:00',
        description: 'This is an important event',
        youtubeLink: 'youtube.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Closing prayer',
        startDatetime: '2021-10-01 11:06:22.000 +00:00',
        endDatetime: '2021-10-01 12:06:22.000 +00:00',
        description: 'This is an important event',
        youtubeLink: 'youtube.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);

    await queryInterface.bulkInsert('AgendaSpeaker', [
      {
        AgendaId: 1,
        SpeakerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        AgendaId: 1,
        SpeakerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        AgendaId: 1,
        SpeakerId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        AgendaId: 6,
        SpeakerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        AgendaId: 6,
        SpeakerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        AgendaId: 6,
        SpeakerId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);

    await queryInterface.bulkInsert('Pin', [
      {
        pin: 1111,
        valid: true,
        PersonaId: 5,
        CohostId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pin: 1112,
        valid: true,
        PersonaId: 6,
        CohostId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pin: 1113,
        valid: true,
        CohostId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pin: 1114,
        valid: true,
        CohostId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pin: 1115,
        valid: true,
        CohostId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pin: 1116,
        valid: true,
        PersonaId: 7,
        CohostId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pin: 1117,
        valid: true,
        PersonaId: 8,
        CohostId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pin: 1118,
        valid: true,
        CohostId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pin: 1119,
        valid: true,
        CohostId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pin: 1120,
        valid: true,
        CohostId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pin: 1121,
        valid: true,
        PersonaId: 9,
        CohostId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pin: 1122,
        valid: true,
        PersonaId: 10,
        CohostId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pin: 1123,
        valid: true,
        CohostId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pin: 1124,
        valid: true,
        CohostId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pin: 1125,
        valid: true,
        CohostId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        pin: 1126,
        valid: true,
        PersonaId: 11,
        CohostId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);

    queryInterface.bulkInsert('Seat', [
      {
        seatNumber: 14,
        tableNumber: 3,
        pin: 1111,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        seatNumber: 15,
        tableNumber: 3,
        pin: 1117,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    if (queryInterface.sequelize.getDialect() == 'postgres')
      await queryInterface.sequelize
        // if you don't update this with the last seeded value of Pin in this file,
        // we'd have problems with the unique constraint of Pin
        .query('ALTER SEQUENCE "Pin_pin_seq" RESTART WITH 1127', { raw: true });
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
