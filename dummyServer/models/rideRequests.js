import rideOffers from '../models/rides';

const rideRequests = [
  {
    id: rideOffers[0].id,
    noOfRequests: 1,
    passengersId: [1, 2, 3],
  },
  {
    id: rideOffers[1].id,
    noOfRequests: 4,
    passengersId: [1, 2, 3]
  },
  {
    id: rideOffers[2].id,
    noOfRequests: 7,
    passengersId: [1, 2, 3, 4]
  },
  {
    id: rideOffers[3].id,
    noOfRequests: 3,
    passengersId: [1, 2, 3]
  }
];

export default rideRequests;
