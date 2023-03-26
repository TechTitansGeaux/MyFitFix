const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const path = require('path');

const { User } = require('./db');

const app = express();


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

router.use(passport.initialize());
router.use(passport.session());


const GOOGLE_CLIENT_ID = "871931103939-s4toc7q1cac7d2vdpvgps6kgp9joc0jm.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";


module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        //get the user data from google
        const newUser = {
          googleId: profile.id,
          name: profile.name,
          dailyEntryId: ''
        }

        try {
          //find the user in our database
          let user = await User.findOne({ googleId: profile.id })

          if (user) {
            //If user present in our database.
            done(null, user)
          } else {
            // if user is not preset in our database save user data to database.
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}


