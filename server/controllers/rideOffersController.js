import rideOffers from '../models/ridesOffers';

class RideOffersController {
  /**
   * Get All Ride Offers
   * @param {obj} req
   * @param {obj} res
   * @returns All the rides in db
   * @memberof RideOffersController
   */
  static getAllRideOffers(req, res) {
    return res.status(200).json({ rideOffers });
  }
}

export default RideOffersController;
