const Joi = require('joi');

module.exports = CART_DTO = Joi.object({
    product_id: Joi.number().min(1).required(),
}).required()
