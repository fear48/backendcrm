import jwt from "jsonwebtoken";
import config from "../config/config";

export default (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decodedToken = jwt.decode(token.split(" ")[1], config.secret);
    if (decodedToken.userGroup >= 1) {
      next();
    } else next({ status: 403, message: "You have not access" });
  }
};
