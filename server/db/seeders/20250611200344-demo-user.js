'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'Петр Петрович Петухов',
        email: 'anna@example.com',
        password: 'hashed_password_1',
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Бабуля1',
        email: 'babulia@example.com',
        password: 'hashed_password_2',
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Бабуля2',
        email: 'babulia@example.com',
        password: 'hashed_password_3',
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};