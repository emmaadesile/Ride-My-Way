import dbConfig from '../models/dbConfig';

class RideOffersController {
  /**
   * Get All Ride Offers
   * @param {obj} req
   * @param {obj} res
   * @returns All the rides in db
   * @memberof RideOffersController
   */
  static getAllRideOffers(req, res) {
    dbConfig.connect((err, client, done) => {
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
    dbConfig.connect((err, client, done) => {
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
  }
}

export default RideOffersController;
