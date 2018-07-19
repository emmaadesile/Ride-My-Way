import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secret = process.env.SECRET_KEY;

class TokenAuth {
  /**
   * Generates jwt token for user
   *
   * @static
   * @param {object} user
   * @returns {string} jwt token
   * @memberof TokenAuth
   */
  static makeToken({ userId }) {
    const token = jwt.sign({ userId }, secret, { expiresIn: 86400 });
    return token;
  }

  /**
   * verify jwt token for protected routes
   *
   * @static
   * @param {object} user
   * @returns {string} jwt token
   * @memberof TokenAuth
   */
  static verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send({
        status: 'Failed',
        error: 'User not authorised to access this page'
      });
    }

    jwt.verify(token, secret, ((err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: 'Failed',
          error: 'User not authorised'
        });
      }
      req.userId = decoded.userId;
      // if everything is good, authorise user to view this route
      return next();
    }));
  }
}

export default TokenAuth;
