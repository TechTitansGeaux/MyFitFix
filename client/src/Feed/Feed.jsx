import React from 'react';
import JournalEntry from './JournalEntry';
import SearchUsers from './UserSearch';
import Notifications from './Notifications';

const Feed = () => {
  return (
    <div className='feed'>
      <header className='feed_header'>
        <h2>Feed</h2>
      </header>
      <JournalEntry />
      <SearchUsers />
      <Notifications />
    </div>
  );
};

export default Feed;
