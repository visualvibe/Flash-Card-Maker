const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
 'user',
 {
  user_id: {
   type: Sequelize.INTEGER,
   primaryKey: true,
   autoIncrement: true
  },
  username: {
   type: Sequelize.STRING
  },
  first_name: {
   type: Sequelize.STRING
  },
  email: {
   type: Sequelize.STRING
  },
  password: {
   type: Sequelize.STRING
  }
 },
 {
  timestamps: false
 }

)