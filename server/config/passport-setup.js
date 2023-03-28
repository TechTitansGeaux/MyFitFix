require('dotenv').config();
const passport = require('passport');
// const client_id = require('../config.js');
// const clientSecret = require('../config.js');
const GoogleStrategy = require('passport-google-oauth20');
//const keys = require('./keys');
const { User } = require('../db/index');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      console.error(err);
    })
});

passport.use(
  new GoogleStrategy({
    //options for strategy
    callbackURL: '/auth/google/redirect',
    clientID: process.env.client_id,
    clientSecret: process.env.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    //Passport callback function

    //Check if user already exist in our db
    User.findOne({ googleId: profile.id })
      .then((currentUser) => {
        if (currentUser) {
          //Already have user
          done(null, currentUser);
        } else {
          //If not, create user in our db
          new User({
            name: profile.displayName,
            googleId: profile.id,
            thumbnail: profile._json.picture
          }).save()
            .then((newUser) => {
              done(null, newUser);
            })
            .catch((err) => {
              console.error(err);
            })
        }
      })
      .catch((err) => {
        console.error(err);
      })
  })
)