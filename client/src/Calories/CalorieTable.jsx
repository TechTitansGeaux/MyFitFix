import React from 'react';
import { useNavigate } from 'react-router-dom'
import CalorieIntake from './CaloriesIn/CalorieIntake.jsx'
import CaloriesBurned from './CaloriesBurned/CaloriesBurned.jsx'

function CalorieTable() {

  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/home')}>Back to Dashboard</button>
      <div className="pt-4 flex justify-around">
        <div>
          <CalorieIntake />
        </div>
        <div>
          <CaloriesBurned />
        </div>
      </div>
    </div>

  )
}

export default CalorieTable;
