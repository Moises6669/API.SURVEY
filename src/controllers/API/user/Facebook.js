const User = require("../../../models/user.models");
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: "431984205371265",
      clientSecret: "8a0e0c834fd308104ed5c2365f159d9c",
      callbackURL: "http://localhost:4000/api/auth/facebook/secret",
    },
    (accessToken, refreshToken, profile, done) => {
      const { email, first_name, last_name } = profile._json;
      console.log(profile);
      const userData = {
        email,
        firstName: first_name,
        lastName: last_name,
      };
      done(null, profile);
    }
  )
);
