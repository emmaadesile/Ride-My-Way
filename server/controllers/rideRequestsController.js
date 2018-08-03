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
    const rideId = parseInt(req.params.rideId, 10);
    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).josn({
          status: 'Failed',
          error: 'There was an error connecting to the server',
          err
        });
      }
      // check if ride exists
      client.query('SELECT * FROM rides WHERE ride_id = $1', [rideId], (err, result) => {
        if (err) {
          res.status(500).josn({
            status: 'Failed',
            error: 'There was an error checking if ride exists',
            err
          });
        }
        return result.rows.length === 0
          ? res.status(400).json({
            status: 'Failed',
            error: 'Ride does not exist. Cannot make request to join',
            err
          })
          // if ride exists, check if there are requests for the ride
          : client.query('SELECT * FROM ride_requests WHERE ride_id = $1', [rideId], (err, result) => {
            if (err) {
              done();
              res.status(500).json({
                status: 'Failed',
                error: 'Something went wrong on the server',
                err
              });
            }
            return result.rows === 'undefined' || result.rows.length === 0
              ? res.status(400).json({
                status: 'Failed',
                error: 'There are no requests for this ride',
              })
              : res.status(200).json({
                status: 'Success',
                request: result.rows[0]
              });
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
    const fullname = req.fullname;
    const rideId = parseInt(req.params.rideId, 10);
    const requestId = req.userId;

    const query = {
      text: 'INSERT INTO ride_requests(user_id, ride_id, request_id, requester_name) VALUES($1, $2, $3, $4);',
      values: [userId, rideId, requestId, fullname],
    };
    pool.connect((err, client, done) => {
      if (err) {
        done();
        res.status(500).json({
          status: 'Failed',
          message: 'There seems to be an error on the server'
        });
      }
      // check if ride exists
      client.query('SELECT ride_id FROM rides WHERE ride_id = $1', [rideId], (err, result) => {
        if (err) {
          done();
          res.status(500).json({
            status: 'Failed',
            message: 'An error occurred while checking if the ride exists'
          });
        }
        return result.rows === 'undefined' || result.rows.length === 0
          ? res.status(400).json({
            status: 'Failed',
            error: 'Cannot request to join because ride does not exist'
          })
          : client.query(query, (err, result) => {
            if (err) {
              res.status(409).json({
                status: 'Failed',
                error: 'You already requested to join this ride',
              });
            } else {
              res.status(200).json({
                status: 'Success',
                message: 'Request to join ride offer pending approval from ride owner'
              });
            }
          });
      });
    });
  }

  /**
   * Accept or reject Ride Requests
   * @param {obj} req
   * @param {obj} res
   * @returns accept or reject a ride request
   * @memberof RideRequestsController
   */
  static acceptOrRejectRideRequest(req, res) {
    const requestStatus = req.body.requestStatus;
    const rideId = parseInt(req.params.rideId, 10);
    const requestId = parseInt(req.params.requestId, 10);
    const query = {
      text: 'UPDATE ride_requests SET request_status = $1 WHERE request_id = $2;',
      values: [requestStatus, requestId]
    };
    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).json({
          status: 'Failed',
          error: 'There seems to be an error on the server'
        });
      }
      // check if the ride exists in the db
      client.query('SELECT ride_id from rides WHERE ride_id = $1', [rideId], (err, result) => {
        if (result.rows === 'undefined' || result.rows.length === 0) {
          res.status(400).json({
            status: 'Failed',
            error: 'You Cannot respond to request because ride does not exist'
          });
        }
        // If the ride exist
        // check if this user is the creator of the ride
        client.query('SELECT user_id from rides WHERE ride_id = $1', [rideId], (err, result) => {
          if (result.rows === 'undefined' || result.rows.length === 0) {
            res.status(400).json({
              status: 'Failed',
              error: 'You cannot modify ride requests for another user'
            });
          }

          // if user's identity is verified, respond to the ride request
          client.query(query, (err, result) => {
            done();
            if (err) {
              res.status(500).json({
                status: 'Failed',
                error: 'Your have already responded to this ride request',
              });
            } else {
              // if the request completes successfully
              res.status(200).json({
                status: 'Success',
                message: `The ride request has been successfully ${requestStatus}`,
              });
            }
          });
        });
      });
    });
  }
}

export default RideRequestsController;
