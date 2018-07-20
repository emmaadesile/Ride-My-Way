'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserValidator = exports.RidesValidator = undefined;

var _ridesValidator = require('./ridesValidator');

var _ridesValidator2 = _interopRequireDefault(_ridesValidator);

var _userValidator = require('./userValidator');

var _userValidator2 = _interopRequireDefault(_userValidator);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

exports.RidesValidator = _ridesValidator2['default'];
exports.UserValidator = _userValidator2['default'];