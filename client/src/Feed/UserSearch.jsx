import React, { useState } from 'react';
import axios from 'axios';

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [following, setFollowing] = useState([]);

  // Function to handle searching for users
  const handleSearch = () => {
    axios.get(`/users/search?query=${searchQuery}`).then((response) => {
      setSearchResults(response.data);
    }).catch((error) => {
      console.error('Error searching users:', error);
    });
  };

  // Function to handle follow/unfollow user
  const handleFollow = (userId) => {
    axios.post(`/users/follow/${userId}`).then((response) => {
      // Update the list of followed users
      setFollowing((prevFollowing) => [...prevFollowing, userId]);
    }).catch((error) => {
      console.error('Error following user:', error);
    });
  };

  const handleUnfollow = (userId) => {
    axios.post(`/users/unfollow/${userId}`).then((response) => {
      // Update the list of followed users
      setFollowing((prevFollowing) => prevFollowing.filter((id) => id !== userId));
    }).catch((error) => {
      console.error('Error unfollowing user:', error);
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
          <div key={user._id}>
            <p>{user.name}</p>
            {following.includes(user._id) ? (
              <button onClick={() => handleUnfollow(user._id)}>Unfollow</button>
            ) : (
              <button onClick={() => handleFollow(user._id)}>Follow</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;
