import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfileCard = ({ user, onFollow, onUnfollow, followerCount, followingCount, currentUser }) => {

  const [followerCounts, setFollowerCounts] = useState({});
  const [followingCounts, setFollowingCounts] = useState({});

  // Function to fetch the latest user data from the server
  const fetchUserData = () => {
    axios.get('/users').then((response) => {
      const users = response.data;

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

  const handleFollow = () => {
    onFollow(user._id);
  };

  const handleUnfollow = () => {
    onUnfollow(user._id);
  };

    // Fetch user data on component mount
    useEffect(() => {
      fetchUserData();
    }, []);

  return (
    <div className="user_profile_card">
      <h3>User Profile</h3>
      <img src={user.thumbnail} alt="User Thumbnail" />
      <p>{user.name}</p>
      <p>Followers: {followerCounts[user._id] || 0}</p>
      <p>Following: {followingCounts[user._id] || 0}</p>
      {user._id !== currentUser._id && (
        <div>
          {user.followers.includes(currentUser._id) ? (
            <button onClick={handleUnfollow}>Unfollow</button>
          ) : (
            <button onClick={handleFollow}>Follow</button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfileCard;
