import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import pool from '../models/dbConfig';
import TokenAuth from '../helpers/token';

dotenv.config();

class UsersController {
  /**
   * Create a new user
   * @param {obj} req
   * @param {obj} res
   * @returns All the rides in db
   * @memberof UsersController
   */
  static createNewUser(req, res) {
    const {
      firstname, lastname, username, email, password
    } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    // declare the sign up query
    const query = {
      text: 'INSERT INTO users(firstname, lastname, username, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [firstname, lastname, username, email, hashedPassword],
    };
    // connect to database
    pool.connect((err, client, done) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          status: 'Failed',
          error: 'There seems to be an error on the server'
        }); // error connecting to database
        done();
      }

      // insert the new user into the database
      client.query(query, (err, result) => {
        if (err) {
          done();
          res.status(500).json({
            status: 'Failed',
            error: 'User already exists',
          });
        }
        if (result) {
          const newUser = result.rows[0];
          const token = TokenAuth.makeToken({ userId: newUser });
          res.status(201).json({
            status: 'Success',
            message: 'Sign up successful',
            token,
          });
        }
      });
    });
  }

  /**
  * Sign in a user
  * @param {obj} req
  * @param {obj} res
  * @returns Sign in a user
  * @memberof UsersController
  */
  static signin(req, res) {
    const { email, password } = req.body;

    pool.connect((err, client, done) => {
      if (err) {
        // done();
        res.status(500).send({
          status: 'Failed',
          error: 'Oops! An error occurred on the server',
        });
      }
      client.query('SELECT * from users WHERE email = $1', [email], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            status: 'Failed',
            error: 'An error occurred during sign in'
          });
        }
        const user = result.rows[0];
        if (!user) {
          return res.status(401).json({
            status: 'Failed',
            error: 'User does not exist'
          });
        }
        // if user exists in database
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
          return res.status(401).json({
            status: 'Failed',
            error: 'Invalid login credentials'
          });
        }
        // const userId = user.user_id;
        const userToken = TokenAuth.makeToken({ userId: user });

        res.status(200).send({
          status: 'Success',
          message: 'Login Successful',
          userToken,
        });
      });
    });
  }
}

export default UsersController;
