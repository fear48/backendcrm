const jwt = require("jsonwebtoken");
const config = require("../config/config");
const Log = require("../models/logModel");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token, config.secret);
  let actionType;
  if (req.method === "GET") {
    switch (req.url) {
      case "/api/users":
        actionType = "Get all users";
        break;
      default:
        actionType = "default";
    }
  }
  Log({
    uid: decodedToken._id,
    actionType: actionType
  })
    .save(response => {
      console.log(response);
    })
    .then(next());
};
