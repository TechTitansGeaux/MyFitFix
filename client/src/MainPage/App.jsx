import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import Home from './Home.jsx';
import JournalEntry from '../Feed/JournalEntry.jsx';
import CalorieTable from '../Calories/CalorieTable.jsx';
import WorkoutPlanner from '../WorkoutPage/WorkoutPlan.jsx';
import Messages from '../MessagesPage/Messages.jsx';
import Quotes from '../QuotesPage/Quotes.jsx';



function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/journal-entry' element={<JournalEntry />} />
      <Route path='/workout-planner' element={<WorkoutPlanner />} />
      <Route path='/tracker' element={<CalorieTable />} />
      <Route path='/messages' element={<Messages />} />
      <Route path='/quotes' element={<Quotes />} />
    </Routes>
  );
}
export default App;