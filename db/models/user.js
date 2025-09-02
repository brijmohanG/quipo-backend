// models/user.js
const db = require('../index');
const Sequelize = require('sequelize');
const database = db.sequelize;

// 1) Create Model or Entity.
class User extends Sequelize.Model {}

const attributes = {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  first_name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  pin: {
    type: Sequelize.STRING,
    allowNull: true,
  },
};

const options = {
  sequelize: database,
  modelName: 'User',
  freezeTableName: true,
  timestamps: true,
  underscored: true,
};

User.init(attributes, options); 
User.sync();
module.exports = User; 
