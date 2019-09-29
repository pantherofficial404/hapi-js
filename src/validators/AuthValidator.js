const Joi = require('@hapi/joi');

const login = {
  validate: {
    payload: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().trim().required(),
    })
  }
}

const signup = {
  validate: {
    payload: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().trim().required(),
    })
  }
}

const jwt = async (decoded, req) => {
  if (decoded.iat) {
    return { isValid: true }
  }
  return { isValid: false }
}

module.exports = {
  jwt,
  login,
  signup
}