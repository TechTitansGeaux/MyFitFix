import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserSearch = ({ currentUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [followerCounts, setFollowerCounts] = useState({});
  const [followingCounts, setFollowingCounts] = useState({});
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);

  // Function to fetch the latest user data from the server
  const fetchUserData = () => {
    axios.get('/users').then((response) => {
      const users = response.data;
      setSearchResults(users);

      // Calculate follower and following counts for all users
      const followers = {};
      const following = {};
      users.forEach((user) => {
        followers[user._id] = user.followers.length;
        following[user._id] = user.following.length;
      });
      setFollowerCounts(followers);
      setFollowingCounts(following);
    });
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Function to handle searching for users
  const handleSearch = () => {
    axios
      .get(`/users/search?query=${searchQuery}`)
      .then((response) => {
        // Add "isFollowing" property to the search results based on the currentUser's following list
        const updatedResults = response.data.map((user) => ({
          ...user,
          isFollowing: currentUser.following.includes(user._id),
        }));
        setSearchResults(updatedResults);
        setSearchButtonClicked(true); // Set the search button clicked to true
      })
      .catch((error) => {
        console.error('Error searching users:', error);
      });
  };

  // Function to handle follow user
  const handleFollow = (userId) => {
    // Prevent following yourself
    if (userId === currentUser._id) return;

    // Update the "isFollowing" property in the searchResults state directly
    setSearchResults((prevResults) =>
      prevResults.map((user) =>
        user._id === userId ? { ...user, isFollowing: true } : user
      )
    );

    // Update the follower and following counts for the current user and the target user
    setFollowingCounts((prevFollowingCounts) => ({
      ...prevFollowingCounts,
      [currentUser._id]: (prevFollowingCounts[currentUser._id] || 0) + 1,
      //[userId]: (prevFollowingCounts[userId] || 0) + 1,
    }));
    setFollowerCounts((prevFollowerCounts) => ({
      ...prevFollowerCounts,
      //[currentUser._id]: (prevFollowerCounts[currentUser._id] || 0) + 1,
      [userId]: (prevFollowerCounts[userId] || 0) + 1,
    }));

    // Make API call to update the following status on the server
    axios.post(`/users/follow/${userId}`).catch((error) => {
      console.error('Error following user:', error);
    });
  };

  // Function to handle unfollow user
  const handleUnfollow = (userId) => {
    // Prevent unfollowing yourself
    if (userId === currentUser._id) return;

    // Update the "isFollowing" property in the searchResults state directly
    setSearchResults((prevResults) =>
      prevResults.map((user) =>
        user._id === userId ? { ...user, isFollowing: false } : user
      )
    );

    // Update the follower and following counts for the current user and the target user
    setFollowingCounts((prevFollowingCounts) => ({
      ...prevFollowingCounts,
      [currentUser._id]: (prevFollowingCounts[followingCounts[currentUser._id]]),
      //[userId]: (prevFollowingCounts[userId]),
    }));
    setFollowerCounts((prevFollowerCounts) => ({
      ...prevFollowerCounts,
      //[currentUser._id]: (prevFollowerCounts[currentUser._id] || 0) - 1,
      [userId]: (prevFollowerCounts[followerCounts[userId]]),
    }));

    // Make API call to update the following status on the server 
    axios.post(`/users/unfollow/${userId}`).catch((error) => {
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
      {searchButtonClicked && searchResults.length > 0 && (
        <div className="search_results">
          <h3>Search Results:</h3>
          {searchResults.map((user) => (
            <div key={user._id} className="search_result_item">
              <img src={user.thumbnail} alt="User Thumbnail" />
              <div className="user_info">
                <p>{user.name}</p>
                <p>Followers: {followerCounts[user._id] || 0}</p>
                <p>Following: {followingCounts[user._id] || 0}</p>
              </div>
              <div className="follow-button">
                {!user.isFollowing ? (
                  <button onClick={() => handleFollow(user._id)}>Follow</button>
                ) : (
                  <button disabled>Follow</button>
                )}
              </div>
              <div className="unfollow-button">
                {user.isFollowing ? (
                  <button onClick={() => handleUnfollow(user._id)}>Unfollow</button>
                ) : (
                  <button disabled>Unfollow</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSearch;
