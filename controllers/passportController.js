const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const config = require("../config/config");

module.exports = {
  registration: (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      res.json({ success: false, message: "Please enter email and password." });
    } else {
      const newUser = new User(req.body);

      // Attempt to save the user
      newUser
        .save()
        .then(response => {
          res.send(response);
        })
        .catch(err => {
          next({ status: 500, message: err.message });
        });
    }
  },
  login: (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          next({ status: 403, message: "User not found" });
        } else {
          // Check if password matches
          user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
              // Create token if the password matched and no error was thrown
              const token = jwt.sign(
                { _id: user._id, userGroup: user.type },
                config.secret,
                {
                  expiresIn: 10080 // in seconds
                }
              );
              res.json({ success: true, token: `JWT ${token}` });
            } else {
              next({ status: 403, message: "Password did not match" });
            }
          });
        }
      })
      .catch(err => {
        next({ status: 403, message: err.message });
      });
  }
};
