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
      validate: {
        notNull: true,
        len: [ 1, 100 ],
      }
    },
    url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
        len: [ 0, 255 ],
      },
    },
    application_requirement: {
      type: DataTypes.STRING(65535),
      validate: {
        len: [ 0, 10000 ],
      }
    },
    analysis_memo: DataTypes.STRING(65535),
    selection_status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [ 0, 10000 ],
      }
    },
    selection_next_date: {
      type: DataTypes.STRING,
      validate: {
        len: [ 0, 10 ],
      },
    },
    selection_next_content: {
      type: DataTypes.STRING,
      validate: {
        len: [ 0, 100 ],
      },
    },
    selection_memo: {
      type: DataTypes.STRING(65535),
      validate: {
        len: [ 0, 10000 ],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    }
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};