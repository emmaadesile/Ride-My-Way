import rides from '../models/rides';
// import client from '../models/db';
import pg from 'pg';

const connectionString =
  process.env.DATABASE_URL || 'postgres://manny:dbadmin900@localhost:5432/ride-my-way';

class RideOffersController {
  /**
   * Get All Ride Offers
   * @param {obj} req
   * @param {obj} res
   * @returns All the rides in db
   * @memberof RideOffersController
   */
  static getAllRideOffers(req, res) {
    pg.connect(connectionString, (err, client, done) => {
      if (err) {
        // done()
        console.log(`Unable to connect: ${err}`)
        return res.status(400).json({ error: err });
      }
      client.query('SELECT * FROM rides ORDER BY id ASC;', (err, result) => {
        done();
        if (err) {
          console.log(err);
          res.status(400).json({ error: err });
        }
        res.status(200).json({ 
          message: "success", 
          result: result.rows
        });
      });
    });
    // return res.status(200).json({ rides });
  }

  /**
   * Get A Single Ride Offer
   * @param {obj} req
   * @param {obj} res
   * @returns All a single ride offer in db
   * @memberof RideOffersController
   */
  static getASingleRideOffer(req, res) {
    const rideOfferResult = rides.find(ride => (
      ride.id === parseInt(req.params.rideId, 10)));
    return rideOfferResult
      ? res.status(200).json({ ...rideOfferResult })
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
    if (
      req.body.location &&
      req.body.destination &&
      req.body.timeOfDeparture &&
      req.body.price &&
      req.body.createdAt &&
      req.body.expiresAt
    ) {
      // create new ride offer from req.body
      const newId = rides.length + 1;
      req.body.id = newId;
      const newRide = req.body;

      // push new ride offer to rideoffers
      rides.push(req.body);

      return res.status(201).json({
        success: 'Ride offer created successfully',
        newRide
      });
    }
    return res.status(400).json({
      error: 'Please fill all the required fields'
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
    const rideOfferResult = rides.find(ride => (
      ride.id === parseInt(req.params.rideId, 10)));

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
        success: 'Ride Offer successfully updated',
        rideOfferResult
      });
    }
    return res.status(404).json({
      error: 'Ride offer not found'
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
    const rideOfferResult = rides.findIndex(ride => (
      ride.id === parseInt(req.params.rideId, 10)
    ));

    if (rideOfferResult !== -1) {
      rides.splice(rideOfferResult, 1);
      return res.status(204).json();
    }
    return res.status(404).json({
      error: 'Ride offer not found'
    });
  }
}

export default RideOffersController;
