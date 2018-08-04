'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _dbConfig = require('../models/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

var _token = require('../helpers/token');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2['default'].config();

var UsersController = function () {
  function UsersController() {
    _classCallCheck(this, UsersController);
  }

  _createClass(UsersController, null, [{
    key: 'createNewUser',

    /**
     * Create a new user
     * @param {obj} req
     * @param {obj} res
     * @returns All the rides in db
     * @memberof UsersController
     */
    value: function () {
      function createNewUser(req, res) {
        var _req$body = req.body,
            firstname = _req$body.firstname,
            lastname = _req$body.lastname,
            username = _req$body.username,
            email = _req$body.email,
            password = _req$body.password;

        var hashedPassword = _bcryptjs2['default'].hashSync(password, 10);

        // declare the sign up query
        var query = {
          text: 'INSERT INTO users(firstname, lastname, username, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *',
          values: [firstname, lastname, username, email, hashedPassword]
        };
        // connect to database
        _dbConfig2['default'].connect(function (err, client, done) {
          if (err) {
            res.status(500).json({
              status: 'Failed',
              error: 'There seems to be an error on the server'
            }); // error connecting to database
            done();
          }

          // insert the new user into the database
          client.query(query, function (err, result) {
            if (err) {
              done();
              res.status(409).json({
                status: 'Failed',
                error: 'User already exists'
              });
            }
            if (result) {
              var newUser = result.rows[0];
              var token = _token2['default'].makeToken(newUser);
              res.status(201).json({
                status: 'Success',
                message: 'Sign up successful',
                token: token
              });
            }
          });
        });
      }

      return createNewUser;
    }()

    /**
    * Sign in a user
    * @param {obj} req
    * @param {obj} res
    * @returns Sign in a user
    * @memberof UsersController
    */

  }, {
    key: 'signin',
    value: function () {
      function signin(req, res) {
        var _req$body2 = req.body,
            email = _req$body2.email,
            password = _req$body2.password;


        _dbConfig2['default'].connect(function (err, client, done) {
          if (err) {
            // done();
            res.status(500).send({
              status: 'Failed',
              error: 'Oops! An error occurred on the server'
            });
          }
          client.query('SELECT * from users WHERE email = $1', [email], function (err, result) {
            if (err) {
              res.status(500).json({
                status: 'Failed',
                error: 'An error occurred during sign in'
              });
            }
            var user = result.rows[0];
            if (!user) {
              return res.status(401).json({
                status: 'Failed',
                error: 'User does not exist'
              });
            }
            // if user exists in database
            var passwordIsValid = _bcryptjs2['default'].compareSync(password, user.password);
            if (!passwordIsValid) {
              return res.status(401).json({
                status: 'Failed',
                error: 'Invalid login credentials'
              });
            }
            // const userId = user.user_id;
            var userToken = _token2['default'].makeToken({ userId: user });

            res.status(200).send({
              status: 'Success',
              message: 'Login Successful',
              userToken: userToken
            });
          });
        });
      }

      return signin;
    }()
  }]);

  return UsersController;
}();

exports['default'] = UsersController;