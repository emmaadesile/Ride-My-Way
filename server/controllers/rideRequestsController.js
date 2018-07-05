import pool from '../models/dbConfig';

class RideRequestsController {
  static getAllRideRequests(req, res) {
    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).send('Unable to connect to database');
      }
      client.query('SELECT * FROM ride_requests', (err, result) => {
        if (err) {
          done();
          res.status(400).send('Unable to get ride requests');
        }
        res.status(200).send({
          success: true, 
          result
        });
      });
    });
  }

  /**
   * Post a Ride Request
   * @param {obj} req
   * @param {obj} res
   * @returns All the rides in db
   * @memberof RideOffersController
   */
  static requestToJoinARideOffer(req, res) {
    const {user_id, ride_id, accepted} = req.body;
    const query = {
      text: 'INSERT INTO ride_requests(user_id, ride_id, accepted) VALUES($1, $2, $3);',
      values: [user_id, ride_id, accepted],
    };
    pool.connect((err, client, done) => {
      if (err) {
        done();
        res.status(500).send({success: false, message: 'Unable to connect to database'});
      }
      client.query(query, (err, result) => {
        if (err) {
          res.status(400).send({
            success: false, message: 'Could process request to join ride offer' });
        }
        res.status(200).send({
          success: true, message: 'Request to join ride offer pending approval from ride owner' });
      });
    });
  }
}


export default RideRequestsController;
