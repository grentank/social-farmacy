
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Sales', [
      {
        user_id: 1,
        product_id: 4,
        date_start: new Date('2023-01-15'),
        date_end: new Date('2023-02-15'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        product_id: 3,
        date_start: new Date('2023-02-01'),
        date_end: new Date('2023-03-01'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        product_id: 1,
        date_start: new Date('2023-03-10'),
        date_end: new Date('2023-04-10'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        product_id: 2,
        date_start: new Date('2023-04-05'),
        date_end: new Date('2023-05-05'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sales', null, {});
  }
};