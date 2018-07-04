import RideOffersController from '../controllers/rideOffersController';
import RideRequestsController from '../controllers/rideRequestsController';
import UsersController from '../controllers/usersController';
import UserValidator from '../middleware/userValidator';
import RidesValidator from '../middleware/ridesValidator';
import TokenAuth from '../helpers/token';

// Routes for the RideOffersController;
const routes = (app) => {
  // Homepage
  app.get('/', (req, res) =>
    res.status(200).send({
      Success: 'Ride My Way API is live'
    }));

  // User sign up
  app.post('/api/v1/auth/signup', UserValidator.validateSignUp, UserValidator.validateInputLength, UsersController.createNewUser);

  // User sign in
  app.post('/api/v1/auth/signin', UserValidator.validateLogin, UsersController.signin);

  // Get all ride offers routes
  app.get('/api/v1/rides', TokenAuth.verifyToken, RideOffersController.getAllRideOffers);

  // Get a single ride offer
  app.get('/api/v1/rides/:rideId', RideOffersController.getASingleRideOffer);

  // Post a ride offer
  app.post('/api/v1/rides', TokenAuth.verifyToken, RidesValidator.validateRidesDetails, RideOffersController.createARideOffer);

  // Edit a ride offer
  // app.put('/api/v1/rides/:rideId', RideOffersController.editRideOffer);

  // Delete a ride offer
  // app.delete('/api/v1/rides/:rideId', RideOffersController.deleteRideoffer);

  // Request to join a ride offer
  // app.post('/api/v1/rides/:rideId/requests', RideRequestsController.requestToJoinARideOffer);

  // View Ride Requests
  // app.get('/api/v1/rideRequests', RideRequestsController.getAllRideRequests);
};

export default routes;
