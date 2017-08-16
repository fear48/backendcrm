import jwt from "jsonwebtoken";
import config from "../config/config";
import Log from "../models/logModel";

export default (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decodedToken = jwt.decode(token.split(" ")[1], config.secret);
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
  }
};
