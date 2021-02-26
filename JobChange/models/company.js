'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Company.init({
    c_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: DataTypes.STRING,
    application_requirement: DataTypes.TEXT,
    analysis_memo: DataTypes.TEXT,
    selection_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    selection_memo: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};