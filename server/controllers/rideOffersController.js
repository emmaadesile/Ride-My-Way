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
        res.status(500).send({ message: 'Internal sever error' });
      }
      client.query('SELECT * FROM rides', (err, result) => {
        done();
        if (err) {
          res.status(500).json({
            status: 'Failed',
            error: 'An error occured while getting the rides'
          });
        }
        res.status(200).json({
          status: 'Success', 
          rides: result.rows,
        });
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
        res.status(500).josn({
          status: 'Failed',
          error: 'There seems to be an error on the server',
        });
      }
      client.query(`SELECT * FROM rides WHERE ride_id = ${rideId}`, (err, result) => {
        done();
        if (err) {
          res.status(500).json({
            status: 'Failed',
            error: 'Could not fetch this ride',
          });
        }
        return (result.rows === undefined || result.rows.length === 0)
          ? res.status(404).json({
            status: 'Failed',
            error: 'Ride not found'
          })
          : res.status(200).json({
            status: 'Success',
            ride: result.rows,
          });
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
      text: `INSERT INTO rides(user_id, location, destination, departuretime, datecreated, seatsavailable) 
      VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`,
      values: [req.userId, location, destination, departuretime, datecreated, seatsavailable]
    };
    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).json({
          status: 'False',
          error: 'There seems to be an error on the server'
        }); // error connecting to database
      }
      client.query(query, (err, result) => {
        done();
        return err
          ? res.status(500).json({
            status: 'Failed',
            error: 'An error occurred while creating the the ride',
          })
          : res.status(201).json({
            status: 'Success',
            message: 'Ride offer successfully created',
          });
      });
    });
  }
}

export default RideOffersController;
