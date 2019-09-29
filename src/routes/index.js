const Joi = require('@hapi/joi');

const server = require('index');
const { AuthController, ProductController } = require('controllers');
const { AuthValidator, ProductValidator } = require('validators');

server.realm.modifiers.route.prefix = '/api/1.0';

server.route({
  method: 'POST',
  path: '/login',
  handler: AuthController.login,
  options: AuthValidator.login,
});

server.route({
  method: 'POST',
  path: '/signup',
  handler: AuthController.signup,
  options: AuthValidator.signup,
});

server.route({
  method: 'POST',
  path: '/addproduct',
  handler: ProductController.addProduct,
  options: ProductValidator.addProduct,
});

server.route({
  method: 'GET',
  path: '/listproduct',
  handler: ProductController.listProduct,
  options: ProductValidator.listProduct,
})