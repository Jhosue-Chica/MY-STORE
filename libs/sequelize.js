const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');
const initModels = require('./../db/models');
const USER = encodeURIComponent(config.dbUser);
const PASS = encodeURIComponent(config.dbPass);
const URI = `postgres://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: (msg) => console.log(msg),
});

initModels(sequelize);
/* sequelize.sync(); */

module.exports = sequelize;
