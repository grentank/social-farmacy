// seeders/demo-buckets.js
'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Buckets', [
      {
        user_id: 1,
        product_id: 1,
        status: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        product_id: 4,
        status: true, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        product_id: 2,
        status: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        product_id: 3,
        status: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        product_id: 4,
        status: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Buckets', null, {});
  }
};