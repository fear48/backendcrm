const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

// const CommentModel = new Schema({
//   uid: { type: String },
//   date: { type: Date, default: Date.now() },
//   comment: { type: String }
// });

const UserModel = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
  // name: { type: String, required: true },
  // surname: { type: String, required: true },
  // patronymic: { type: String, required: false },
  // phoneNumber: { type: String, required: true },
  // birthdate: { type: String, required: true },
  // type: { type: Number, required: true },
  // social: { type: String, required: false },
  // comments: { type: [CommentModel], default: [] }
});

UserModel.pre("save", function(next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Create method to compare password input to password saved in database
UserModel.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    console.log(pw);
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", UserModel, "users");
module.exports = User;
