import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

const URL = 'http://localhost:3000';
const socket = io(URL, { autoConnect: false });

function Messages() {
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  // create variable on state for current user
  const [user, setUser] = useState({});
  // create variable on state for current user's name
  const [name, setName] = useState('');
  // create variable in state for message coming in
  const [message, setMessage] = useState('');
  // create variable in state for message that has been received
  const [messageReceived, setMessageReceived] = useState('');
  // state variable for all online users
  const [usersOnline, setUsersOnline] = useState([]);
  // state variable for selected recipient user
  const [selectedUser, setSelectedUser] = useState('');

  console.log(message, '<----- message')
  console.log(messageReceived, '<------- messageReceived')
  console.log(usersOnline, '<------- users online')
  console.log(selectedUser, '<------- selectedUser')

  // Effect for getting the current user
  useEffect(() => {
    axios.get('/dashboard/user')
      .then(({ data }) => {
        setUser(data[0]);
        setName(data[0].name);
      })
      .catch((err) => {
        console.error('Failed axios GET current user: ', err);
      });
  }, []);

  // function to create user connection
  const createUserConnection = () => {
    // attach username in the auth object and call socket.connect
    socket.auth = { name };
    socket.connect();
  };

  // Effect for creating user connection
  useEffect(() => {
    createUserConnection();
  }, [name]);

  // Effect for listening to socket events
  useEffect(() => {
    socket.on('dm', (data) => {
      setMessageReceived(data.text);
    });
    // Handle the socket user event
    socket.on('users', (users) => {
      // iterate through users array
      users.forEach((oneUser) => {
        // give each user self prop, set boolean according to whether the userID matches socketID
        oneUser.self = oneUser.userID === socket.id;
        // give each user hasNewMessages prop and set to false
        oneUser.hasNewMessages = false;
        // // assign username to name on handshake
        // oneUser.username = socket.auth.name;
        // console.log(socket.auth.name, '<----auth name')
        // set users online to this array of users
        setUsersOnline(users);
      });
      // sort so that self is first and the rest alphabetically
      return users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
    });
  }, [socket]);

  // Function to handle when an online user is clicked
  const selectUser = (inputUser) => {
    // iterate through all users online
    for (let i = 0; i < usersOnline.length; i++) {
      // determine if username of any online user matches input
      if (usersOnline[i].username === inputUser) {
        // set selected user on state to target
        setSelectedUser(usersOnline[i]);
      }
    }
  };

  // Function to sendDM
  const sendDM = (text) => {
    // determine if selectedUser is not an empty string
    if (selectedUser !== '') {
      // send message through socket
      socket.emit('dm', {
        text,
        recipient: selectedUser.userID,
      });
    }
    // also save message to the database
    axios.post('/message', {
      message: message,
      senderId: user._id,
      recipientId: selectedUser.userID,
    })
      .catch((err) => {
        console.error('Failed axios POST message: ', err);
      });
  };

  return (
    <div className="dms">
      {/* BEGIN CHATROOM */}
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button
        type="submit"
        onClick={() => sendDM(message)}
      >
        Send Message
      </button>
      <h5>
        Message:
        {messageReceived}
      </h5>
      <h5>
        Send to:
        <input
          placeholder="Select user..."
          onChange={(event) => {
            selectUser(event.target.value);
          }}
        />
      </h5>
    </div>
  );
}

export default Messages;
