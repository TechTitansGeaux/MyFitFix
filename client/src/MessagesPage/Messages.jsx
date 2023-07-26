import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
const URL = 'http://127.0.0.1:3000';
const socket = io(URL, { autoConnect: false });

const Messages = () => {

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

  // const navigate = useNavigate();

  // handle click for send message
  const sendMessage = () => {
    socket.emit('send_message', { message })
  }

    // Effect for getting the current user
    useEffect(() => {
      axios.get('/dashboard/user')
        .then(({ data }) => {
          setUser(data[0]);
          setName(data[0].name);
        })
        .catch((err) => { console.err(err) });
    }, [])

    // function to create user connection
    const createUserConnection = () => {
      // attach username in the auth object and call socket.connect
      socket.auth = { name };
      socket.connect();
    }

    console.log(socket, '<-----socket')
    // Effect for creating user connection
    useEffect(() => {
      createUserConnection();
    }, [name])

    // Effect for listening to socket events
    useEffect(() => {
      socket.on('receive_message', (data) => {
        setMessageReceived(data)
      })
    }, [socket])

  return (
    <div className="dms">
      {/* BEGIN CHATROOM */}
      <input placeholder='Message...' onChange={(event) => {
        setMessage(event.target.value)
      }}/>
      <button onClick={sendMessage}>Send Message</button>
      <h5>Message : {messageReceived}</h5>
    </div>
  )
};

export default Messages
