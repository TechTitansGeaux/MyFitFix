const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const mongoose = require('mongoose');
const router = express.Router();

const path = require('path');
const express = require('express');
const { User } = require('./db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//TODO:
app.use(express.static());

const GOOGLE_CLIENT_ID = "871931103939-s4toc7q1cac7d2vdpvgps6kgp9joc0jm.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";


const googleUser = function (passport) {
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


    // if user is authenticated the redirected to next page else redirect to login page
   const ensureAuth = function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    }
    // if user is authenticated and going to login page then redirected to home page if not authenticated redirected to login page  .
   const ensureGuest = function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/log');
      }
    }
  
  



module.exports.googleUser = googleUser;
module.exports.ensureAuth = ensureAuth;
module.exports.ensureGuest = ensureGuest;

