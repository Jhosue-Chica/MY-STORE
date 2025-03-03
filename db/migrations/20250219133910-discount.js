'use strict';
const { DISCOUNT_TABLE, DiscountSchema } = require('./../models/discount.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(DISCOUNT_TABLE, DiscountSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(DISCOUNT_TABLE);
  },
};
