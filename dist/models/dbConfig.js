Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_dotenv2['default'].config();

var dbConfig = new _pg.Pool({
  user: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  min: 0,
  max: 10, // max number of connection that can be open to database
  idleTimeoutMills: 3000 // how long client is allowed to remain idle before being closed
});

exports['default'] = dbConfig;