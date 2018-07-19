'use strict';

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
            res.status(500).send({ message: 'Internal sever error' });
          }
          client.query('SELECT * FROM rides', function (err, result) {
            done();
            if (err) {
              res.status(500).json({
                status: 'Failed',
                error: 'An error occured while getting the rides'
              });
            }
            res.status(200).json({
              status: 'Success',
              rides: result.rows
            });
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
            res.status(500).josn({
              status: 'Failed',
              error: 'There seems to be an error on the server'
            });
          }
          client.query('SELECT * FROM rides WHERE ride_id = ' + String(rideId), function (err, result) {
            done();
            if (err) {
              res.status(500).json({
                status: 'Failed',
                error: 'Could not fetch this ride'
              });
            }
            return result.rows === undefined || result.rows.length === 0 ? res.status(404).json({
              status: 'Failed',
              error: 'Ride not found'
            }) : res.status(200).json({
              status: 'Success',
              ride: result.rows
            });
          });
        });
      }

      return getASingleRideOffer;
    }()
    /**
     * Create A Ride Offer
     * @param {obj} req
     * @param {obj} res
     * @returns A Single rides in db
     * @memberof RideOffersController
     */

  }, {
    key: 'createARideOffer',
    value: function () {
      function createARideOffer(req, res) {
        // request pareamaters
        var _req$body = req.body,
            location = _req$body.location,
            destination = _req$body.destination,
            departuretime = _req$body.departuretime,
            datecreated = _req$body.datecreated,
            seatsavailable = _req$body.seatsavailable;

        // data to be inserted in to the rides table

        var query = {
          text: 'INSERT INTO rides(user_id, location, destination, departuretime, datecreated, seatsavailable) \n      VALUES($1, $2, $3, $4, $5, $6) RETURNING *;',
          values: [req.userId, location, destination, departuretime, datecreated, seatsavailable]
        };
        _dbConfig2['default'].connect(function (err, client, done) {
          if (err) {
            res.status(500).json({
              status: 'False',
              error: 'There seems to be an error on the server'
            }); // error connecting to database
          }
          client.query(query, function (err, result) {
            done();
            return err ? res.status(500).json({
              status: 'Failed',
              error: 'An error occurred while creating the the ride'
            }) : res.status(201).json({
              status: 'Success',
              message: 'Ride offer successfully created'
            });
          });
        });
      }

      return createARideOffer;
    }()

    /**
     * Delete A Ride Offer
     * @param {obj} req
     * @param {obj} res
     * @returns A Single rides in db
     * @memberof RideOffersController
     */

  }]);

  return RideOffersController;
}();

exports['default'] = RideOffersController;