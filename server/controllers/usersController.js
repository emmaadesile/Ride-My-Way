import pool from '../models/dbConfig';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../helpers/config';

<<<<<<< HEAD
const secretKey = process.env.SECRET_KEY;
=======
dotenv.config();

const secretKey = process.env.SECRET_KEY;

>>>>>>> 3787a611ffe6fc520413c4d5e74ffec7f3ff1534

class UsersController {
  /**
   * Create a new user
   * @param {obj} req
   * @param {obj} res
   * @returns All the rides in db
   * @memberof UsersController
   */
  static createNewUser(req, res) {
    let {
      firstname, lastname, username, email, password
    } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    password = hashedPassword;

    const query = {
      text: 'INSERT INTO users(firstname, lastname, username, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [`${firstname}`, `${lastname}`, `${username}`, `${email}`, `${password}`],
    };
    pool.connect((err, client, done) => {
      if (err) {
        done();
        res.status(500).json({ success: false, error: err });
      }
      client.query(query, (err, result) => {
        if (err) {
          res.status(400).json({ success: false, message: 'There was an error registering the user' });
        }
        if (result) {
          client.query('SELECT user_id from users WHERE email = $1', [email], (err, result) => {
            if (err) {
              res.status(400).send('cannot connect');
            }
            if (result) {
              const token = jwt.sign({ id: result.rows[0].user_id }, secretKey, {
                expiresIn: 86400
              });
              res.status(200).send({
                auth: true,
                token,
                result: result.rows,
              });
            }
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
        done();
        res.status(500).send({ success: false, error: err });
      }
      client.query(`SELECT password from users WHERE email = ${email}`, (err, result) => {
        if (err) {
          res.status(401).json({ success: false, message: 'Problem connecting to server' });
        }
        if (result) {
          const passWordIsValid = bcrypt.compareSync(password, result.password);
          if (passWordIsValid) {
            return res.status(401).send({
            auth: false,
            token: null
            });
          } 
          const token = jwt.sign({ id: result.row[0].user_id }, config.secretKey, { expiresIn: 86400 });
          res.status(200).send({
            auth: true, token
          });
        }
      })
    })
  }
}

export default UsersController;
