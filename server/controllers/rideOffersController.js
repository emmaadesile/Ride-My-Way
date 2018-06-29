import pool from '../models/db';

class RideOffersController {
  /**
   * Get All Ride Offers
   * @param {obj} req
   * @param {obj} res
   * @returns All the rides in db
   * @memberof RideOffersController
   */
  static getAllRideOffers(req, res) {
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
}

export default RideOffersController;
