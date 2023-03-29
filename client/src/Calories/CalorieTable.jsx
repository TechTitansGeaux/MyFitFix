import React from 'react';
import { useNavigate } from 'react-router-dom'
import CalorieIntake from './CaloriesIn/CalorieIntake.jsx'
import CaloriesBurned from './CaloriesBurned.jsx'

function CalorieTable() {

  const navigate = useNavigate();

  return (
    <div>
      <h1>Calorie Tracker</h1>
      <button onClick={() => navigate('/home')}>Back to Dashboard</button>
      <div>
        <CalorieIntake />
      </div>
      <h1>Calories Burned</h1>
      <div>
        <CaloriesBurned />
      </div>
    </div>
  )
}

export default CalorieTable;
