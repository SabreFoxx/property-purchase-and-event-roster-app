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
        name: 'Vivian Chinaza',
        titles: 'Lady.',
        bio: 'Vivian Chinaza is the founder and chief executive officer of Bonitas Property. ' +
          'From a small office in her one-room apartment, she led her company to the ' +
          'limelight in just two years with over 6 billion dollars in sales and acquisition ' +
          'of land property. Her outstanding leadership method and strategies in the affairs ' +
          'of her company has made them the pace-setters in the real estate industry. ' +
          'She is the author of two New York Times best-selling books; The Secrets of Real ' +
          'Estate and How I made $6 billion in 2 years. ' +
          'She is an alumna of Nnamdi Azikiwe University Awka where she studied Journalism.',
        thumbnailUrl: '/images/vivian.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bede Nwamuo',
        titles: 'Chief. Dr. Mr.',
        bio: 'He is a well deserved man who loves to speak in the public',
        thumbnailUrl: '/images/bede.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Eterhime Eyekpegha',
        titles: 'Oje Na Muo. Prof. Dr.',
        bio: 'He is a well deserved man who loves to speak to the public',
        thumbnailUrl: '/images/etel.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nnamdi Azikiwe',
        titles: 'Presdo. Dr.',
        bio: 'Nnamdi Benjamin Azikiwe, usually referred to as "Zik", was a Nigerian ' +
          'statesman and political leader who served as the first President of Nigeria ' +
          'from 1963 to 1966. Considered a driving force behind the nation\'s ' +
          'independence, he came to be known as the "father of Nigerian Nationalism"',
        thumbnailUrl: '/images/nnamdi.png',
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
        // see 1127 in pin.js
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
