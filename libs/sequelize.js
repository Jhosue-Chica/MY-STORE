const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');
const initModels = require('./../db/models');

let sequelize;

// Verificar que tengamos una URL de base de datos
if (config.env === 'production' && config.dbUrl) {
  console.log('Connecting to production database with URL');
  sequelize = new Sequelize(config.dbUrl, {
    dialect: 'postgres',
    logging: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  console.log('Connecting to development database with parameters');
  const USER = encodeURIComponent(config.dbUser);
  const PASS = encodeURIComponent(config.dbPass);
  const URI = `postgres://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

  sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: true,
  });
}

initModels(sequelize);

module.exports = sequelize;
