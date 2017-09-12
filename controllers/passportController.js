import jwt from "jsonwebtoken";
import randomString from 'randomstring'

import User from "../models/userModel";
import config from "../config/config";

export default {
  registration: (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      res.json({ success: false, message: "Please enter email and password." });
    } else {
      // Attempt to save the user
      const { avatar } = req.files;
      if (!avatar) return next({ status: 403, message: "No image provided" })

      const info = avatar.mimetype.split("/");
      if (info[0] === "image") {
        // Generating random name for file
        const randomName = randomString.generate({
          length: 12,
          charset: "alphabetic"
        });
        // Moving dota to folder
        avatar.mv(`./public/${randomName}.${info[1]}`, err => {
          if (err) return next({ status: 403, message: err.message });
          const { body } = req;
          User({ ...body, avatar: `${randomName}.${info[1]}` })
            .save()
            .then(response => {
              res.send(response);
            })
            .catch(err => {
              next({ status: 500, message: err.message });
            });
        });

      } else {
        next({ status: 403, message: "Type of file is not image" });
      }
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
