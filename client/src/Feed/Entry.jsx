import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Entry = ({ entry }) => {
  const [users, setUsers] = useState([]);
  const [entryUser, setEntryUser] = useState(null);

  // Function to fetch all users from the server
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // Find the user who submitted the entry
    if (users.length > 0 && entry.user) {
      const user = users.find((user) => user._id === entry.user);
      setEntryUser(user);
    }
  }, [users, entry.user]);

  return (
    <div className="entry">
      {entryUser && (
        <div className="user_info">
          <img src={entryUser.thumbnail} alt="User Thumbnail" />
          <h3>{entryUser.name}</h3>
        </div>
      )}
      <p>{entry.entry}</p>
      {/* Display other details like date, likes, reposts, and interaction buttons */}
      {/* Add logic to handle interactions like likes and reposts */}
    </div>
  );
};

export default Entry;
