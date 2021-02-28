'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      c_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING
      },
      application_requirement: {
        type: Sequelize.STRING(65535)
      },
      analysis_memo: {
        type: Sequelize.TEXT
      },
      selection_status: {
        type: Sequelize.STRING(65535),
        allowNull: false,
      },
      selection_next_date: {
        type: Sequelize.STRING,
      },
      selection_next_content: {
        type: Sequelize.STRING
      },
      selection_memo: {
        type: Sequelize.STRING(65535)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Companies');
  }
};