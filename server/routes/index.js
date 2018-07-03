import RideOffersController from '../controllers/rideOffersController';
// import RideRequestsController from "../controllers/rideRequestsController";
import UsersController from '../controllers/usersController';

// Routes for the RideOffersController;
const routes = (app) => {
  // Homepage
  app.get('/', (req, res) =>
    res.status(200).send({
      Success: 'Ride My Way API is live'
    }));

  // User sign up
  app.post('/api/v1/auth/signup', UsersController.createNewUser);

  // Get all ride offers routes
  app.get('/api/v1/rides', RideOffersController.getAllRideOffers);

  // Get a single ride offer
  app.get('/api/v1/rides/:rideId', RideOffersController.getASingleRideOffer);

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

export default routes;
