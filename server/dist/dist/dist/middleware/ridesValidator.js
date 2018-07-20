'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _lodash = require('lodash');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/*
  @class ridesValidation
  @classdesc Validates user input
*/
var RidesValidation = function () {
  function RidesValidation() {
    _classCallCheck(this, RidesValidation);
  }

  _createClass(RidesValidation, null, [{
    key: 'validateRidesDetails',

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
    value: function () {
      function validateRidesDetails(req, res, next) {
        var _req$body = req.body,
            location = _req$body.location,
            destination = _req$body.destination,
            departuretime = _req$body.departuretime,
            datecreated = _req$body.datecreated,
            seatsavailable = _req$body.seatsavailable;

        // Use this to check if the seats value provied is a number

        function checkValidNumber(val) {
          var numCheck = /^\d+$/;
          return numCheck.test(val);
        }

        var error = {};

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

        // if (seatsavailable && seatsavailable.trim() === '') {
        //   error.seatsavailable = 'Please enter the seatsavailable';
        // }

        // if (seatsavailable && seatsavailable.trim() !== seatsavailable) {
        //   error.seatsavailable = 'Please remove extra space(s) added to the seatsavailable';
        // }

        if (checkValidNumber(seatsavailable) !== true) {
          error.seatsavailable = 'Seats available must be a number';
        }

        if ((0, _lodash.isEmpty)(error)) return next();
        return res.status(406).json({ error: error });
      }

      return validateRidesDetails;
    }()
  }]);

  return RidesValidation;
}();

exports['default'] = RidesValidation;