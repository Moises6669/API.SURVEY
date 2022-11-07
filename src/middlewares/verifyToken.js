const JWTstrategy = require("passport-jwt").Strategy;
const passport = require("passport");
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "top_secret",
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    (token, done) => {
      try {
        //Pass the user details to the next middleware
        return done(null, token);
      } catch (error) {
        done(error);
      }
    }
  )
);
