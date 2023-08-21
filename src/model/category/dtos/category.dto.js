const Joi = require('joi');

module.exports = CATEGORY_DTO = Joi.object({
    name: Joi.string().max(30).required().trim(),
}).required()
