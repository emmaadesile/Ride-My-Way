import rideRequests from '../models/rideRequests';
import rides from '../models/rides';

class RideRequestsController {
  static getAllRideRequests(req, res) {
    return res.status(200).json({ rideRequests });
  }

  /**
   * Post a Ride Request
   * @param {obj} req
   * @param {obj} res
   * @returns All the rides in db
   * @memberof RideOffersController
   */
  static requestToJoinARideOffer(req, res) {
    const rideOfferResult = rides.findIndex(ride => (
      ride.id === parseInt(req.params.rideId, 10)
    ));

    if (rideOfferResult !== -1) {
      // let [
      //   {
      //     id,
      //     noOfSeats,
      //     seatsAvailable,
      //     noOfRequests,
      //     passengersId
      //   }
      // ] = rideRequests;
      if (rideRequests.seatsAvailable > 0) {
        rideRequests.seatsAvailable -= 1;
        rideRequests.noOfRequests += 1;
        rideRequests.passengersId.push(rideRequests.passengersId.length + 1);
        return res.status(200).json({ success: 'Ride request accepted' });
      } else if (rideRequests.seatsAvailable === 0) {
        return res.status(400).json({ error: 'Ride request rejected. No more seats available' });
      }
    }

    return res.status(404).json({
      error: 'Ride not found'
    });
  }
}


export default RideRequestsController;
