require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUrl: process.env.DATABASE_URL  // Asegúrate de tener esta línea
};

console.log('Environment:', config.env);
console.log('Database URL available:', !!config.dbUrl);

module.exports = { config };
