const express = require('express');
const path = require('path');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const passport = require('passport');
// const session = require('express-session');
// const router = require('express').Router();

const app = express();

const distPath = path.resolve(__dirname, '..', 'client', 'dist');


app.use(express.static(distPath)); // Statically serve up client directory

// const { ensureAuth, ensureGuest } = require('./auth.js');





// router.get('/', ensureGuest, (req, res) => {
//   res.render('login')
// })

// router.get('/log', ensureAuth, async (req, res) => {
//   res.render('index', { userinfo: req.user })
// })

// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

// router.get(
//   '/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     res.redirect('/log')
//   }
// )

// router.get('/logout', (req, res) => {
//   req.logout()
//   res.redirect('/')
// })


// module.exports = router;

app.listen(8020, () => {
  console.log(`
  Listening at: http://127.0.0.1:${8020}
  `);
});

module.exports = app;
