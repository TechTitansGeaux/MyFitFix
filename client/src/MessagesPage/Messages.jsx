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
  // state variable for all users online or not
  const [allUsers, setAllUsers] = useState([]);
  // boolean flag for is the user online
  const [isUserOnline, setIsUserOnline] = useState(false);
  // state variable for selected recipient user
  const [selectedUser, setSelectedUser] = useState('');
  // state variable for previous messages with selected user
  const [previousMessages, setPreviousMessages] = useState([]);

  console.log(message, '<----- message')
  console.log(messageReceived, '<------- messageReceived')
  console.log(usersOnline, '<------- users online')
  console.log(selectedUser, '<------- selectedUser')
  console.log(allUsers, '<---- all users in db')
  console.log(user._id, '<----- my id');

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
    // also get all users in database, online or not
    axios.get('/users')
      .then((usersArray) => {
        console.log(usersArray, '<---- result from axios get users')
        setAllUsers(usersArray.data);
      })
      .catch((err) => {
        console.error('Failed axios GET all users for dms: ', err);
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
        if (a.name < b.name) return -1;
        return a.name > b.name ? 1 : 0;
      });
    });
  }, [socket]);

  // Function to handle when an online user is clicked
  const selectUser = (inputUser) => {
    // first, determine if online and if socket emit needs to happen
    // iterate through all users online
    for (let i = 0; i < usersOnline.length; i++) {
      // determine if username of any online user matches input
      if (usersOnline[i].name === inputUser) {
        // set selected user on state to target
        setSelectedUser(usersOnline[i]);
        // set isUserOnline to true
        setIsUserOnline(true);
      }
    }
    // determine if they were not online
    if (selectedUser === '') {
      // iterate through all users in db regardless of online status
      for (let i = 0; i < allUsers.length; i++) {
        // determine if input user matches any of these saved users
        if (allUsers[i].name === inputUser) {
          // if there's a match, set selected user to saved user
          setSelectedUser(allUsers[i]);
        }
      }
    }
    // // determine if user successfully selected
    // if (selectedUser !== '') {
    //   console.log('will try to axios get previous messages')
    //   // get previous messages between current user and selected user
    //   axios.get('/message', {
    //     senderId: user._id,
    //     recipientName: selectedUser.name,
    //   })
    //     .then((messagesArray) => {
    //       console.log(user._id, '<--- userId from get messages');
    //       console.log(selectedUser, '<----- selected User')
    //       console.log(selectedUser.name, '<-----username from get messages');
    //       console.log(messagesArray, '<---- result from get messages');
    //       setPreviousMessages(messagesArray.data);
    //     })
    //     .catch((err) => {
    //       console.error('Failed axios GET previous messages: ', err);
    //     });
    // }
  };

  // function to get messages from current user and selected user
  const getSelectMessages = () => {
    axios.get('/message', {
      senderId: user._id,
      recipientName: selectedUser.name,
    })
      .then((messagesArray) => {
        console.log(user._id, '<--- userId from get messages');
        console.log(selectedUser, '<----- selected User')
        console.log(selectedUser.name, '<-----username from get messages');
        console.log(messagesArray, '<---- result from get messages');
        setPreviousMessages(messagesArray.data);
      })
      .catch((err) => {
        console.error('Failed axios GET previous messages: ', err);
      });
  };

  // use effect to call get select messages anytime selectedUser is updated
  useEffect(() => {
    getSelectMessages();
  }, [selectedUser]);

  console.log(previousMessages, '<-----previous messages')

  // Function to sendDM
  const sendDM = (text) => {
    // determine if is online
    if (isUserOnline === true) {
      // send message through socket
      socket.emit('dm', {
        text,
        recipient: selectedUser.userID,
      });
    }
    // also save message to the database, regardless of whether recipient is online
    axios.post('/message', {
      message: message,
      recipientName: selectedUser.name,
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
      <h5>
        Previous messages:
        {previousMessages}
      </h5>
    </div>
  );
}

export default Messages;
