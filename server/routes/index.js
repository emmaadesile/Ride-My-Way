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
      Success: 'Ride My Way API is live'
    }));

  // User sign up
  app.post('/auth/signup', UserValidator.validateSignUp, UserValidator.validateInputLength, UsersController.createNewUser);

  // User sign in
  app.post('/auth/signin', UserValidator.validateLogin, UsersController.signin);

  // Get all ride offers routes
  app.get('/rides', TokenAuth.verifyToken, RideOffersController.getAllRideOffers);

  // Get a single ride offer
  app.get('/rides/:rideId', TokenAuth.verifyToken, RideOffersController.getASingleRideOffer);

  // Post a ride offer
  app.post('/rides', TokenAuth.verifyToken, RidesValidator.validateRidesDetails, RideOffersController.createARideOffer);

  // Edit a ride offer
  // app.put('/rides/:rideId', RideOffersController.editRideOffer);

  // Delete a ride offer
  // app.delete('/rides/:rideId', RideOffersController.deleteRideoffer);

  // Request to join a ride offer
  app.post('/rides/:rideId/requests', TokenAuth.verifyToken, RideRequestsController.requestToJoinARideOffer);

  // View Ride Requests
  app.get('/rideRequests', TokenAuth.verifyToken, RideRequestsController.getRideRequests);
};

export default routes;
