const Joi = require('joi');

module.exports = CREATE_PRODUCT_DTO = Joi.object({
    name: Joi.string().max(30).required().trim(),
    price: Joi.number().max(10).required(),
    subcategory_id: Joi.number().min(1).required(),
}).required()
