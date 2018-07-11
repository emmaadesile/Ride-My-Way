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
    const rideId = parseInt(req.params.rideId, 10);
    const accepted = false;
    const requestId = req.userId;

    const query = {
      text: 'INSERT INTO ride_requests(user_id, ride_id, request_id, accepted) VALUES($1, $2, $3, $4);',
      values: [userId, rideId, requestId, accepted],
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
            err
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

  /**
   * Post A Ride Requests
   * @param {obj} req
   * @param {obj} res
   * @returns accept or reject a ride request
   * @memberof RideRequestsController
   */
  static acceptOrRejectRideRequest(req, res) {
    const { accepted } = req.body;
    const rideId = parseInt(req.params.rideId, 10);
    const requestId = parseInt(req.params.requestId, 10);
    const query = {
      text: 'INSERT INTO ride_requests(user_id, accepted, ride_id, request_id) VALUES($1, $2, $3, $4) RETURNING *;',
      values: [req.userId, accepted, rideId, requestId]
    };
    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).json({
          status: 'Failed',
          error: 'There seems to be an error on the server'
        });
      }
      client.query(query, (err, result) => {
        done();
        if (err) {
          res.status(500).json({
            status: 'Failed',
            error: 'Your request could not be completed'
          });
        }
        // if the request completes successfully
        res.status(200).json({
          status: 'Success',
          message: 'The ride request has been been completed'
        });
        // client.query('SELECT * FROM ride_requests WHERE ride_request = $1', [requestId], (err, result) => {
        //   if (err) {
        //     res.status(500).json({
        //       status: 'Failed',
        //       error: 'Could not complete the request'
        //     });
        //   }
        //   if (result) {
        //     res.status(200).json({
        //       status: 'Success',
        //       rideRequest: result.rows[0]
        //     });
        //   }
        // });
      });
    });
  }
}

export default RideRequestsController;
