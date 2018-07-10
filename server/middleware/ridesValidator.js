import { isEmpty } from 'lodash';

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
 * @return {object} next() or error
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

    if (location && location.trim() === '') {
      error.location = 'Please enter the location';
    }

    if (location && location.trim() !== location) {
      error.location = 'Please remove extra space(s) added to the location';
    }

    if (!destination) {
      error.destination = 'Please enter the destination';
    }

    if (destination && destination.trim() === '') {
      error.destination = 'Please enter destination';
    }

    if (destination && destination.trim() !== destination) {
      error.destination = 'Please remove extra space(s) added to the destination';
    }

    if (!departuretime) {
      error.departuretime = 'Please enter the departuretime';
    }

    if (departuretime && departuretime.trim() === '') {
      error.departuretime = 'Please enter departuretime';
    }

    if (departuretime && departuretime.trim() !== departuretime) {
      error.departuretime = 'Please remove extra space(s) added to the departuretime';
    }

    if (!datecreated) {
      error.datecreated = 'Please enter the datecreated';
    }

    if (datecreated && datecreated.trim() === '') {
      error.departuretime = 'Please enter datecreated';
    }

    if (datecreated && datecreated.trim() !== datecreated) {
      error.datecreated = 'Please remove extra space(s) added to the datecreated';
    }

    if (!seatsavailable) {
      error.seatsavailable = 'Please enter the seats available';
    }

    if (seatsavailable && seatsavailable.trim() === '') {
      error.seatsavailable = 'Please enter the seatsavailable';
    }

    if (seatsavailable && seatsavailable.trim() !== seatsavailable) {
      error.seatsavailable = 'Please remove extra space(s) added to the seatsavailable';
    }

    if (checkValidNumber(seatsavailable) !== true) {
      error.seatsavailable = 'Seats available must be a number';
    }

    if (isEmpty(error)) return next();
    return res.status(400).json({ error });
  }
}

export default RidesValidation;

