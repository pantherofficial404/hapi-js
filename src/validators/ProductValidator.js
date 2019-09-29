const Joi = require('@hapi/joi');

const addProduct = {
  validate: {
    payload: Joi.object({
      productName: Joi.string().trim().required(),
      price: Joi.number().min(1).required(),
      description: Joi.string().required(),
    })
  },
  auth: 'jwt',
}

const listProduct = {
  auth: 'jwt',
}

module.exports = {
  addProduct,
}