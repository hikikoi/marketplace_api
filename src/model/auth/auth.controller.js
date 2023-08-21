const UnauthorizedException = require('../../errors/unauthorized.exception');
const NotFoundException = require('../../errors/notFound.exception');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const authModel = require('./auth.model');

class AuthController {
  async register(req, res, next) {
    const { username, password } = req.body;
    const { user_agent, user_device, device_model } = req.headers;

    try {
      const existingUser = await authModel.getUserByUsername(username);
      if (existingUser.length > 0) {
        throw new UnauthorizedException("Username already taken");
      }

      const newUser = await authModel.createUser(
        username,
        password,
        user_agent,
        user_device,
        device_model
      );
      const token = jwt.sign({ userId: newUser[0].id }, config.jwtSecret, {
        expiresIn: "1h",
      });

      return res.status(201).json({
        token,
        user: {
          id: newUser[0].id,
          username: newUser[0].username,
          user_agent: newUser[0].user_agent,
          user_device: newUser[0].user_device,
          device_model: newUser[0].device_model,
        },
      });
    } catch (error) {
      next(error); 
    }
  }
  async login(req, res, next) {
    const { username, password } = req.body;
    const { user_agent, user_device, device_model } = req.headers;

    try {
      const userId = await authModel.getUserIdByUsernameAndPassword(
        username,
        password
      );

      if (!userId) {
        throw new UnauthorizedException("Authentication failed");
      }

      if (await authModel.isUserSoftDeleted(userId)) {
        throw new UnauthorizedException(
          "Login error. User is deleted, register with previous credentials"
        );
      }

      if (userId) {
        const token = jwt.sign({ id: userId }, config.jwtSecret, {
          expiresIn: "1h",
        });
        return res.json({ token });
      } else {
        throw new UnauthorizedException("Authentication failed");
      }
    } catch (error) {
      next(error); 
    }
  }

  async logout(req, res, next) {
    const { username, password } = req.body;

    try {
      const userId = await authModel.getUserIdByUsernameAndPassword(
        username,
        password
      );

      if (!userId) {
        throw new NotFoundException("User not found or invalid credentials");
      }

      const deletedUser = await authModel.softDeleteUserById(userId);

      if (deletedUser.length === 0) {
        throw new NotFoundException("User not found");
      }

      return res.json({ message: "User soft deleted successfully" });
    } catch (error) {
      next(error); 
    }
  }
}

module.exports = new AuthController();
