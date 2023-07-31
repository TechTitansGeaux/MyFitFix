import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfileCard = ({ user, onFollow, onUnfollow, currentUser }) => {
  const [followerCount, setFollowerCount] = useState(user.followers.length || 0);
  const [followingCount, setFollowingCount] = useState(user.following.length || 0);

  const handleFollow = () => {
    onFollow(user._id);
    setFollowerCount(prevCount => prevCount + 1); // Increment follower count locally
  };

  const handleUnfollow = () => {
    onUnfollow(user._id);
    setFollowerCount(prevCount => prevCount - 1); // Decrement follower count locally
  };

  useEffect(() => {
    // Update the follower and following counts whenever the user prop changes
    setFollowerCount(user.followers.length || 0);
    setFollowingCount(user.following.length || 0);
  }, [user]);

  return (
    <div className="user_profile_card">
      <h3>User Profile</h3>
      <img src={user.thumbnail} alt="User Thumbnail" />
      <p>{user.name}</p>
      <p>Followers: {followerCount}</p>
      <p>Following: {followingCount}</p>
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
