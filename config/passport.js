import { Strategy, ExtractJwt } from "passport-jwt";
import User from "../models/userModel";
import config from "../config/config";

// Setup work and export for the JWT passport strategy
export default function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(
    new Strategy(opts, function(jwtPayload, done) {
      User.findOne({ id: jwtPayload.id })
        .then(user => {
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        })
        .catch(err => {
          done(err, false);
        });
    })
  );
}
