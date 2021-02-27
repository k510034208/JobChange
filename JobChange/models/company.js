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
    application_requirement: DataTypes.STRING(65535),
    analysis_memo: DataTypes.STRING(65535),
    selection_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    selection_next_date: DataTypes.STRING,
    selection_next_content: DataTypes.STRING,
    selection_memo: DataTypes.STRING(65535)
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};