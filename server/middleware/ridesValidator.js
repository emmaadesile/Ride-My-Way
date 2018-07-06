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
 * @return {object} Message and user datecreated
 * @memberof RidesValidation
 */
  static validateRidesDetails(req, res, next) {
    const {
      location, destination, departuretime, datecreated, seatsavailable
    } = req.body;

    // Use this to check if the seats value provied is a number
    function checkValidNumber(val) {
      const numCheck = /^\d+$/;
      return numCheck.test(val);
    }

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

    if (!departuretime) {
      error.departuretime = 'Please enter the departuretime';
    }

    if (departuretime && Validator.isEmpty(departuretime.trim() || '')) {
      error.departuretime = 'Please enter departuretime';
    }

    if (!datecreated) {
      error.datecreated = 'Please enter the datecreated';
    }

    if (datecreated && Validator.isEmpty(datecreated.trim() || '')) {
      error.departuretime = 'Please enter datecreated';
    }

    if (!seatsavailable) {
      error.seatsavailable = 'Please enter the seats available';
    }

    if (checkValidNumber(seatsavailable) !== true) {
      error.seatsavailable = 'Seats available must be a number';
    }

    if (seatsavailable && Validator.isEmpty(seatsavailable.trim() || '')) {
      error.seatsavailable = 'Please enter the seatsavailable';
    }

    if (isEmpty(error)) return next();
    // return res.status(400).json({ error });
  }
}

export default RidesValidation;

