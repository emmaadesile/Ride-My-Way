Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbConfig = require('../models/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UsersController = function () {
  function UsersController() {
    _classCallCheck(this, UsersController);
  }

  _createClass(UsersController, null, [{
    key: 'createNewUser',

    /**
     * Get All Ride Offers
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

        var query = {
          text: 'INSERT INTO users(firstname, lastname, username, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *',
          values: ['' + String(firstname), '' + String(lastname), '' + String(username), '' + String(email), '' + String(password)]
        };
        _dbConfig2['default'].connect(function (err, client, done) {
          done();
          if (err) {
            res.status(500).json({ success: false, error: err });
          }
          client.query(query, function (err, res) {
            if (err) {
              res.status(400).json({ success: false, error: err });
            }
            res.status(200).send(res.rows[0]);
          });
        });
      }

      return createNewUser;
    }()
  }]);

  return UsersController;
}();

exports['default'] = UsersController;