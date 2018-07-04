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
  // static decryptToken(token) {
  //   const userId = jwt.sign(token, secret, (err, decoded) => {
  //     if (err) {
  //       return { auth: false, error: err };
  //     }
  //     return decoded.user_id;
  //   })
  //   return userId;
  // }
}

export default TokenAuth;