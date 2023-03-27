import React from 'react';
// import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import Home from './Home.jsx';
import JournalEntry from './JournalEntry.jsx';

function App() {



  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/journal-entry' element={<JournalEntry />} />

    </Routes>
  )
}
export default App;