Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbConfig = require('../models/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RideOffersController = function () {
  function RideOffersController() {
    _classCallCheck(this, RideOffersController);
  }

  _createClass(RideOffersController, null, [{
    key: 'getAllRideOffers',

    /**
     * Get All Ride Of fers
     * @param {obj} req
     * @param {obj} res
     * @returns All the rides in db
     * @memberof RideOffersController
     */
    value: function () {
      function getAllRideOffers(req, res) {
        _dbConfig2['default'].connect(function (err, client, done) {
          if (err) {
            console.log('cannot connect to database: ' + String(err));
            res.status(400).send(err);
          }
          client.query('SELECT * FROM rides', function (err, result) {
            done();
            if (err) {
              console.log(err);
              res.status(400).send(err);
            }
            res.status(200).send(result.rows);
          });
        });
      }

      return getAllRideOffers;
    }()

    /**
    * Get A Ride Offer
    * @param {obj} req
    * @param {obj} res
    * @returns A Single rides in db
    * @memberof RideOffersController
    */

  }, {
    key: 'getASingleRideOffer',
    value: function () {
      function getASingleRideOffer(req, res) {
        var rideId = parseInt(req.params.rideId, 10);
        _dbConfig2['default'].connect(function (err, client, done) {
          if (err) {
            console.log('cannot connect to database: ' + String(err));
            res.status(400).send(err);
          }
          client.query('SELECT * FROM rides WHERE id = ' + String(rideId), function (err, result) {
            done();
            if (err) {
              console.log(err);
              res.status(400).send(err);
            }
            res.status(200).send(result.rows);
          });
        });
      }

      return getASingleRideOffer;
    }()
  }]);

  return RideOffersController;
}();

exports['default'] = RideOffersController;