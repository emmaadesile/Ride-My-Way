import RideOffersController from '../controllers/rideOffersController';


// Routes for the RideOffersController;
const routes = (app) => {
  // Get all ride offers routes
  app.get('/api/v1/rideOffers', RideOffersController.getAllRideOffers);
};

export default routes;
