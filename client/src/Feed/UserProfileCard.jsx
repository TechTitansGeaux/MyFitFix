import React from 'react';

const UserProfileCard = ({ user, onFollow, onUnfollow, followerCount, followingCount, currentUser }) => {
  const handleFollow = () => {
    onFollow(user._id);
  };

  const handleUnfollow = () => {
    onUnfollow(user._id);
  };

  return (
    <div className="user_profile_card">
      <h3>User Profile</h3>
      <img src={user.thumbnail} alt="User Thumbnail" />
      <p>Name: {user.name}</p>
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
