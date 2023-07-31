import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

const Entry = ({ entry, onLike, onUnlike, currentUserId }) => {
  const [users, setUsers] = useState([]);
  const [entryUser, setEntryUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCounts, setLikeCounts] = useState(0);

  // Function to fetch the latest user data from the server
  const fetchEntryData = () => {
    axios.get(`feed/public`).then((response) => {
      const entries = response.data;
      console.log(entries, '<----HERE');

      // Calculate likes for all users
      let likesCount = 0;
      entries.forEach((entry) => {
        likesCount += entry.likes;
      });
    });
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchEntryData();
  }, [onLike, onUnlike]);

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
    setLiked(true);
    setLikeCounts((prevCounts) => prevCounts + 1); // Update likeCounts state to increment by 1
  };

  const handleUnlike = () => {
    onUnlike(entry._id);
    setLiked(false);
    setLikeCounts((prevCounts) => prevCounts - 1); // Update likeCounts state to decrement by 1
  };

  useEffect(() => {
    // Set the liked state based on whether the current user has liked this entry
    setLiked(currentUserId && entry.likes === currentUserId);
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
      <p>Likes: {likeCounts}</p>
      <p>{formatDistanceToNow(new Date(entry.date), { addSuffix: true })}</p>
      
      {/* Like Button */}
      <div>
        {liked ? (
          <button onClick={handleUnlike}>Unlike</button>
        ) : (
          <button onClick={handleLike}>Like</button>
        )}
      </div>
    </div>
  );
};

export default Entry;
