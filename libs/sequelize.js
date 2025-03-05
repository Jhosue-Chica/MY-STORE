const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');
const initModels = require('./../db/models');

let sequelize;

if (config.env === 'production') {
  console.log('Using production database connection');
  sequelize = new Sequelize(config.dbUrl, {
    dialect: 'postgres',
    logging: console.log,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  console.log('Using development database connection');
  const USER = encodeURIComponent(config.dbUser);
  const PASS = encodeURIComponent(config.dbPass);
  const URI = `postgres://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

  sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: console.log,
  });
}

initModels(sequelize);

module.exports = sequelize;
