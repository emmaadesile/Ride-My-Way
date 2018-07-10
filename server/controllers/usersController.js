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
    // password = hashedPassword;

    // declare the sign up query
    const query = {
      text: 'INSERT INTO users(firstname, lastname, username, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [firstname, lastname, username, email, hashedPassword],
    };
    // connect to database
    pool.connect((err, client, done) => {
      if (err) {
        done();
        res.status(500).json({ success: false, message: 'There seems to be an error on the server' }); // error connecting to database
      }
      client.query(query, (err, result) => {
        done();
        if (err) {
          res.status(500).json({
            status: 'Failed',
            message: 'There was an error registering the user'
          });
        }
        // select the new user from database     
        client.query('SELECT * from users WHERE email = $1', [email], (err, result) => {
          if (err) {
            res.status(400).send('cannot connect');
          }
          if (result) {
            const newUser = result.rows[0];
            const token = TokenAuth.makeToken(newUser);
            res.status(200).json({
              status: 'Sucess',
              message: 'Sign up successful',
              token,
            });
          }
        });        
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
        done();
        res.status(500).send({ success: false, error: err });
      }
      client.query('SELECT * from users WHERE email = $1', [email], (err, result) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: 'There seems to be an error on the server'
          });
        }
        const user = result.rows[0];
        if (!user) {
          return res.status(404).json({
            status: 'Failed',
            error: 'User not found'
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
        const userId = user.user_id;
        const userToken = TokenAuth.makeToken({ userId });

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
