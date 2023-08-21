const pg = require("pg");
const config = require('../../config/config');

module.exports = class PostgresModel {
  constructor() {
    this.pool = new pg.Pool({
      host: config.db.host,
      port: config.db.port,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
    });
  }

  async fetch(SQL, ...params) {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query(SQL, params.length ? params : null);
      return rows;
    } catch (error) {
      console.log(error);
    } finally {
      client.release();
    }
  }
};
  