import { isEmpty } from 'lodash';
import Validator from 'validator';

const validateLogin = (req, res, next) => {
  const { email, password } = req.body
  const error = {};

  if (!password) {
    error.password = "Password is required";
  }

  if (password && Validator.isEmpty(password.trim() || "")) {
    error.password = "Password is required";
  }

  if (!email) {
    error.email = "Email is required";
  }

  if (email && !Validator.isEmail(email.trim() || "")) {
    error.email = "Email is required";
  }

  if (isEmpty(error)) return next();
  return res.status(400).jsom({ error });
};

const validateSignup = (req, res, next) => {
  const {username, email, password, confirmPassword} = req.body;
  const error = {};

  if (!username) {
    error.username = "Username is required";
  }

  if ()
}