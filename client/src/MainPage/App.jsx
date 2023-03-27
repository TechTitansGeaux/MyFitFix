import React from 'react';
// import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes } from 'react-router-dom';
import Login from './Login.jsx'
import Dashboard from './Dashboard.jsx'
import JournalEntry from './JournalEntry.jsx';



function App() {



  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/journal-entry' element={<JournalEntry />} />
    </Routes>
  )
}
export default App;