import pool from '../models/dbConfig';

class RideOffersController {
  /**
   * Get All Ride Of fers
   * @param {obj} req
   * @param {obj} res
   * @returns All the rides in db
   * @memberof RideOffersController
   */
  static getAllRideOffers(req, res) {
    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).send({message: 'Internal sever error'});
      }
      client.query('SELECT * FROM rides', (err, result) => {
        done();
        if (err) {
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
    const rideId = parseInt(req.params.rideId, 10);
    pool.connect((err, client, done) => {
      if (err) {
        console.log(`cannot connect to database: ${err}`);
        res.status(400).send(err);
      }
      client.query(`SELECT * FROM rides WHERE ride_id = ${rideId}`, (err, result) => {
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
  static createARideOffer(req, res) {
    // request pareamaters
    const {
      location, destination, departuretime, datecreated, seatsavailable
    } = req.body;

    // data to be inserted in to the rides table
    const query = {
      text: 'INSERT INTO rides(location, destination, departuretime, datecreated, seatsavailable) VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [location, destination, departuretime, datecreated, seatsavailable]
    };
    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).json({ success: false, message: 'There seems to be an error on the server' }); // error connecting to database
      }
      client.query(query, (err, result) => {
        done();
        if (err) {
          console.log(err.message);
          res.status(400).json({
            success: false, message: 'There was an error creating the the ride'
          });
        }
        if (result) {
          res.status(200).send({
            success: true,
            message: 'Ride offer successfully created',
          });
        }
      });
    });
  }
}

export default RideOffersController;
