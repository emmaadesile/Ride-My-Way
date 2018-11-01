Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbConfig = require('../models/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RideRequestsController = function () {
  function RideRequestsController() {
    _classCallCheck(this, RideRequestsController);
  }

  _createClass(RideRequestsController, null, [{
    key: 'getRideRequests',

    /**
     * Get All Ride Requests
     * @param {obj} req
     * @param {obj} res
     * @returns A ride requests
     * @memberof RideRequestsController
     */
    value: function () {
      function getRideRequests(req, res) {
        var rideId = parseInt(req.params.rideId, 10);
        _dbConfig2['default'].connect(function (err, client, done) {
          if (err) {
            res.status(500).josn({
              status: 'Failed',
              error: 'There was an error connecting to the server',
              err: err
            });
          }
          // check if ride exists
          client.query('SELECT * FROM rides WHERE ride_id = $1', [rideId], function (err, result) {
            if (err) {
              res.status(500).josn({
                status: 'Failed',
                error: 'There was an error checking if ride exists',
                err: err
              });
            }
            return result.rows.length === 0 ? res.status(400).json({
              status: 'Failed',
              error: 'Ride does not exist. Cannot make request to join',
              err: err
            })
            // if ride exists, check if there are requests for the ride
            : client.query('SELECT * FROM ride_requests WHERE ride_id = $1', [rideId], function (err, result) {
              if (err) {
                done();
                res.status(500).json({
                  status: 'Failed',
                  error: 'Something went wrong on the server',
                  err: err
                });
              }
              return result.rows === 'undefined' || result.rows.length === 0 ? res.status(400).json({
                status: 'Failed',
                error: 'There are no requests for this ride'
              }) : res.status(200).json({
                status: 'Success',
                request: result.rows[0]
              });
            });
          });
        });
      }

      return getRideRequests;
    }()

    /**
     * Post A Ride Requests
     * @param {obj} req
     * @param {obj} res
     * @returns post a ride request
     * @memberof RideRequestsController
     */

  }, {
    key: 'requestToJoinARideOffer',
    value: function () {
      function requestToJoinARideOffer(req, res) {
        var userId = req.userId;
        var fullname = req.fullname;
        var rideId = parseInt(req.params.rideId, 10);
        var requestId = req.userId;

        var query = {
          text: 'INSERT INTO ride_requests(user_id, ride_id, request_id, requester_name) VALUES($1, $2, $3, $4);',
          values: [userId, rideId, requestId, fullname]
        };
        _dbConfig2['default'].connect(function (err, client, done) {
          if (err) {
            done();
            res.status(500).json({
              status: 'Failed',
              message: 'There seems to be an error on the server'
            });
          }
          // check if ride exists
          client.query('SELECT ride_id FROM rides WHERE ride_id = $1', [rideId], function (err, result) {
            if (err) {
              done();
              res.status(500).json({
                status: 'Failed',
                message: 'An error occurred while checking if the ride exists'
              });
            }
            return result.rows === 'undefined' || result.rows.length === 0 ? res.status(400).json({
              status: 'Failed',
              error: 'Cannot request to join because ride does not exist'
            }) : client.query(query, function (err, result) {
              if (err) {
                res.status(500).json({
                  status: 'Failed',
                  error: 'Unable to make request to join ride offer'
                });
              } else {
                res.status(200).json({
                  status: 'Success',
                  message: 'Request to join ride offer pending approval from ride owner'
                });
              }
            });
          });
        });
      }

      return requestToJoinARideOffer;
    }()

    /**
     * Accept or reject Ride Requests
     * @param {obj} req
     * @param {obj} res
     * @returns accept or reject a ride request
     * @memberof RideRequestsController
     */

  }, {
    key: 'acceptOrRejectRideRequest',
    value: function () {
      function acceptOrRejectRideRequest(req, res) {
        var requestStatus = req.body.requestStatus;
        var rideId = parseInt(req.params.rideId, 10);
        var requestId = parseInt(req.params.requestId, 10);
        var query = {
          text: 'UPDATE ride_requests SET request_status = $1 WHERE request_id = $2;',
          values: [requestStatus, requestId]
        };
        _dbConfig2['default'].connect(function (err, client, done) {
          if (err) {
            res.status(500).json({
              status: 'Failed',
              error: 'There seems to be an error on the server'
            });
          }
          // check if the ride exists in the db
          client.query('SELECT ride_id from rides WHERE ride_id = $1', [rideId], function (err, result) {
            if (result.rows === 'undefined' || result.rows.length === 0) {
              res.status(400).json({
                status: 'Failed',
                error: 'You Cannot respond to request because ride does not exist'
              });
            }
            // If the ride exist
            // check if this user is the creator of the ride
            client.query('SELECT user_id from rides WHERE ride_id = $1', [rideId], function (err, result) {
              if (result.rows === 'undefined' || result.rows.length === 0) {
                res.status(400).json({
                  status: 'Failed',
                  error: 'You cannot modify ride requests for another user'
                });
              }

              // if user's identity is verified, respond to the ride request
              client.query(query, function (err, result) {
                done();
                return err ? res.status(500).json({
                  status: 'Failed',
                  error: 'Your have already responded to this ride request',
                  err: err
                })
                // if the request completes successfully
                : res.status(200).json({
                  status: 'Success',
                  message: 'The ride request has been successfully ' + String(requestStatus)
                });
              });
            });
          });
        });
      }

      return acceptOrRejectRideRequest;
    }()
  }]);

  return RideRequestsController;
}();

exports['default'] = RideRequestsController;