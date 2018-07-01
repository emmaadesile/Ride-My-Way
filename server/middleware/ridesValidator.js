import { check, validationResult } from "express-validator/check";

const validateRides = [
  check("currentLocation")
    .isString()
    .withMessage("Current location required")
    .trim(),
  check("destination")
    .isString()
    .withMessage("Destination required")
    .trim(),
  check("depatureTime")
    .isInt()
    .withMessage("Current location required")
    .trim(),
  check("dateCreated")
    .toDate()
    .withMessage("Current location required")
    .trim(),
  check("seatsAvailable")
    .isInt()
    .withMessage("Seats available required")
    .trim()
];

export validateRides;