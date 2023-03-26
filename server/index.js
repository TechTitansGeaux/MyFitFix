

const path = require('path');
const express = require('express');

const passport = require('passport');
//const userAuth = require('./routes')
const session = require('express-session')
const port = 8020;
const distPath = path.resolve(__dirname, '..', 'client', 'dist');

const app = express();

// Middleware - every request runs thru this middleware

app.use(express.json()); // Parse the request body
app.use(express.urlencoded({ extended: true })); // Parses url
//TODO: FIX
app.use(express.static(distPath)); // Statically serve up client directory
// app.set('view engine', 'ejs');



app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routesindex'))
app.use('/auth', require('./auth'))



/** Place all code above here */
app.listen(port, () => {
  console.log(`
  Listening at: http://127.0.0.1:${port}
  `);
});


// module.exports.isLoggedIn = isLoggedIn;
