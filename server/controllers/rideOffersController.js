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

  /**
 * Get A Single Ride Offer
 * @param {obj} req
 * @param {obj} res
 * @returns All a single ride offer in db
 * @memberof RideOffersController
 */
  static getASingleRideOffer(req, res) {
    const rideOfferResult = rideOffers.find(rideOffer => (
      rideOffer.id === parseInt(req.params.rideOfferId, 10)
    ));
    return rideOfferResult
      ? res.status(200).json({ rideOfferResult })
      : res.status(404).json({ error: 'Ride Offer not found' });
  }

  /**
 * Post a Ride Offer
 * @param {obj} req
 * @param {obj} res
 * @returns {json} create a ride offer
 * @memberof RideOffersController
 */
  static createARideOffer(req, res) {
    if (req.body.desination && req.boy.time && req.body.passengers) {
      const newId = rideOffers.length + 1;
      req.body.id = newId;
      rideOffers.push(req.body);

      return res.status(200).json({ success: "Ride offer successfully created" });
    }

    return res.status(400).json({
      error: "Please fill all the required fields"
    });
  }
}

export default RideOffersController;
