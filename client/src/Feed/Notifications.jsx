import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get('users/notifications').then((response) => {
      setNotifications(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map((notification) => (
        <div key={notification._id}>
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
