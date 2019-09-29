const jwt = require('jsonwebtoken');
const config = require('config');
const boom = require('boom');

const { User } = require('models');

const signup = async (req, res) => {
  const { email, password } = req.payload;
  const user = await User.findOne({ email });
  if (user) {
    return boom.badRequest('User already exists');
  }
  const expiresIn = Date.now() + 1000 * 60 * 60;
  const authInfo = {
    email
  }
  const token = jwt.sign(authInfo, config.get('secretKey'), { expiresIn });
  await new User({
    email,
    password
  }).save();
  return {
    statusCode: 200,
    data: {
      token,
      email,
      expiresIn
    },
    success: true
  }
}

const login = async (req, res) => {
  const { email, password } = req.payload;
  const user = await User.findOne({ email, password });
  if (!user) {
    return boom.badRequest('Invalid username or password');
  }
  const expiresIn = Date.now() + 1000 * 60 * 60;
  const authInfo = {
    email
  }
  const token = jwt.sign(authInfo, config.get('secretKey'), { expiresIn });
  return {
    statusCode: 200,
    data: {
      token,
      email,
      expiresIn
    },
    success: true
  }
}

module.exports = {
  signup,
  login
}