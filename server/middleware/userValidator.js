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
      const testEmail = /\S+@\S+\.\S+/;
      return testEmail.test(email);
    };

    if (!password) {
      error.password = 'Password is required';
    }

    if (password && password.trim() === '') {
      error.password = 'Password is required';
    }

    // if (password && Validator.isEmpty(password.trim() || '')) {
    //   error.password = 'Password is required';
    // }

    if (!email) {
      error.email = 'Email field cannot be empty';
    }

    if (validateEmail(email) === false) {
      error.email = 'Email address is invalid or empty';
    }

    if (isEmpty(error)) {
      return next();
    }
    return res.status(400).json({ error });
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
      const testEmail = /\S+@\S+\.\S+/;
      return testEmail.test(email);
    };

    if (!firstname) {
      error.firstname = 'Firstname field cannot be empty';
    }
    if (!lastname) {
      error.lastname = 'Lastname field cannot be empty';
    }
    if (!username) {
      error.username = 'Username field cannot be empty';
    }
    if (!email) {
      error.email = 'Email field cannot be empty';
    }
    if (!password) {
      error.password = 'Password field cannot be empty';
    }

    if (!confirmPassword) {
      error.confirmPassword = 'Please confirm your password';
    }

    if (validateEmail(email) === false) {
      error.email = 'Email address is invalid or empty';
    }

    if (Validator.isEmpty(password || '') ||
      Validator.isEmpty(confirmPassword || '') ||
      (password.trim() !== confirmPassword.trim())
    ) {
      error.password = 'Password and confirm password fields do not match';
    }

    if (isEmpty(error)) return next();
    return res.status(400).json({ error });
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
    const { username, password } = req.body;

    function validUser(user) {
      const testUser = /^([a-zA-Z0-9_]+)$/;
      return testUser.test(user);
    }

    if (validUser(username) === false) {
      return res.status(406).json({
        status: 'Fail',
        error: 'Username can only contain numbers and letters'
      });
    }

    if (username.length < 4 || username.length > 12) {
      return res.status(406).json({
        status: 'Fail',
        error: 'Username can only be 4 to 12 characters long'
      });
    }

    if (password.length < 6 || password.length > 15) {
      return res.status(406).json({
        status: 'Fail',
        error: 'Password must be at least 6 chars and at most 15 characters'
      });
    }
    next();
  }
}

export default UserValidation;

