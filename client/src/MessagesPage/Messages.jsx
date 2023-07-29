import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import MessageItem from './MessageItem';

const URL = 'http://localhost:3000';
const socket = io(URL, { autoConnect: false });

function Messages() {
  // const navigate = useNavigate();
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
  const [selectedUserSocketId, setSelectedUserSocketId] = useState('');
  // state variable for previous messages with selected user
  const [previousMessages, setPreviousMessages] = useState([]);
  const [refresher, setRefresher] = useState(0);
  // state variable for user we are trying to find to message
  const [searchUser, setSearchUser] = useState('');
  // state variable for incoming dm sender
  const [incomingSender, setIncomingSender] = useState('');
  // new message display variable
  const [newMessage, setNewMessage] = useState('');

  console.log(allUsers, '<---- all users in db')
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
      setIncomingSender(data.name);
      // console.log(data, '<--- data name from incoming dm')
      setNewMessage('new message!');
    });
  }, [socket, refresher]);
  // console.log(incomingSender, '<---incoming sender')
  // Function to handle when an online user is clicked
  const selectUser = (inputUser) => {
    // first, determine if online and if socket emit needs to happen
    // iterate through all users online
    for (let i = 0; i < usersOnline.length; i++) {
      // determine if username of any online user matches input
      if (usersOnline[i].name === inputUser) {
        // set selected user on state to target
        setSelectedUserSocketId(usersOnline[i].userID);
        // set isUserOnline to true
        setIsUserOnline(true);
      }
    }
    // iterate through users in db
    for (let i = 0; i < allUsers.length; i++) {
      // determine if input matches any name
      if (inputUser === allUsers[i].name) {
        // set selectedUser to that user
        setSelectedUser(allUsers[i]);
      }
    }
    console.log(isUserOnline, '<--- are they on');
  };

  // Function for if user was not online
  // const selectOfflineUser = (inputUser) => {
  //   if (selectedUser === '') {
  //     // iterate through users in db
  //     for (let i = 0; i < allUsers.length; i++) {
  //       // determine if input matches any name
  //       if (inputUser === allUsers[i].name) {
  //         // set selectedUser to that user
  //         setSelectedUser(allUsers[i]);
  //       }
  //     }
  //   }
  // };

  // if usersOnline has changed, need to invoke select User to get info with socketID
  // useEffect(() => {
  //   selectUser();
  // }, [usersOnline]);

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
      const firstChunk = await axios.get(`/message/${user._id}/${recipientId}`);
      const secondChunk = await axios.get(`/message/${recipientId}/${user._id}`);
      const allMessagesSorted = firstChunk.data.concat(secondChunk.data).sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
          });
      setPreviousMessages(allMessagesSorted);
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
        recipient: selectedUserSocketId,
      });
    }
    // also save message to the database, regardless of whether recipient is online
    await axios.post('/message', {
      message: message,
      senderName: user.name,
      recipientId: selectedUser._id,
    })
      .then(() => {
        // clear input
        setMessage('');
      })
      .catch((err) => {
        console.error('Failed axios POST message: ', err);
      });

    let count = refresher;
    count += 1;
    setRefresher(count);
    text.target.reset();
  };

  const clearNewMessage = () => {
    setMessageReceived('');
    setIncomingSender('');
    setNewMessage('');
  };

  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  // useRef function to scroll to bottom of messages
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [previousMessages, messageReceived]);

  return (
    <div>
      {/* START OF NAVIGATION BAR */}
      {/* END NAV BAR */}
      <div>
        {/* BEGIN CHATROOM */}
        <div className="messagesContainer dmMessages">
          <h5>
            {previousMessages.map((messageObj, index) => {
                return <MessageItem message={messageObj} key={'message' + index} fromName={incomingSender} messagedReceived={messageReceived} user={user.name}/>;
              })}
          </h5>
          <div className="newMessageContainer">
            <p>
              <span
                className="text-amber-500 hover:text-sky-500 font-bold"
                onClick={() => {selectUser(incomingSender)}}
              >
                {incomingSender}
              </span>
            </p>
            <span>
              {messageReceived}
            </span>
            <p>
              <span className="text-xs">
                {newMessage}
              </span>
            </p>
          </div>
        </div>
        <div ref={messagesEndRef} />
        {/* Find User */}
        <div className="findUserContainer dmSearch fixed bottom-0 right-0">
          <h5>
            <input
              onKeyDown={(e) => (e.key === "Enter" ? selectUser(searchUser) : null)}
              placeholder="Select user..."
              onChange={(event) => {
                setSearchUser(event.target.value);
              }}
            />
            <button
            className="rounded-full ... bg-sky-500"
            type="submit"
            onClick={() => selectUser(searchUser)}
            >
              Find User
            </button>
          </h5>
        </div>
        {/* Send Message */}
        <div className="sendMessageContainer dmSearch fixed bottom-0">
          <input
            onKeyDown={(e) => (e.key === "Enter" ? sendDM(message) : null)}
            placeholder="Message..."
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              clearNewMessage();
            }}
          />
          <button
            className="rounded-full ... bg-sky-500"
            type="submit"
            onClick={() => sendDM(message)}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default Messages;
