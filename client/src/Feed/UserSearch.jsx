import React, { useState } from 'react';
import axios from 'axios';

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);

  // Function to handle searching for users
  const handleSearch = () => {
    axios.get(`users/search?query=${searchQuery}`).then((response) => {
      setSearchResults(response.data);
    });
  };

  // Function to handle follow/unfollow user
  const handleFollow = (userId) => {
    axios.post(`users/follow/${userId}`).then((response) => {
      // Update the list of followed users
      setFollowedUsers((prevFollowedUsers) => [...prevFollowedUsers, userId]);
    });
  };

  const handleUnfollow = (userId) => {
    axios.post(`users/unfollow/${userId}`).then((response) => {
      // Update the list of followed users
      setFollowedUsers((prevFollowedUsers) =>
        prevFollowedUsers.filter((id) => id !== userId)
      );
    });
  };

  return (
    <div className="user_search">
      <h2>User Search</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search users..."
      />
      <button onClick={handleSearch}>Search</button>

      {/* Display search results */}
      <div className="search_results">
        <h3>Search Results:</h3>
        {searchResults.map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
            {followedUsers.includes(user.id) ? (
              <button onClick={() => handleUnfollow(user.id)}>Unfollow</button>
            ) : (
              <button onClick={() => handleFollow(user.id)}>Follow</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;
