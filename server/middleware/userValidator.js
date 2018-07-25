import { isEmpty } from 'lodash';
import Validator from 'validator';

/*
  @class UserValidation
  @classdesc Validates user input
*/
class UserValidation {
  /**
   * Validate signin
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next Middleware
   * @return {object} Message and user data
   * @memberof UserValidation
   */
  static validateLogin(req, res, next) {
    const { email, password } = req.body;
    const error = {};

    const validateEmail = (checkMail) => {
      const testEmail = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return testEmail.test(email);
    };

    if (!email) {
      error.email = 'Email is required';
    }

    if (email && email.trim === '') {
      error.email = 'Email is required';
    }

    if (email && validateEmail(email) === false) {
      error.email = 'Email address is invalid';
    }

    if (!password) {
      error.password = 'Password is required';
    }

    if (password && password.trim() === '') {
      error.password = 'Password is required';
    }


    if (isEmpty(error)) {
      return next();
    }
    return res.status(406).json({ ...error });
  }

  /**
   * Validate Signup
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next Middleware
   * @return {object} Message and user data
   * @memberof UserValidation
   */
  static validateSignUp(req, res, next) {
    const {
      firstname, lastname, username, email, password, confirmPassword
    } = req.body;
    const error = {};

    const validateEmail = (checkMail) => {
      const testEmail = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return testEmail.test(email);
    };

    // Firstname Validation
    if (!firstname) {
      error.firstname = 'Firstname field cannot be empty';
    }

    if (firstname && firstname.trim() === '') {
      error.firstname = 'Firstname field cannot be empty';
    }

    if (firstname && firstname.trim() !== firstname) {
      error.firstname = 'Please remove extra space(s) added to the firstname';
    }

    // lastname validation
    if (!lastname) {
      error.lastname = 'Lastname field cannot be empty';
    }

    if (lastname && lastname.trim() === '') {
      error.lastname = 'Lastname field cannot be empty';
    }

    if (lastname && lastname.trim() !== lastname) {
      error.lastname = 'Please remove extra space(s) added to the lastname';
    }

    // username validation
    if (!username) {
      error.username = 'Username field cannot be empty';
    }

    if (username && username.trim() === '') {
      error.username = 'Username field cannot be empty';
    }

    if (username && username.trim() !== username) {
      error.username = 'Please remove extra space(s) added to the username';
    }

    // email validation
    if (!email) {
      error.email = 'Email field cannot be empty';
    }

    if (email && email.trim() === '') {
      error.email = 'Email field cannot be empty';
    }

    if (validateEmail(email) === false) {
      error.email = 'Email address is invalid';
    }

    // password validation
    if (!password) {
      error.password = 'Password field cannot be empty';
    }

    if (password && password.trim() === '') {
      error.password = 'Password field cannot be empty';
    }

    if (!password && !confirmPassword) {
      error.password = 'Password field cannot be empty';
    }

    if (password && password.trim() !== password) {
      error.password = 'Please remove extra space(s) added to the password';
    }

    if (!confirmPassword) {
      error.confirmPassword = 'Please confirm your password';
    }

    if (password && !confirmPassword) {
      error.confirmPassword = 'Please confirm your password';
    }

    if (Validator.isEmpty(password || '') ||
      Validator.isEmpty(confirmPassword || '') ||
      (password.trim() !== confirmPassword.trim())
    ) {
      error.password = 'Password and confirm password fields do not match';
    }

    if (isEmpty(error)) return next();
    return res.status(406).json({
      status: 'Failed',
      ...error
    });
  }

  /**
 * Validate input length
 *
 * @static
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next Middleware
 * @return {object} Message and user data
 * @memberof UserValidation
 */
  static validateInputLength(req, res, next) {
    const {
      firstname, lastname, username, password
    } = req.body;

    function validUser(user) {
      const testUser = /^([a-zA-Z0-9_]+)$/;
      return testUser.test(user);
    }

    if (validUser(firstname) === false) {
      return res.status(406).json({
        status: 'Failed',
        error: 'Firstname can only contain numbers and letters'
      });
    }

    if (validUser(lastname) === false) {
      return res.status(406).json({
        status: 'Failed',
        error: 'Lastname can only contain numbers and letters'
      });
    }

    if (validUser(username) === false) {
      return res.status(406).json({
        status: 'Failed',
        error: 'Username can only contain numbers and letters'
      });
    }

    if (username.length < 4 || username.length > 12) {
      return res.status(406).json({
        status: 'Failed',
        error: 'Username must be at least 6 chars and at most 10 characters'
      });
    }

    if (password.length < 6 || password.length > 20) {
      return res.status(406).json({
        status: 'Failed',
        error: 'Password must be at least 6 chars and at most 20 characters'
      });
    }
    next();
  }
}

export default UserValidation;

