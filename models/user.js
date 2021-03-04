'use strict';
var tools = require('../modules/tools')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    user_name: {
      type: DataTypes.STRING,
      validate: {
        len: [ 1, 32 ],
        is: {
          args: /^[A-Za-z0-9]+$/i,
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('password', tools.hashSha256(value));
      }
    },
    fail_count: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};