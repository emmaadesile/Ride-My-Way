import pool from '../models/dbConfig';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../helpers/config';


class UsersController {
  /**
   * Get All Ride Offers
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
              const token = jwt.sign({ id: result.rows[0].user_id }, config.secretKey, {
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
}

export default UsersController;
