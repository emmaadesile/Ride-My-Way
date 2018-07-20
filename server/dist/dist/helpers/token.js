'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

_dotenv2['default'].config();

var secret = process.env.SECRET_KEY;

var TokenAuth = function () {
  function TokenAuth() {
    _classCallCheck(this, TokenAuth);
  }

  _createClass(TokenAuth, null, [{
    key: 'makeToken',

    /**
     * Generates jwt token for user
     *
     * @static
     * @param {object} user
     * @returns {string} jwt token
     * @memberof TokenAuth
     */
    value: function () {
      function makeToken(_ref) {
        var userId = _ref.userId;

        var token = _jsonwebtoken2['default'].sign({ userId: userId }, secret, { expiresIn: 86400 });
        return token;
      }

      return makeToken;
    }()

    /**
     * verify jwt token for protected routes
     *
     * @static
     * @param {object} user
     * @returns {string} jwt token
     * @memberof TokenAuth
     */

  }, {
    key: 'verifyToken',
    value: function () {
      function verifyToken(req, res, next) {
        var token = req.headers['x-access-token'];
        if (!token) {
          return res.status(403).send({
            status: 'Failed',
            error: 'User not authorised to access this page'
          });
        }

        _jsonwebtoken2['default'].verify(token, secret, function (err, decoded) {
          if (err) {
            return res.status(401).send({
              status: 'Failed',
              error: 'User not authorised'
            });
          }
          req.userId = decoded.userId.user_id;
          req.fullname = String(decoded.userId.firstname) + ' ' + String(decoded.userId.lastname);
          // if everything is good, authorise user to view this route
          return next();
        });
      }

      return verifyToken;
    }()
  }]);

  return TokenAuth;
}();

exports['default'] = TokenAuth;