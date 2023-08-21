const Joi = require('joi');

module.exports = UPDATE_PRODUCT_DTO = Joi.object({
    name: Joi.string().max(30).required().trim(),
    price: Joi.number().max(10).required()
}).required()
