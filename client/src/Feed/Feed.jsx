import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Entry from './Entry';
import Notifications from './Notifications';
import UserSearch from './UserSearch';
import UserProfileCard from './UserProfileCard';
import io from 'socket.io-client';

import './Feed.css';

const Feed = () => {
  const [feedType, setFeedType] = useState('public'); // 'public' or 'following'
  const [entries, setEntries] = useState([]);
  const [page, setPage] = useState(1);
  // create state variable for the current user
  const [currentUser, setCurrentUser] = useState(null);
  const [followerCount, setFollowerCount] = useState(0); // State variable for follower count
  const [followingCount, setFollowingCount] = useState(0); // State variable for following count

  const navigate = useNavigate();

  useEffect(() => {

    // Fetch the current user data
    axios.get('/users/user').then((response) => {
      setCurrentUser(response.data);
      setFollowerCount(response.data.followers.length); // Set initial follower count
      setFollowingCount(response.data.following.length); // Set initial following count
    }).catch((error) => {
      console.error('Error fetching current user:', error);
    });
  }, []);

  // Function to load more journal entries with infinite scroll
  const loadMoreEntries = () => {
    axios
    .get(`feed/${feedType}`)
    .then((response) => {
      setEntries(
        // sorts posts with the most recent at the top of void feed
        response.data.sort((a, b) =>
          b.createdAt > a.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
        )
      );
    })
    .catch((err) => {
      console.error("Error in useEffect axios.get request ===>", err);
    });
  };

  useEffect(() => {
    // Fetch the journal entries based on the feed type and current page
    axios
    .get(`feed/${feedType}`)
    .then((response) => {
      setEntries(
        // sorts posts with the most recent at the top of void feed
        response.data.sort((a, b) =>
          b.createdAt > a.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
        )
      );
    })
    .catch((err) => {
      console.error("Error in useEffect axios.get request ===>", err);
    });
  }, [feedType]);

  // Function to handle follow user
  const handleFollow = (userId) => {
    // Make API call to update the following status on the server
    axios.post(`/users/follow/${userId}`)
      .then(() => {
        // Update the currentUser state to reflect the new following relationship
        setCurrentUser((prevCurrentUser) => ({
          ...prevCurrentUser,
          following: [...prevCurrentUser.following, userId],
        }));
      })
      .catch((error) => {
        console.error('Error following user:', error);
      });
  };

  // Function to handle unfollow user
  const handleUnfollow = (userId) => {
    // Make API call to update the following status on the server
    axios.post(`/users/unfollow/${userId}`)
      .then(() => {
        // Update the currentUser state to reflect the removed following relationship
        setCurrentUser((prevCurrentUser) => ({
          ...prevCurrentUser,
          following: prevCurrentUser.following.filter((id) => id !== userId),
        }));
      })
      .catch((error) => {
        console.error('Error unfollowing user:', error);
      });
  };


 // Function to handle liking a journal entry
 const handleLike = (entryId) => {
  axios
    .post(`/feed/like/${entryId}`)
    .then((response) => {
      // Emit the updated entry data to the server
      socket.emit('like', response.data);
    })
    .catch((error) => {
      console.error('Error liking entry:', error);
    });
};

  return (
    <div className='feed-container'>

 {/* START OF NAVIGATION BAR */}
 <div className="fixed left-0 top-0 h-screen">
        <div className="bg-white dark:bg-gray-800  xl:hidden flex text-gray-800 hover:text-black focus:outline-none focus:text-black justify-between w-full p-6 items-center">
          <div aria-label="toggler" className="flex justify-center items-center">
            <button id="open" onclick="showNav(true)" aria-label="open" className="hidden text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button id="close" onclick="showNav(true)" aria-label="close" className="focus:outline-none dark:text-white text-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
        <div id="Main" className="bg-white dark:bg-gray-800  transform xl:translate-x-0 ease-in-out transition duration-500 flex justify-start items-start w-full sm:w-72 flex-col h-full">
          <button className="hidden xl:flex text-gray-800 dark:text-white hover:text-black focus:outline-none focus:text-black justify-start px-6 pt-6 items-center space-x-3 w-full">
            {/* <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 17H0H1ZM7 17H6H7ZM17 27V28V27ZM27 17H28H27ZM17 0C12.4913 0 8.1673 1.79107 4.97918 4.97918L6.3934 6.3934C9.20644 3.58035 13.0218 2 17 2V0ZM4.97918 4.97918C1.79107 8.1673 0 12.4913 0 17H2C2 13.0218 3.58035 9.20644 6.3934 6.3934L4.97918 4.97918ZM0 17C0 21.5087 1.79107 25.8327 4.97918 29.0208L6.3934 27.6066C3.58035 24.7936 2 20.9782 2 17H0ZM4.97918 29.0208C8.1673 32.2089 12.4913 34 17 34V32C13.0218 32 9.20644 30.4196 6.3934 27.6066L4.97918 29.0208ZM17 34C21.5087 34 25.8327 32.2089 29.0208 29.0208L27.6066 27.6066C24.7936 30.4196 20.9782 32 17 32V34ZM29.0208 29.0208C32.2089 25.8327 34 21.5087 34 17H32C32 20.9782 30.4196 24.7936 27.6066 27.6066L29.0208 29.0208ZM34 17C34 12.4913 32.2089 8.1673 29.0208 4.97918L27.6066 6.3934C30.4196 9.20644 32 13.0218 32 17H34ZM29.0208 4.97918C25.8327 1.79107 21.5087 0 17 0V2C20.9782 2 24.7936 3.58035 27.6066 6.3934L29.0208 4.97918ZM17 6C14.0826 6 11.2847 7.15893 9.22183 9.22183L10.636 10.636C12.3239 8.94821 14.6131 8 17 8V6ZM9.22183 9.22183C7.15893 11.2847 6 14.0826 6 17H8C8 14.6131 8.94821 12.3239 10.636 10.636L9.22183 9.22183ZM6 17C6 19.9174 7.15893 22.7153 9.22183 24.7782L10.636 23.364C8.94821 21.6761 8 19.3869 8 17H6ZM9.22183 24.7782C11.2847 26.8411 14.0826 28 17 28V26C14.6131 26 12.3239 25.0518 10.636 23.364L9.22183 24.7782ZM17 28C19.9174 28 22.7153 26.8411 24.7782 24.7782L23.364 23.364C21.6761 25.0518 19.3869 26 17 26V28ZM24.7782 24.7782C26.8411 22.7153 28 19.9174 28 17H26C26 19.3869 25.0518 21.6761 23.364 23.364L24.7782 24.7782ZM28 17C28 14.0826 26.8411 11.2847 24.7782 9.22183L23.364 10.636C25.0518 12.3239 26 14.6131 26 17H28ZM24.7782 9.22183C22.7153 7.15893 19.9174 6 17 6V8C19.3869 8 21.6761 8.94821 23.364 10.636L24.7782 9.22183ZM10.3753 8.21913C6.86634 11.0263 4.86605 14.4281 4.50411 18.4095C4.14549 22.3543 5.40799 26.7295 8.13176 31.4961L9.86824 30.5039C7.25868 25.9371 6.18785 21.9791 6.49589 18.5905C6.80061 15.2386 8.46699 12.307 11.6247 9.78087L10.3753 8.21913ZM23.6247 25.7809C27.1294 22.9771 29.1332 19.6127 29.4958 15.6632C29.8549 11.7516 28.5904 7.41119 25.8682 2.64741L24.1318 3.63969C26.7429 8.20923 27.8117 12.1304 27.5042 15.4803C27.2001 18.7924 25.5372 21.6896 22.3753 24.2191L23.6247 25.7809Z"
                fill="currentColor" />
            </svg> */}
                        <img
              className='nav-logo'
              src='https://i.pinimg.com/564x/55/40/de/5540de31482047fb26e188037245b9f8.jpg'
            ></img>{' '}  {/* MyFitFix Logo */}
          </button>
          <div className="w-full px-4">
            <hr className="border-gray-100 dark:border-gray-700  w-full" />
          </div>
          {/* Start of List Items */}
          <div className="xl:mt-6 flex flex-col justify-start items-start px-4 w-full space-y-3 pb-5">
            {/* Dashboard List Item */}
            <button className="focus:outline-none flex dark:text-white jusitfy-start hover:text-white focus:bg-sky-500 focus:text-white hover:bg-sky-500 text-gray-600 rounded py-3 pl-4 items-center space-x-6 w-full" onClick={() => navigate('/home')}>
              <svg className="fill-stroke" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19 4H15C14.4477 4 14 4.44772 14 5V9C14 9.55228 14.4477 10 15 10H19C19.5523 10 20 9.55228 20 9V5C20 4.44772 19.5523 4 19 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-base leading-4">Dashboard</p>
            </button>
            {/* Calorie Tracker List Item */}
            <button className="focus:outline-none flex dark:text-white jusitfy-start hover:text-white focus:bg-sky-500 focus:text-white hover:bg-sky-500 text-gray-600 rounded py-3 pl-4 items-center w-full space-x-6" onClick={() => navigate('/tracker')}>
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M112 320c0-93 124-165 96-272 66 0 192 96 192 272a144 144 0 0 1-288 0z" /><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M320 368c0 57.71-32 80-64 80s-64-22.29-64-80 40-86 32-128c42 0 96 70.29 96 128z" />
              </svg>
              <p className="text-base leading-4">Calorie Tracker</p>
            </button>
            {/* Workout Plan List Item */}
            <button className="focus:outline-none dark:text-white flex justify-start items-center space-x-6 hover:text-white focus:bg-sky-500 focus:text-white hover:bg-sky-500 text-gray-600 rounded py-3 pl-4 w-full" onClick={() => navigate('/workout-planner')}>
              <svg width="24" height="24" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M48 256h416" /><rect width="32" height="256" x="384" y="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="16" ry="16" /><rect width="32" height="256" x="96" y="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="16" ry="16" /><rect width="16" height="128" x="32" y="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="8" ry="8" /><rect width="16" height="128" x="464" y="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="8" ry="8" />
              </svg>
              <p className="text-base leading-4">Workout Plan</p>
            </button>
            {/* Journal List Item */}
            <button className="flex dark:text-white justify-start items-center space-x-6 hover:text-white focus:outline-none focus:bg-sky-500 focus:text-white hover:bg-sky-500 text-gray-600 rounded py-3 pl-4 w-full" onClick={() => navigate('/journal-entry')}>
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M364.13 125.25 87 403l-23 45 44.99-23 277.76-277.13-22.62-22.62zm56.56-56.56-22.62 22.62 22.62 22.63 22.62-22.63a16 16 0 0 0 0-22.62h0a16 16 0 0 0-22.62 0z" />
              </svg>
              <p className="text-base leading-4">Journal</p>
            </button>

{/* Quote List Item */}
            <button className="flex dark:text-white justify-start items-center space-x-6 hover:text-white focus:outline-none focus:bg-sky-500 focus:text-white hover:bg-sky-500 text-gray-600 rounded py-3 pl-4 w-full" onClick={() => navigate('/quotes')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/></svg>
            <p className="text-base leading-4">Quotes</p>
            </button>
            {/* Messages */}
            <button className="flex dark:text-white justify-start items-center space-x-6 hover:text-white focus:outline-none focus:bg-sky-500 focus:text-white hover:bg-sky-500 text-gray-600 rounded py-3 pl-4 w-full" onClick={() => navigate('/messages')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="direct-message"><path fill="currentColor" fillRule="evenodd" d="M20.854 3.146a.5.5 0 0 1 .108.544l-7 17a.5.5 0 0 1-.947-.069l-1.927-7.709-7.71-1.927a.5.5 0 0 1-.068-.947l17-7a.5.5 0 0 1 .544.108ZM5.096 10.384l6.525 1.63a.5.5 0 0 1 .364.365l1.631 6.525L19.581 4.42 5.096 10.384Z" clipRule="evenodd"></path><path fill="currentColor" fillRule="evenodd" d="M20.854 3.146a.5.5 0 0 1 0 .708l-9 9a.5.5 0 0 1-.708-.708l9-9a.5.5 0 0 1 .708 0Z" clipRule="evenodd"></path></svg>
            <p className="text-base leading-4">Messages</p>
            </button>

                          {/* Feed List Item */}
  <button className="flex dark:text-white justify-start items-center space-x-6 hover:text-white focus:bg-sky-500 focus:text-white hover:bg-sky-500 text-gray-600 rounded py-3 pl-4 w-full" onClick={() => navigate('/feed')}>
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
    <p className="text-base leading-4">Feed</p>
  </button>

            {/* Divider */}
            <div className="w-full px-4">
              <hr className="border-gray-100 dark:border-gray-700  w-full" />
            </div>
            {/* Sign-out */}
            <button className="flex dark:text-white justify-start items-center space-x-6 hover:text-white focus:outline-none focus:bg-sky-500 focus:text-white hover:bg-sky-500 text-gray-600 rounded py-3 pl-4 w-full" onClick={() => logoutOfApp()}>
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40m64 160 80-80-80-80m-192 80h256" />
              </svg>
              <p className="text-base leading-4">Sign-Out</p>
            </button>
          </div>
        </div>
      </div>
      {/* END NAV BAR */}


   {/* START OF FEED PAGE */}

            {/* Feed Page Content */}
            <div className="feed-content">
        <header className="feed-header">
          <h2>Feed</h2>
        </header>

        {/* User Profile Card */}
        {currentUser && (
          <UserProfileCard
            user={currentUser}
            onFollow={handleFollow}
            onUnfollow={handleUnfollow}
            currentUser={currentUser}
            followerCount={followerCount}
            followingCount={followingCount}
          />
        )}

        {/* Toggle between public and following feed */}
        <div className="feed-toggle">
          <button
            className={feedType === 'public' ? 'active' : ''}
            onClick={() => setFeedType('public')}
          >
            Public Feed
          </button>
          <button
            className={feedType === 'following' ? 'active' : ''}
            onClick={() => setFeedType('following')}
          >
            Following Feed
          </button>
        </div>

        {/* Display the journal entries */}
      <div className="feed-entries">
        {currentUser && entries.map((entry) => (
          <Entry
            key={entry._id}
            entry={entry}
            onLike={handleLike}
            currentUserId={currentUser._id}
          />
        ))}
        {/* Infinite scroll */}
        <button onClick={loadMoreEntries}>Load More</button>
      </div>


        {/* Notifications */}
        <div className="notifications">
          {/* Add your notification content here */}
          <p>New notifications will appear here...</p>
          <Notifications />
        </div>

        {/* User Search */}
        <div className="user-search">
          <UserSearch currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};


export default Feed;
