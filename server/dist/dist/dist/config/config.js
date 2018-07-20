'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

_dotenv2['default'].config();

var config = {
  development: {
    user: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    min: process.env.DB_MIN,
    max: process.env.DB_MAX,
    idleTimeoutMills: process.env.idleTimeoutMills
  },
  test: {
    user: 'postgres',
    database: 'ridemyway_test',
    host: 'localhost',
    port: '5432',
    min: 1,
    max: 10,
    idleTimeoutMills: 5000
  },
  production: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
};

exports['default'] = config;