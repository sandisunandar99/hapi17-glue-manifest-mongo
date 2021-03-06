'use strict';

const Confidence = require('confidence');

const Config = require('./config.js');

const criteria = {
  env: process.env.NODE_ENV,
};

/* $lab:coverage:off$ */
process.env.CACHE_EXPIRES_IN = Config.get('/cacheOptions/expiresIn') || 86400000;
/* $lab:coverage:on$ */
const manifest = {
  $meta: 'This file defines the API server.',
  server: Config.get('/serverOptions'),
  register: {
    plugins: [
      {
        plugin: 'hapi-auth-basic',
      },
      {
        plugin: 'hapi-auth-jwt2',
      },
      {
        plugin: require('good'),
        options: Config.get('/goodOptions'),
      },
      {
        plugin: 'inert',
      },
      {
        plugin: './server/auth',
      },
      {
        plugin: './server/health',
      },
      {
        plugin: './server/index',
      },
      {
        plugin: './server/api/protected',
      },
      {
        plugin: './server/api/emulateLogin',
      },
    ],
  },
};


const store = new Confidence.Store(manifest);

exports.get = function (key) {
  return store.get(key, criteria);
};

/* $lab:coverage:off$ */
exports.meta = function (key) {
  return store.meta(key, criteria);
};
/* $lab:coverage:on$ */
