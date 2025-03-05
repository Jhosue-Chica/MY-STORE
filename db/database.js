const { config } = require('./../config/config');

module.exports = {
  development: {
    url: `postgres://${encodeURIComponent(config.dbUser)}:${encodeURIComponent(config.dbPass)}@${config.dbHost}:${config.dbPort}/${config.dbName}`,
    dialect: 'postgres',
  },
  production: {
    url: config.dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
  }
};
