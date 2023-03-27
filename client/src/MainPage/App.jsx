import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import Home from './Home.jsx';
import JournalEntry from './JournalEntry.jsx';
<<<<<<< HEAD
import CalorieTable from './CalorieTable.jsx'
=======
import CalorieTable from './CalorieTable.jsx';
>>>>>>> d6f47567638a7b6bcce712b1eb870d0afd770e49

function App() {



  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/journal-entry' element={<JournalEntry />} />
      <Route path='/tracker' element={<CalorieTable />} />
<<<<<<< HEAD
=======

>>>>>>> d6f47567638a7b6bcce712b1eb870d0afd770e49
    </Routes>
  )
}
export default App;