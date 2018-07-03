Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rideOffersController = require('../controllers/rideOffersController');

var _rideOffersController2 = _interopRequireDefault(_rideOffersController);

var _usersController = require('../controllers/usersController');

var _usersController2 = _interopRequireDefault(_usersController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Routes for the RideOffersController;
var routes = function routes(app) {
  // Homepage
  app.get('/', function (req, res) {
    return res.status(200).send({
      Success: 'Ride My Way API is live'
    });
  });

  // User sign up
  app.post('/api/v1/auth/signup', _usersController2['default'].createNewUser);

  // Get all ride offers routes
  app.get('/api/v1/rides', _rideOffersController2['default'].getAllRideOffers);

  // Get a single ride offer
  app.get('/api/v1/rides/:rideId', _rideOffersController2['default'].getASingleRideOffer);

  // Post a ride offer
  // app.post('/api/v1/rides', RideOffersController.createARideOffer);

  // Edit a ride offer
  // app.put('/api/v1/rides/:rideId', RideOffersController.editRideOffer);

  // Delete a ride offer
  // app.delete('/api/v1/rides/:rideId', RideOffersController.deleteRideoffer);

  // Request to join a ride offer
  // app.post('/api/v1/rides/:rideId/requests', RideRequestsController.requestToJoinARideOffer);

  // View Ride Requests
  // app.get('/api/v1/rideRequests', RideRequestsController.getAllRideRequests);
};
// import RideRequestsController from "../controllers/rideRequestsController";
exports['default'] = routes;