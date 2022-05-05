const User = require("../../../models/user.models");
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: "431984205371265",
      clientSecret:"8a0e0c834fd308104ed5c2365f159d9c",
      callbackURL: "http://localhost:4000/api/auth/facebook/secrets",
      profileFields: ["email", "name", "photos", "profileUrl"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const { email, first_name } = profile._json;

      const newUser = new User({
        username: first_name,
        email: email,
        img: profile.photos[0].value,
        facebook: true,
        verify: true,
      });

      await newUser.save();

      done(null, profile);
    }
  )
);
