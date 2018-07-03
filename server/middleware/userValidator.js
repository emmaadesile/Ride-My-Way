<<<<<<< HEAD
import { check, validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';

const { confirmPassword } = req.body;

const validateSignup = [
  check('firstname')
    .isLength({ min: 4 })
    .withMessage('firstname is required')
    .trim(),
  check('lastname')
    .isLength({ min: 4 })
    .withMessage('lastname is required'),
  check('username')
    .isLength({ min: 4 })
    .withMessage('username is required'),
  check('email')
    .isEmail()
    .withMessage('Invalid email')
    .trim()
    .normalizeEmail(),
  check('password')
    .isLength({ min: 6 })
    .equals(confirmPassword)
    .withMessage('Password does not match confirm password')
    .matches(/\d/),
];

const validateSignin = [
  check('email')
    .isEmail()
    .withMessage('Invalid eamil')
    .trim()
    .normalizeEmail()
];

export { validateSignup, validateSignin };
=======
>>>>>>> eae85bb063e917f67ea669f3c5175f13f224c458
