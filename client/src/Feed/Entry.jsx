import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

const Entry = ({ entry, onLike, onRepost }) => {
  const [users, setUsers] = useState([]);
  const [entryUser, setEntryUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);

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

  const handleLike = () => {
    onLike(entry.user);
  };

  const handleRepost = () => {
    onRepost(entry.user);
  };

  return (
    <div className="entry">
      {entryUser && (
        <div className="user_info">
          <img src={entryUser.thumbnail} alt="User Thumbnail" />
          <h3>{entryUser.name}</h3>
        </div>
      )}
      <p>{entry.entry}</p>
      <p>Date: {formatDistanceToNow(new Date(entry.date), { addSuffix: true })}</p>
      <p>Likes: {entry.likes.length}</p>
      <p>Reposts: {entry.reposts.length}</p>

      {/* Like and Repost Buttons */}
      <div>
        <button onClick={handleLike}>{liked ? 'Unlike' : 'Like'}</button>
        <button onClick={handleRepost}>{reposted ? 'Unrepost' : 'Repost'}</button>
      </div>
    </div>
  );
};

export default Entry;
