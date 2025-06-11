'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Products', [
      {
        id: 1,
        name: 'Пивко',
        description: 'Полезное',
        img: 'пивко.jpg',
        price: 100,
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Второе пивко',
        description: 'Вкусное',
        img: 'пивко.jpg',
        price: 120,
        stock: 75,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Третье пивко',
        description: 'холодное',
        img: 'пивко.jpg',
        price: 140,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Четвертое пивко',
        description: 'завершающее',
        img: 'пивко.jpg',
        price: 160,
        stock: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};