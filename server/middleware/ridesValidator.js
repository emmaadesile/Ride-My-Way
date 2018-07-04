import { isEmpty } from 'lodash';
import Validator from 'validator';

/*
  @class ridesValidation
  @classdesc Validates user input
*/
class RidesValidation {
  /**
 * Validate input length
 *
 * @static
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next Middleware
 * @return {object} Message and user data
 * @memberof RidesValidation
 */
  static validateRidesDetails(req, res, next) {
    const {
      location, destination, time, date, seatsAvailable
    } = req.body;

    const error = {};

    if (!location) {
      error.location = 'Please enter the location';
    }

    if (location && Validator.isEmpty(location.trim() || '')) {
      error.location = 'Please enter the location';
    }

    if (!destination) {
      error.destination = 'Please enter the destination';
    }

    if (destination && Validator.isEmpty(destination.trim() || '')) {
      error.destination = 'Please enter destination';
    }

    if (!time) {
      error.time = 'Please enter the time';
    }

    if (time && Validator.isEmpty(time.trim() || '')) {
      error.time = 'Please enter time';
    }

    if (!date) {
      error.data = 'Please enter the date';
    }

    if (date && Validator.isEmpty(date.trim() || '')) {
      error.time = 'Please enter date';
    }

    if (!seatsAvailable) {
      error.seatsAvailable = 'Please enter the seatsAvailable';
    }

    if (seatsAvailable && Validator.isEmpty(seatsAvailable.trim() || '')) {
      error.seatsAvailable = 'Please enter the seatsAvailable';
    }

    if (!Validator.isInt(seatsAvailable)) {
      error.seatsAvailable = 'Seats available can only be numbers';
    }

    if (isEmpty(error)) return next();
    return res.status(400).json({ error });
  }
}

export default RidesValidation;

