const express = require('express');
const authRoutes = require('./routes/auth-routes');
const dashboardRoutes = require('./routes/dashboard-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');


const CLIENT_PATH = path.join(__dirname, '..', 'client', 'dist');
const app = express();

//Set up view engine
app.use(express.static(CLIENT_PATH));
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Setup routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

//Create home route
// app.get('/', (req, res) => {
//   res.render('/profile', { user: req.user });
// })
app.get('*', (req, res) => {
  res.sendFile(path.resolve('client', 'dist', 'index.html'));
})

//This handles ANY other file that is not defined, to route to our index.html file, rendering our different React pages (Dashboard, Journal, etc.)
app.get('*', (req, res) => {                       
  res.sendFile(path.resolve( 'client', 'dist', 'index.html'));                               
});

app.listen(8020, () => {
  console.log('app now listening for request at:', 'http://localhost:8020');
})
