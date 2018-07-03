Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rideRequests = require('../models/rideRequests');

var _rideRequests2 = _interopRequireDefault(_rideRequests);

var _rides = require('../models/rides');

var _rides2 = _interopRequireDefault(_rides);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RideRequestsController = function () {
  function RideRequestsController() {
    _classCallCheck(this, RideRequestsController);
  }

  _createClass(RideRequestsController, null, [{
    key: 'getAllRideRequests',
    value: function () {
      function getAllRideRequests(req, res) {
        return res.status(200).json({ rideRequests: _rideRequests2['default'] });
      }

      return getAllRideRequests;
    }()

    /**
     * Post a Ride Request
     * @param {obj} req
     * @param {obj} res
     * @returns All the rides in db
     * @memberof RideOffersController
     */

  }, {
    key: 'requestToJoinARideOffer',
    value: function () {
      function requestToJoinARideOffer(req, res) {
        var rideIndex = _rides2['default'].findIndex(function (ride) {
          return ride.id === parseInt(req.params.rideId, 10);
        });
        if (rideIndex !== -1) {
          if (_rideRequests2['default'][rideIndex].seatsAvailable > 0) {
            _rideRequests2['default'][rideIndex].seatsAvailable -= 1;
            _rideRequests2['default'][rideIndex].noOfRequests += 1;
            _rideRequests2['default'][rideIndex].passengersId.push(_rideRequests2['default'][rideIndex].passengersId.length + 1);
            return res.status(202).json({ success: 'Ride request accepted' });
          } else if (_rideRequests2['default'][rideIndex].seatsAvailable === 0) {
            return res.status(400).json({ error: 'Ride request rejected. No more seats available' });
          }
        }
        return res.status(404).json({
          error: 'Ride not found'
        });
      }

      return requestToJoinARideOffer;
    }()
  }]);

  return RideRequestsController;
}();

exports['default'] = RideRequestsController;