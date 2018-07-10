import pool from '../models/dbConfig';

class RideRequestsController {
  /**
   * Get All Ride Requests
   * @param {obj} req
   * @param {obj} res
   * @returns A ride requests
   * @memberof RideRequestsController
   */
  static getRideRequests(req, res) {
    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).josn({
          status: 'Failed',
          error: 'There seems to be an error on the server',
        });
      }
      client.query('SELECT * FROM ride_requests', (err, result) => {
        if (err) {
          done();
          res.status(500).json({
            status: 'Failed',
            error: 'Could not get ride requests',
          });
        }
        res.status(200).json({
          status: 'Success',
          request: result.rows[0]
        });
      });
    });
  }

  /**
   * Post A Ride Requests
   * @param {obj} req
   * @param {obj} res
   * @returns post a ride request
   * @memberof RideRequestsController
   */
  static requestToJoinARideOffer(req, res) {
    const userId = req.userId;
    console.log(userId);
    const rideId = parseInt(req.params.rideId, 10);
    const accepted = false;
    const query = {
      text: 'INSERT INTO ride_requests(user_id, ride_id, accepted) VALUES($1, $2, $3);',
      values: [userId, rideId, accepted],
    };
    pool.connect((err, client, done) => {
      if (err) {
        done();
        res.status(500).json({
          status: 'Failed',
          message: 'There seems to be an error on the server'
        });
      }
      client.query(query, (err, result) => {
        if (err) {
          res.status(500).json({
            status: 'Failed',
            error: 'Unable to make request to join ride offer',
          });
        }
        else {
          res.status(200).json({
            status: 'Success',
            message: 'Request to join ride offer pending approval from ride owner' 
          });
        }
      });
    });
  }
}

export default RideRequestsController;
