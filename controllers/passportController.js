const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const config = require("../config/config");

module.exports = {
  registration: (req, res) => {
    if (!req.body.email || !req.body.password) {
      res.json({ success: false, message: "Please enter email and password." });
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      // Attempt to save the user
      newUser.save(function(err) {
        if (err) {
          return next({ status: 403, message: "User already exist" });
        }
        res.json({ success: true, message: "Successfully created new user." });
      });
    }
  },
  login: (req, res) => {
    User.findOne(
      {
        email: req.body.email
      },
      function(err, user) {
        if (err);
        if (!user) {
          next({ status: 403, message: "User not found" });
        } else {
          // Check if password matches
          user.comparePassword(req.body.password, function(err, isMatch) {
            if (isMatch && !err) {
              // Create token if the password matched and no error was thrown
              var token = jwt.sign(user, config.secret, {
                expiresIn: 10080 // in seconds
              });
              res.json({ success: true, token: "JWT " + token });
            } else {
              next({ status: 403, message: "Password did not match" });
            }
          });
        }
      }
    );
  }
};
