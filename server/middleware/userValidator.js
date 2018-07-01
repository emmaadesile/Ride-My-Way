import { body, check, validationResult } from 'express-validator/check';

const validateSignup = (req, res) => {
  const {
    firstname, lastname, username, phone, email, password
  } = req.body;
  check('firstname', 'firstname cannot be empty').notEmpty();
  check('lastname', 'lastname cannot be empty').notEmpty();
  check('username', 'username cannot be empty').notEmpty();
  check('phone', 'phone number cannot be empty').notEmpty();
  check('email', 'Please enter a valid email').isEmail();
  check('password', 'Password must be 5+ chars long and contain a number')
    .isLength({ min: 5 })
    .equals(req.body.confirmPassword).withMessage('Password does not match confirm password')
    .matches(/\d/);
};

const validateSignin = (req, res) => {
  const { email, password } = req.body;

  check('email', 'Invalid Email').isEmail();
};
