const express = require('express');
const authRoutes = require('./routes/auth-routes');
const journalRoutes = require('./routes/journal-routes');
const dashboardRoutes = require('./routes/dashboard-routes');
const cbRoutes = require('./routes/cb-routes');
const nutritionRoutes = require('./routes/nutrition-routes')
const workoutRoutes = require('./routes/workout-routes')
const passportSetup = require('./config/passport-setup');
const dotenv = require('dotenv');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
require('dotenv').config();
// socket io variables
const http = require('http');
const { Server } = require('socket.io');
// import cors
const cors = require('cors');

const CLIENT_PATH = path.join(__dirname, '..', 'client', 'dist');
const app = express();


//Set up view engine
app.use(express.static(CLIENT_PATH));
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.cookieKey]
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Mount cors middleware
app.use(cors())

//Setup routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/journal-entry', journalRoutes);
app.use('/nutrition', nutritionRoutes);
app.use('/cb', cbRoutes);
app.use('/workout', workoutRoutes);

// socket io server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8020'
  }
})

// events for socket io server to listen for
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`)

  // send list of all users
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit('users', users);

  // socket.on('send_message', (data) => {
  //   socket.broadcast.emit('receive_message', data.message)
  // })
  // when dm event happens
  socket.on('dm', ({ text, recipient }) => {
    socket.join(recipient);
    // broadcast directly to recipient
    socket.broadcast.to(recipient).emit('dm', {
      text,
      // identify room by id
      from: socket.id,
    });
  });

  // socket.on('join_room', (data) => {
  //   socket.join(data)
  // })
})

// register middleware to add username
io.use((socket, next) => {
  const username = socket.handshake.auth.name;
  socket.username = username;
  next();
});

// set socket io server to listen on a separate port
server.listen(3000, () => {
  console.log('Socket.io server is running!')
})

//Create home route
// app.get('/', (req, res) => {
//   res.render('home', { user: req.user });
// })

//This handles ANY other file that is not defined, to route to our index.html file, rendering our different React pages (Dashboard, Journal, etc.)
app.get('*', (req, res) => {
  res.sendFile(path.resolve('client', 'dist', 'index.html'));
});

//Listens to the app server convos (aka listening to request)
app.listen(8020, () => {
  console.log('app now listening for request at:', 'http://localhost:8020');
})
