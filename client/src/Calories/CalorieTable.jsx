import React from 'react';
import { useNavigate } from 'react-router-dom'
import CalorieIntake from './CaloriesIn/CalorieIntake.jsx'
import CaloriesBurned from './CaloriesBurned/CaloriesBurned.jsx'

function CalorieTable() {

  const navigate = useNavigate();

  return (
    // <div>
    //   <h1>Calorie Tracker</h1>
    //   <button onClick={() => navigate('/home')}>Back to Dashboard</button>
    //   <div className="pt-4 flex justify start">
    //     <CalorieIntake />
    //   </div>
    //   <h1>Calories Burned</h1>
    //   <div className="pt-4 flex justify-end">
    //     <CaloriesBurned />
    //   </div>
    // </div>
<div>
  <button onClick={() => navigate('/home')}>Back to Dashboard</button>

    <div className="pt-4 flex justify-around">

      <div>
        <h1 className="">Calorie Tracker</h1>
        <CalorieIntake />
      </div>

      <div>
      <h1>Calories Burned</h1>
        <CaloriesBurned />
      </div>
    </div>
  </div>


  )
}

export default CalorieTable;
