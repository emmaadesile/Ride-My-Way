import rideOffers from '../models/rides';

const rideRequests = [
  {
    id: rideOffers[0].id,
    noOfSeats: 5,
    seatsAvailable: 2,
    noOfRequests: 1,
    passengersId: [1, 2, 3],
  },
  {
    id: rideOffers[1].id,
    noOfSeats: 8,
    seatsAvailable: 5,
    noOfRequests: 4,
    passengersId: [1, 2, 3]
  },
  {
    id: rideOffers[2].id,
    noOfSeats: 4,
    seatsAvailable: 2,
    noOfRequests: 3,
    passengersId: [1, 2]
  },
  {
    id: rideOffers[3].id,
    noOfSeats: 10,
    seatsAvailable: 2,
    noOfRequests: 3,
    passengersId: [1, 2, 3]
  }
];

export default rideRequests;
