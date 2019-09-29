'use strict';

const Hapi = require('@hapi/hapi');
const config = require('config');
const absPath = require('app-module-path');
const mongoose = require('mongoose');
const hapiJwt = require('hapi-auth-jwt2');
absPath.addPath(__dirname);

const { AuthValidator } = require('validators');

const server = Hapi.server({
  port: config.get('port')
});

const init = (async () => {
  await mongoose.connect(config.get('db'), { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.set('useCreateIndex', true);
  await server.start();
  await server.register(hapiJwt);
  server.auth.strategy('jwt', 'jwt', {
    key: config.get('secretKey'),
    validate: AuthValidator.jwt,
    verifyOptions: { algorithms: ['HS256'] }
  });
  server.route({
    method: '*',
    path: '/{any*}',
    handler: function (request, h) {
      return {
        statusCode: 404,
        message: '404 Error! Page Not Found!',
        success: false
      }
    }
  })
  require('./routes');
  console.log(`Server is Runinng on ${server.info.uri}`);
})();

module.exports = server;