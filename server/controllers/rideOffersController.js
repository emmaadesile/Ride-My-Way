<<<<<<< HEAD
import dbConfig from '../models/dbConfig';
=======
import pool from '../models/db';
>>>>>>> bbd67ab72490efcdea2cc8bad365d920c75acb42

class RideOffersController {
  /**
   * Get All Ride Offers
   * @param {obj} req
   * @param {obj} res
   * @returns All the rides in db
   * @memberof RideOffersController
   */
  static getAllRideOffers(req, res) {
<<<<<<< HEAD

  }

  /**
   * Get A Single Ride Offer
   * @param {obj} req
   * @param {obj} res
   * @returns All a single ride offer in db
   * @memberof RideOffersController
   */
  static getASingleRideOffer(req, res) {

  }

  /**
   * Post a Ride Offer
   * @param {obj} req
   * @param {obj} res
   * @returns {json} create a ride offer
   * @memberof RideOffersController
   */
  static createARideOffer(req, res) {

  }

  /**
   * Edit a Ride Offer
   * @param {obj} req
   * @param {obj} res
   * @returns {json} edit a ride offer
   * @memberof RideOffersController
   */
  static editRideOffer(req, res) {

  }

  /**
   * Delete a Ride Offer
   * @param {obj} req
   * @param {obj} res
   * @returns {json} delete a ride offer
   * @memberof RideOffersController
   */
  static deleteRideoffer(req, res) {

=======
    pool.connect((err, client, done) => {
      if (err) {
        console.log(`cannot connect to database: ${err}`);
        res.status(400).send(err);
      }
      client.query('SELECT * FROM rides', (err, result) => {
        done();
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      });
    });
  }

  /**
 * Get A Ride Offer
 * @param {obj} req
 * @param {obj} res
 * @returns A Single rides in db
 * @memberof RideOffersController
 */
  static getASingleRideOffer(req, res) {
    const rideId = parseInt(req.params.rideId);
    pool.connect((err, client, done) => {
      if (err) {
        console.log(`cannot connect to database: ${err}`);
        res.status(400).send(err);
      }
      client.query(`SELECT * FROM rides WHERE id = ${rideId}`, (err, result) => {
        done();
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      });
    });
>>>>>>> bbd67ab72490efcdea2cc8bad365d920c75acb42
  }
}

export default RideOffersController;
