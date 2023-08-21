const dotenv = require('dotenv').config();
module.exports = {
  app: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  },
  db: {
    host:  process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  jwtSecret: process.env.JWT_SEC,
};