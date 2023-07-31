const express = require('express');
const authRoutes = require('./routes/auth-routes');
const goalsRoutes = require('./routes/goals-routes');
const progressRoutes = require('./routes/progress-routes');
const journalRoutes = require('./routes/journal-routes');
const dashboardRoutes = require('./routes/dashboard-routes');
const cbRoutes = require('./routes/cb-routes');
const nutritionRoutes = require('./routes/nutrition-routes');
const workoutRoutes = require('./routes/workout-routes');
const passportSetup = require('./config/passport-setup');
const dotenv = require('dotenv');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const feedRoutes = require('./routes/feed-routes');
const userRoutes = require('./routes/user-routes');
const quotesRoutes = require('./routes/quotes-routes');
const messageRoutes = require('./routes/message-routes');

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
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.cookieKey],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Setup routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/journal-entry', journalRoutes);
app.use('/nutrition', nutritionRoutes);
app.use('/cb', cbRoutes);
app.use('/workout', workoutRoutes);
app.use('/goals', goalsRoutes);
app.use('/progress', progressRoutes);
app.use('/feed', feedRoutes);
app.use('/users', userRoutes);
app.use('/quotes', quotesRoutes);
app.use('/message', messageRoutes);

// socket io server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// events for socket io server to listen for
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // send list of all users
  const getOnlineList = () => {
    const users = [];
    for (let [id, socket] of io.of('/').sockets) {
      users.push({
        userID: id,
        name: socket.name,
      });
    }
    io.emit('users', users);
  };
  getOnlineList();

  // socket.on('send_message', (data) => {
  //   socket.broadcast.emit('receive_message', data.message)
  // })
  // when dm event happens
  socket.on('dm', ({ text, recipient }) => {
    // socket.join(recipient);
    // broadcast directly to recipient
    socket.to(recipient).emit('dm', {
      text,
      // identify room by id
      from: socket.id,
      name: socket.handshake.auth.name
    });
  });

  // socket.on('join_room', (data) => {
  //   socket.join(data)
  // })

  /**FOR JOURNAL ENTRIES */

  // Save new journal entry to the database
  socket.on('newJournalEntry', (newEntryData) => {
    const newEntry = new db.Journal(newEntryData);

    newEntry.save((err, savedEntry) => {
      if (err) {
        // Handle error
        console.error('Error saving new journal entry:', err);
      } else {
        // Emit the 'newJournalEntry' event with the saved entry data
        io.emit('newJournalEntry', savedEntry);
      }
    });
  });

  // Delete journal entry from the database
  socket.on('deletedJournalEntry', (deletedEntryId) => {
    db.Journal.findByIdAndDelete(deletedEntryId, (err, deletedEntry) => {
      if (err) {
        // Handle error
        console.error('Error deleting journal entry:', err);
      } else {
        // Emit the 'deletedJournalEntry' event with the deleted entry ID
        io.emit('deletedJournalEntry', deletedEntryId);
      }
    });
  });

  // Handle like event
  socket.on('like', (data) => {
    // Update the database with the like
    // Emit the updated entry data to all connected clients
    io.emit('updateEntry', data);
  });

  // Handle repost event
  socket.on('repost', (data) => {
    // Update the database with the repost
    // Emit the updated entry data to all connected clients
    io.emit('updateEntry', data);
  });

});

// register middleware to add username
io.use((socket, next) => {
  const name = socket.handshake.auth.name;
  socket.name = name;
  next();
});

// commented this out to get working on one server
// // set socket io server to listen on a separate port
// server.listen(3000, () => {
//   console.log('Socket.io server is running!');
// });

//Create home route
// app.get('/', (req, res) => {
//   res.render('home', { user: req.user });
// })

//This handles ANY other file that is not defined, to route to our index.html file, rendering our different React pages (Dashboard, Journal, etc.)
app.get('*', (req, res) => {
  res.sendFile(path.resolve('client', 'dist', 'index.html'));
});

//Listens to the app server convos (aka listening to request)
// try changing from app.listen to server.listen
server.listen(8020, () => {
  console.log('app now listening for request at:', 'http://localhost:8020');
});
