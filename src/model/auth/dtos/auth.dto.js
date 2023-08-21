const Joi = require('joi');

module.exports = AUTH_DTO = Joi.object({
    username: Joi.string().max(20).required().trim(),
    password: Joi.string().max(15).required().trim(),
}).required()
