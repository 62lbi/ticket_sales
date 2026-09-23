'use strict';
let md5 = require('md5') //added ts
const now = new Date() //added

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { //added 3 users
    await queryInterface.bulkInsert('users', [{
      firstname: "albus",
      lastname: "dumbledore",
      email: "albus@gmail.com",
      password: md5("12345"),
      role: "admin",
      createdAt: now,
      updatedAt: now
    }, {
      firstname: "harry",
      lastname: "potter",
      email: "harry@gmail.com",
      password: md5("12345"),
      role: "user",
      createdAt: now,
      updatedAt: now
    }, {
      firstname: "ron",
      lastname: "weasly",
      email: "ron@gmail.com",
      password: md5("12345"),
      role: "user",
      createdAt: now,
      updatedAt: now
    }
  ])
  },

  async down (queryInterface, Sequelize) { //added this too
    await queryInterface.bulkDelete('users', null, {});
  }
};
