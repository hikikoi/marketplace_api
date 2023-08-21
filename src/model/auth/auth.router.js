const express = require("express");
const authController = require("./auth.controller");
const ValidationMiddleware = require("../../middleware/validation.middleware");
const AUTH_DTO = require("./dtos/auth.dto");

const router = express.Router();

router.post("/register", ValidationMiddleware(AUTH_DTO), authController.register);
router.post("/login",ValidationMiddleware(AUTH_DTO), authController.login);
router.post("/logout",ValidationMiddleware(AUTH_DTO), authController.logout);

module.exports = router;
