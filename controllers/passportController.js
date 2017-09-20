import jwt from "jsonwebtoken";
import randomString from 'randomstring'

import User from "../models/userModel";
import config from "../config/config";

export default {
  registration: (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      res.json({ success: false, message: "Please enter email and password." });
    } else {
      // Generating random name for file
      const randomName = randomString.generate({
        length: 12,
        charset: "alphabetic"
      });
      let avatarName;
      if (req.files && req.files.avatar) {
        const info = req.files.avatar.mimetype.split("/");
        avatarName = `${randomName}.${info[1]}`
        req.files.avatar.mv(`./public/${avatarName}`, err => {
          if (err) return console.log({ message: err.message });
        })
      } else {
        avatarName = 'noavatar.png'
      }
      const { body } = req;
      User({ ...body, avatar: avatarName })
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
                  expiresIn: 259200 // 3 days
                }
              );
              res.json({ success: true, token: `JWT ${token}`, userData: { ...user._doc, password: 0 } });
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
