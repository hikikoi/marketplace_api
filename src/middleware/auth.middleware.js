const jwt = require("jsonwebtoken");
const config = require("../config/config");
const userModel = require("../model/auth/auth.model");
const UnauthorizedException = require("../errors/unauthorized.exception");

class AuthMiddleware {
  async authenticate(req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
      throw new UnauthorizedException("Authorization token is missing");
    }

    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      const user = await userModel.getUserById(decoded.id);

      if (!user) {
        throw new UnauthorizedException("Invalid user");
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ err :"Invalid token"});
    }
  }
}

module.exports = new AuthMiddleware();
