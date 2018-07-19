'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_dotenv2['default'].config();

var environment = process.env.NODE_ENV;

var pool = void 0;

if (environment === 'development') {
  pool = new _pg.Pool(_config2['default'].development);
}
if (environment === 'test') {
  pool = new _pg.Pool(_config2['default'].test);
}

if (environment === 'production') {
  pool = new _pg.Pool(_config2['default'].production);
}

exports['default'] = pool;