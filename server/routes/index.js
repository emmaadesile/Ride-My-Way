import TokenAuth from '../helpers/token';
import {
  UserValidator,
  RidesValidator,
} from '../middleware/index';

import {
  UsersController,
  RideOffersController,
  RideRequestsController,
} from '../controllers/index';


// Routes for the RideOffersController;
const routes = (app) => {
  // Homepage
  app.get('/', (req, res) =>
    res.status(200).send({
      success: 'Ride My Way API is live'
    }));

  // User sign up
  app.post('/auth/signup', UserValidator.validateSignUp, UserValidator.validateInputLength, UsersController.createNewUser);

  // User sign in
  app.post('/auth/signin', UserValidator.validateLogin, UsersController.signin);

  // Get all ride offers routes
  app.get('/rides', TokenAuth.verifyToken, RideOffersController.getAllRideOffers);

  // Get a single ride offer
  app.get('/rides/:rideId', TokenAuth.verifyToken, RideOffersController.getASingleRideOffer);

  // Create a ride offer
  app.post('/users/rides', TokenAuth.verifyToken, RidesValidator.validateRidesDetails, RideOffersController.createARideOffer);

  // Edit a ride offer
  // app.put('/rides/:rideId', TokenAuth.verifyToken, RideOffersController.editRideOffer);

  // Delete a ride offer
  // app.delete('/rides/:rideId', TokenAuth.verifyToken, RideOffersController.deleteRideoffer);

  // Request to join a ride offer
  app.post('/rides/:rideId/requests', TokenAuth.verifyToken, RideRequestsController.requestToJoinARideOffer);

  // Fetch All Ride Requests
  app.get('/users/rides/:rideId/requests', TokenAuth.verifyToken, RideRequestsController.getRideRequests);

  // Accept or reject a ride request
  app.put('/users/rides/:rideId/requests/:requestId', TokenAuth.verifyToken, RideRequestsController.acceptOrRejectRideRequest);

  // Error page
  app.get('*', res.status(404).send({
    status: 'Failed',
    error: 'Oops! This page doesn\'t exist'
  });
};

export default routes;
