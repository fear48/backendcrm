const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    const decodedToken = jwt.decode(token, config.secret);
    if (decodedToken.userGroup >= 1) {
      next();
    } else next({ status: 403, message: "You have not access" });
  }
};
