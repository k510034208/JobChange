'use strict';
var tools = require('../modules/tools')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        user_name: "Production001",
        password: tools.hashSha256('a'),
      },
      {
        id: 2,
        user_name: "Production002",
        password: tools.hashSha256('b'),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, [{
      id:1
    }]);
  }
};
