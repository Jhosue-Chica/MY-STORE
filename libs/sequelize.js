const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');
const initModels = require('./../db/models');

let sequelize;

// Si estamos en producción, usar DATABASE_URL con configuración SSL
if (config.env === 'production') {
  sequelize = new Sequelize(config.dbUrl, {
    dialect: 'postgres',
    logging: (msg) => console.log(msg),
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  // En desarrollo, usar la configuración normal
  const USER = encodeURIComponent(config.dbUser);
  const PASS = encodeURIComponent(config.dbPass);
  const URI = `postgres://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

  sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: (msg) => console.log(msg),
  });
}

initModels(sequelize);
/* sequelize.sync(); */

module.exports = sequelize;
