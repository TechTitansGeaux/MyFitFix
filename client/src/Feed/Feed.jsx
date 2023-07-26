import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JournalEntry from './JournalEntry';
import Notifications from './Notifications';
import UserSearch from './UserSearch';

const Feed = () => {
  const [feedType, setFeedType] = useState('public'); // 'public' or 'following'
  const [journalEntries, setJournalEntries] = useState([]);
  const [page, setPage] = useState(1);

  // Function to load more journal entries with infinite scroll
  const loadMoreEntries = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    // Fetch the journal entries based on the feed type and current page
    axios.get(`feed/${feedType}?page=${page}`).then((response) => {
      setJournalEntries((prevEntries) => [...prevEntries, ...response.data]);
    });
  }, [feedType, page]);

  return (
    <div className="feed">
      <header className="feed_header">
        <h2>Feed</h2>
      </header>

      {/* Toggle between public and following feed */}
      <div className="feed_toggle">
        <button onClick={() => setFeedType('public')}>Public Feed</button>
        <button onClick={() => setFeedType('following')}>Following Feed</button>
      </div>

      {/* Display the journal entries */}
      <div className="feed_entries">
        {journalEntries.map((entry) => (
          <JournalEntry key={entry.id} entry={entry} />
        ))}
        {/* Infinite scroll */}
        <button onClick={loadMoreEntries}>Load More</button>
      </div>

      {/* Notifications */}
      <Notifications />

      {/* User Profile Card */}
      {/* Add your logic here to display the user's profile card */}
      {/* For example, you can fetch the user data and display the follower/following count */}
      {/* You can also implement the follow/unfollow functionality here */}

      {/* User Search */}
      <UserSearch />
    </div>
  );
};

export default Feed;
