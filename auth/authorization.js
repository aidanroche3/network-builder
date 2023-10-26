import dotenv from "dotenv";
import jwt from "jsonwebtoken";

class Auth {
  static authorize(req, res, next) {
    dotenv.config();
    if (req.cookies.token) {
      const payload = jwt.verify(req.cookies.token, process.env.TOKEN_KEY);
      if (payload) {
        next();
      } else {
        //Forbidden
        req.error = 403;
        next();
      }
    } else {
      //Unauthorized
      req.error = 401;
      next();
    }
  }

  static getUserInfo(req) {
    dotenv.config();
    return jwt.verify(req.cookies.token, process.env.TOKEN_KEY);
  }
}

export default Auth;
