import dotenv from "dotenv";
import jwt from "jsonwebtoken";

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
  static makeToken({ id }) {
    const token = jwt.sign({ id }, secret, { expiresIn: 86400 });
    return token;
  }

  /**
   * Generate jwt token for sign in
   *
   * @static
   * @param {object} user
   * @returns {string} jwt token
   * @memberof TokenAuth
   */
  static issueToken(id) {
    const token = jwt.sign({ id }, secret, { expiresIn: 86400 });
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
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        auth: false, message: 'No token provided' });
    }

    jwt.verify(token, secret, ((err, decoded) => {
      if (err) {
        return res.status(500).send({
          auth: false, message: 'Failed to authenticate token'});
      }
      // if everything is good, authorise user to view other routes
      req.user_id = decoded.user_id;
      next();
    }));
  }
}

export default TokenAuth;