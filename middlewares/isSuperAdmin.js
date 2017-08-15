import jwt from "jsonwebtoken";
import config from "../config/config";

export default (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    const decodedToken = jwt.decode(token, config.secret);
    if (decodedToken.userGroup === 2) {
      next();
    } else next({ status: 403, message: "You have not access" });
  }
};
