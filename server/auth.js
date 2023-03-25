const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const mongoose = require('mongoose');
const router = requir

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


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8020/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));


  //   function(request, accessToken, refreshToken, profile, done) {
//     User.findOrCreate(
//         { 
//         googleId: profile.id,
//         name: profile.name,
//     }, function (err, profile) {
//       return done(err, profile);
//     });
//   }
//   ));