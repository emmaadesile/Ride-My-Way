import rideOffers from '../models/rideOffers';

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
    const rideOfferResult = rideOffers.find(
      rideOffer => rideOffer.id === parseInt(req.params.rideOfferId, 10)
    );
    return rideOfferResult
      ? res.status(200).json({ ...rideOfferResult })
      : res.status(404).json({ error: "Ride Offer not found" });
  }

  /**
   * Post a Ride Offer
   * @param {obj} req
   * @param {obj} res
   * @returns {json} create a ride offer
   * @memberof RideOffersController
   */
  static createARideOffer(req, res) {
    if (
      req.body.location &&
      req.body.destination &&
      req.body.timeOfDeparture &&
      req.body.price &&
      req.body.createdAt &&
      req.body.expiresAt
    ) {
      // create new ride offer from req.body
      const newId = rideOffers.length + 1;
      req.body.id = newId;

      // push new ride offer to rideoffers
      rideOffers.push(req.body);

      return res.status(201).json({
        success: "Ride offer created successfully"
      });
    }
    return res.status(400).json({
      message: "Please fill in all required fields"
    });
  }

  /**
   * Edit a Ride Offer
   * @param {obj} req
   * @param {obj} res
   * @returns {json} edit a ride offer
   * @memberof RideOffersController
   */
  static editRideOffer(req, res) {
    const rideOfferResult = rideOffers.find(
      rideOffer => rideOffer.id === parseInt(req.params.rideOfferId, 10)
    );

    if (rideOfferResult !== undefined) {
      rideOfferResult.location = req.body.location || rideOfferResult.location;
      rideOfferResult.destination =
        req.body.destination || rideOfferResult.destination;
      rideOfferResult.timeOfDeparture =
        req.body.timeOfDeparture || rideOfferResult.timeOfDeparture;
      rideOfferResult.price = req.body.price || rideOfferResult.price;
      rideOfferResult.createdAt =
        req.body.createdAt || rideOfferResult.createdAt;
      rideOfferResult.expiresAt =
        req.body.expiresAt || rideOfferResult.expiresAt;

      return res.status(201).json({
        success: "Ride Offer successfully updated",
        rideOfferResult
      });
    }
    return res.status(404).json({
      error: "Ride offer not found"
    });
  }

  /**
   * Delete a Ride Offer
   * @param {obj} req
   * @param {obj} res
   * @returns {json} delete a ride offer
   * @memberof RideOffersController
   */
  static deleteRideoffer(req, res) {
    const rideOfferResult = rideOffers.findIndex(rideOffer => (
      rideOffer.id === parseInt(req.params.rideOfferId, 10)
    ));

    if (rideOfferResult !== -1) {
      rideOffers.splice(rideOfferResult, 1);
      return res.status(204).json();
    }
    return res.status(404).json({
      error: "Ride offer not found"
    });
  }
}

export default RideOffersController;
