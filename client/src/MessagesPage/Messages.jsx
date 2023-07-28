import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import MessageItem from './MessageItem';

const URL = 'http://localhost:3000';
const socket = io(URL, { autoConnect: false });

function Messages() {
  // socket.onAny((event, ...args) => {
  //   getOnlineUsers();
  //   console.log(event, args);
  // });

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
  const [refresher, setRefresher] = useState(0);

  // console.log(allUsers, '<---- all users in db')
  // console.log(user._id, '<----- my id');
  console.log(usersOnline, '<------- users online')
  // console.log(message, '<----- message')
  // console.log(messageReceived, '<------- messageReceived')
  console.log(selectedUser, '<------- selectedUser')
  console.log(previousMessages, '<---- previous messages')

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
  }, [name, socket, refresher]);

  // Function to handle the socket user event
  // const getOnlineUsers = () => {
  socket.on('users', (users) => {
    // iterate through users array
    users.forEach((oneUser) => {
      // give each user self prop, set boolean according to whether the userID matches socketID
      oneUser.self = oneUser.userID === socket.id;
      // give each user hasNewMessages prop and set to false
      oneUser.hasNewMessages = false;
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
  // };

  // Effect for listening to socket events
  useEffect(() => {
    socket.on('dm', (data) => {
      setMessageReceived(data.text);
    });
  }, [socket, refresher]);

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
        console.log(isUserOnline, '<---is user online at select user')
      }
    }
  };

  // function to get messages from current user and selected user
  const getPreviousMessages = async () => {
    if (selectedUser !== '') {
      let recipientId;
      // iterate through all users in database
      for (let i = 0; i < allUsers.length; i++) {
        // determine if any have same name as online user
        if (allUsers[i].name === selectedUser.name) {
          // grab their id
          recipientId = allUsers[i]._id;
        }
      }
      // get all messages from user to selected user
      await axios.get(`/message/${user._id}/${recipientId}`)
        .then((messagesArray) => {
          // console.log(user._id, '<--- userId from get messages');
          // console.log(selectedUser._id, '<-----selected userId from get messages');
          // console.log(messagesArray, '<---- result from get messages');
          // sort messages by most recent
          const sortedArray = messagesArray.data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setPreviousMessages(sortedArray);
        })
        .catch((err) => {
          console.error('Failed axios GET previous messages: ', err);
        });
      // get all messages from selected user to user
      // await axios.get(`/message/${recipientId}/${user._id}`)
      //   .then((messagesArray) => {
      //     const oldMessages = previousMessages;
      //     const sortedArray = oldMessages.concat(messagesArray.data).sort((a, b) => {
      //       return new Date(b.createdAt) - new Date(a.createdAt);
      //     });
      //     setPreviousMessages(sortedArray);
      //   })
      //   .catch((err) => {
      //     console.error('Failed axios GET previous messages from selected user: ', err);
      //   });
    }
};

  // use effect to call get select messages anytime selectedUser is updated
  useEffect(() => {
    getPreviousMessages();
  }, [selectedUser, message, socket, refresher]);

  // console.log(previousMessages, '<-----previous messages')

  // Function to sendDM
  const sendDM = async (text) => {
    // determine if is online
    if (selectedUser !== '') {
      // send message through socket
      socket.emit('dm', {
        text,
        recipient: selectedUser.userID,
      });
    }
    // declare variable to catch the recipients USER id, NOT socket id
    let recipientId;
    // iterate through all users in database
    for (let i = 0; i < allUsers.length; i++) {
      // determine if any have same name as online user
      if (allUsers[i].name === selectedUser.name) {
        // grab their id
        recipientId = allUsers[i]._id;
      }
      // now clear selected user?
      // setSelectedUser('');
    }
    // also save message to the database, regardless of whether recipient is online
    await axios.post('/message', {
      message: message,
      senderName: user.name,
      recipientId: recipientId,
    })
      .catch((err) => {
        console.error('Failed axios POST message: ', err);
      });

    let count = refresher;
    count += 1;
    setRefresher(count);

    // return () => {
    //   socket.off('dm');
    // };
  };

  socket.onAny((event, ...args) => {
    console.log(event, args);
  });


  return (
    <div className="dms">
      {/* BEGIN CHATROOM */}
      <h5>
        Send to:
        <input
          placeholder="Select user..."
          onChange={(event) => {
            selectUser(event.target.value);
          }}
        />
      </h5>
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
        Previous messages:
        {previousMessages.map((messageObj, index) => {
            return <MessageItem message={messageObj} key={'message' + index}/>;
          })}
      </h5>
    </div>
  );
}

export default Messages;
