import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

const Entry = ({ entry, onLike, currentUserId }) => {
  const [users, setUsers] = useState([]);
  const [entryUser, setEntryUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCounts, setLikeCounts] = useState(0);;

  // Function to fetch the latest user data from the server
  const fetchEntryData = () => {
    axios.get('/following').then((response) => {
      const entries = response.data;

      // Calculate likes for all users
      const likes = {};
      entries.forEach((entry) => {
        likes[entry.user] = entry.likes.length;
      });
      setLikeCounts(likes);
    });
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchEntryData();
  }, []);

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
    onLike(entry._id);
    setLiked(!liked);
    setLikeCounts((prevCounts) => (liked ? prevCounts - 1 : prevCounts + 1)); // Update likeCounts state based on liked state
  };

  useEffect(() => {
    // Set the liked state based on whether the current user has liked this entry
    if (liked) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    // Set the likeCounts state to the number of likes for this entry
    setLikeCounts(entry.likes);
  }, [currentUserId, entry.likes]);

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
      <p>Likes: {likeCounts}</p>

      {/* Like Button */}
      <div>
        <button onClick={handleLike}>{liked ? 'Unlike' : 'Like'}</button>
      </div>
    </div>
  );
};

export default Entry;
