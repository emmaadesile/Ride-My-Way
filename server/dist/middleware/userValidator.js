'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
  @class UserValidation
  @classdesc Validates user input
*/
var UserValidation = function () {
  function UserValidation() {
    _classCallCheck(this, UserValidation);
  }

  _createClass(UserValidation, null, [{
    key: 'validateLogin',

    /**
     * Validate signin
     *
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @param {function} next - The next Middleware
     * @return {object} Message and user data
     * @memberof UserValidation
     */
    value: function () {
      function validateLogin(req, res, next) {
        var _req$body = req.body,
            email = _req$body.email,
            password = _req$body.password;

        var error = {};

        var validateEmail = function () {
          function validateEmail(checkMail) {
            var testEmail = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return testEmail.test(checkMail);
          }

          return validateEmail;
        }();

        if (!email) {
          error.email = 'Email is required';
        }

        if (email && email.trim === '') {
          error.email = 'Email is required';
        }

        if (email && validateEmail(email) === false) {
          error.email = 'Email address is invalid';
        }

        if (!password) {
          error.password = 'Password is required';
        }

        if (password && password.trim() === '') {
          error.password = 'Password is required';
        }

        if ((0, _lodash.isEmpty)(error)) {
          return next();
        }
        return res.status(406).json(_extends({}, error));
      }

      return validateLogin;
    }()

    /**
     * Validate Signup
     *
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @param {function} next - The next Middleware
     * @return {object} Message and user data
     * @memberof UserValidation
     */

  }, {
    key: 'validateSignUp',
    value: function () {
      function validateSignUp(req, res, next) {
        var _req$body2 = req.body,
            firstname = _req$body2.firstname,
            lastname = _req$body2.lastname,
            username = _req$body2.username,
            email = _req$body2.email,
            password = _req$body2.password,
            confirmPassword = _req$body2.confirmPassword;

        var error = {};

        var validateEmail = function () {
          function validateEmail(checkMail) {
            var testEmail = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return testEmail.test(checkMail);
          }

          return validateEmail;
        }();

        // Firstname Validation
        if (!firstname) {
          error.firstname = 'Firstname field cannot be empty';
        }

        if (firstname && firstname.trim() === '') {
          error.firstname = 'Firstname field cannot be empty';
        }

        if (firstname && firstname.trim() !== firstname) {
          error.firstname = 'Please remove extra space(s) added to the firstname';
        }

        // lastname validation
        if (!lastname) {
          error.lastname = 'Lastname field cannot be empty';
        }

        if (lastname && lastname.trim() === '') {
          error.lastname = 'Lastname field cannot be empty';
        }

        if (lastname && lastname.trim() !== lastname) {
          error.lastname = 'Please remove extra space(s) added to the lastname';
        }

        // username validation
        if (!username) {
          error.username = 'Username field cannot be empty';
        }

        if (username && username.trim() === '') {
          error.username = 'Username field cannot be empty';
        }

        if (username && username.trim() !== username) {
          error.username = 'Please remove extra space(s) added to the username';
        }

        // email validation
        if (!email) {
          error.email = 'Email field cannot be empty';
        }

        if (email && email.trim() === '') {
          error.email = 'Email field cannot be empty';
        }

        if (validateEmail(email) === false) {
          error.email = 'Email address is invalid';
        }

        // password validation
        if (!password) {
          error.password = 'Password field cannot be empty';
        }

        if (password && password.trim() === '') {
          error.password = 'Password field cannot be empty';
        }

        if (!password && !confirmPassword) {
          error.password = 'Password field cannot be empty';
        }

        if (password && password.trim() !== password) {
          error.password = 'Please remove extra space(s) added to the password';
        }

        if (!confirmPassword) {
          error.confirmPassword = 'Please confirm your password';
        }

        if (password && !confirmPassword) {
          error.confirmPassword = 'Please confirm your password';
        }

        if (_validator2['default'].isEmpty(password || '') || _validator2['default'].isEmpty(confirmPassword || '') || password.trim() !== confirmPassword.trim()) {
          error.password = 'Password and confirm password fields do not match';
        }

        if ((0, _lodash.isEmpty)(error)) return next();
        return res.status(406).json(_extends({
          status: 'Failed'
        }, error));
      }

      return validateSignUp;
    }()

    /**
    * Validate input length
    *
    * @static
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @param {function} next - The next Middleware
    * @return {object} Message and user data
    * @memberof UserValidation
    */

  }, {
    key: 'validateInputLength',
    value: function () {
      function validateInputLength(req, res, next) {
        var _req$body3 = req.body,
            firstname = _req$body3.firstname,
            lastname = _req$body3.lastname,
            username = _req$body3.username,
            password = _req$body3.password;


        function validUser(user) {
          var testUser = /^([a-zA-Z0-9_]+)$/;
          return testUser.test(user);
        }

        if (validUser(firstname) === false) {
          return res.status(406).json({
            status: 'Failed',
            error: 'Firstname can only contain numbers and letters'
          });
        }

        if (validUser(lastname) === false) {
          return res.status(406).json({
            status: 'Failed',
            error: 'Lastname can only contain numbers and letters'
          });
        }

        if (validUser(username) === false) {
          return res.status(406).json({
            status: 'Failed',
            error: 'Username can only contain numbers and letters'
          });
        }

        if (username.length < 4 || username.length > 12) {
          return res.status(406).json({
            status: 'Failed',
            error: 'Username must be at least 6 chars and at most 10 characters'
          });
        }

        if (password.length < 6 || password.length > 20) {
          return res.status(406).json({
            status: 'Failed',
            error: 'Password must be at least 6 chars and at most 20 characters'
          });
        }
        next();
      }

      return validateInputLength;
    }()
  }]);

  return UserValidation;
}();

exports['default'] = UserValidation;