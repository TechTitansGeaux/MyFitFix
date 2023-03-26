
const express = require('express');
const mongoose=require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
// const session = require('express-session');
 //const router = require('express').Router();
const router = express.Router();
//require('./auth')(passport)

const app = express();

// router.use(express.urlencoded({extended:true}))
// router.use(
//     session({
//       secret: 'keyboard cat',
//       resave: false,
//       saveUninitialized: false,
//       // store: new MongoStore({ mongooseConnection: mongoose.connection }),
//     })
//   )
//   // Passport middleware
// router.use(passport.initialize())
// router.use(passport.session())





router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),(req, res) => {
    res.redirect('/profile')
  }
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})


module.exports = router;


