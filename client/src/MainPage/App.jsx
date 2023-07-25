import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import Home from './Home.jsx';
// import Goals from './Goals.jsx';
import JournalEntry from './JournalEntry.jsx';
import CalorieTable from '../Calories/CalorieTable.jsx';
import WorkoutPlanner from '../WorkoutPage/WorkoutPlan.jsx';


function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      {/* <Route path='/' element={<Goals />} /> */}
      <Route path='/home' element={<Home />} />
      <Route path='/journal-entry' element={<JournalEntry />} />
      <Route path='/workout-planner' element={<WorkoutPlanner />} />
      <Route path='/tracker' element={<CalorieTable />} />
    </Routes>
  )
}
export default App;