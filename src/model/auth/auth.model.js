const bcrypt = require('bcrypt');
const PostgresModel = require('../postgres/postgres.model');

class AuthModel extends PostgresModel {
  async getUserByUsername(username) {
    const SQL = 'SELECT * FROM users WHERE username = $1';
    return this.fetch(SQL, username);
  }

  async createUser(username, password, userAgent, userDevice, deviceModel) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const SQL = `
      INSERT INTO users (username, password, user_agent, user_device, device_model)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, username, user_agent, user_device, device_model;
    `;
    return this.fetch(SQL, username, hashedPassword, userAgent, userDevice, deviceModel);
  }
  async getUserIdByUsernameAndPassword(username, password) {
    const SQL = 'SELECT id, password FROM users WHERE username = $1';
    const result = await this.fetch(SQL, username);
  
    if (result.length > 0) {
      const storedPasswordHash = result[0].password;
      const isPasswordMatch = await bcrypt.compare(password, storedPasswordHash);
      if (isPasswordMatch) {
        return result[0].id;
      }
    }
    return null;
  }

  async getUserById(id) {
    const SQL = 'SELECT * FROM users WHERE id = $1';
    const result = await this.fetch(SQL, id);
  
    if (result.length > 0) {
      return result[0]; 
    } else {
      return null;
    }
  }
  async softDeleteUserById(userId) {
    const SQL = 'UPDATE users SET deleted_at = NOW() WHERE id = $1 RETURNING *';
    return this.fetch(SQL, userId);
  }

  async isUserSoftDeleted(userId) {
    const SQL = 'SELECT deleted_at FROM users WHERE id = $1';
    const result = await this.fetch(SQL, userId);
    return result.length > 0 && result[0].deleted_at !== null;
  }
}

module.exports = new AuthModel();
