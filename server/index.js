

const path = require('path');
const express = require('express');
//TODO: FIX
// const { Tasks } = require('./db');


const port = 8020;
//TODO: FIX DIST
const distPath = path.resolve(__dirname, '..', 'client', 'dist');

const app = express();

// Middleware - every request runs thru this middleware

app.use(express.json()); // Parse the request body
app.use(express.urlencoded({ extended: true })); // Parses url
//TODO: FIX
app.use(express.static(distPath)); // Statically serve up client directory
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('login');
})

//This handles ANY other file that is not defined, to route to our index.html file, rendering our different React pages (Dashboard, Journal, etc.)
app.get('*', (req, res) => {                       
  res.sendFile(path.resolve( 'client', 'dist', 'index.html'));                               
});



/** Place all code above here */
app.listen(port, () => {
  console.log(`
  Listening at: http://127.0.0.1:${port}
  `);
});
