'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _token = require('../helpers/token');

var _token2 = _interopRequireDefault(_token);

var _index = require('../middleware/index');

var _index2 = require('../controllers/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Routes for the RideOffersController;
var routes = function routes(app) {
  // Homepage
  app.get('/', function (req, res) {
    return res.status(200).send({
      success: 'Ride My Way API is live'
    });
  });

  // User sign up
  app.post('/auth/signup', _index.UserValidator.validateSignUp, _index.UserValidator.validateInputLength, _index2.UsersController.createNewUser);

  // User sign in
  app.post('/auth/signin', _index.UserValidator.validateLogin, _index2.UsersController.signin);

  // Get all ride offers routes
  app.get('/rides', _token2['default'].verifyToken, _index2.RideOffersController.getAllRideOffers);

  // Get a single ride offer
  app.get('/rides/:rideId', _token2['default'].verifyToken, _index2.RideOffersController.getASingleRideOffer);

  // Create a ride offer
  app.post('/users/rides', _token2['default'].verifyToken, _index.RidesValidator.validateRidesDetails, _index2.RideOffersController.createARideOffer);

  // Edit a ride offer
  // app.put('/rides/:rideId', TokenAuth.verifyToken, RideOffersController.editRideOffer);

  // Delete a ride offer
  // app.delete('/rides/:rideId', TokenAuth.verifyToken, RideOffersController.deleteRideoffer);

  // Request to join a ride offer
  app.post('/rides/:rideId/requests', _token2['default'].verifyToken, _index2.RideRequestsController.requestToJoinARideOffer);

  // Fetch All Ride Requests
  app.get('/users/rides/:rideId/requests', _token2['default'].verifyToken, _index2.RideRequestsController.getRideRequests);

  // Accept or reject a ride request
  app.put('/users/rides/:rideId/requests/:requestId', _token2['default'].verifyToken, _index2.RideRequestsController.acceptOrRejectRideRequest);

  // Error page
  app.get('*', function (req, res) {
    return res.send({
      status: 'Failed',
      error: 'Oops! This page doesn\'t exist'
    });
  });
};

exports['default'] = routes;