import rideOffers from "../models/rideOffers";

const rideRequests = [
  {
    id: rideOffers[0].id,
    noOfSeats: 5,
    seatsAvailable: 2,
    requests: [
      {
        noOfRequests: 1,
        passengersId: [1, 3]
      }
    ]
  },
  {
    id: rideOffers[1].id,
    noOfSeats: 8,
    seatsAvailable: 3,
    requests: [
      {
        noOfRequests: 1,
        passengersId: [1, 3]
      }
    ]
  },
  {
    id: rideOffers[2].id,
    noOfSeats: 4,
    seatsAvailable: 2,
    requests: [
      {
        noOfRequests: 1,
        passengersId: [1, 3]
      }
    ]
  },
  {
    id: rideOffers[3].id,
    noOfSeats: 10,
    seatsAvailable: 2,
    requests: [
      {
        noOfRequests: 2,
        passengersId: [1, 3]
      }
    ]
  }
];

export default rideRequests;
