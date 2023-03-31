import React from 'react';
import { useNavigate } from 'react-router-dom';



function Home() {
  const navigate = useNavigate();

  return (
    <div className='Home bg-red-300'>
      <h1>Welcome to the Dashboard</h1>

      <div className="content-evenly">
        <button id="addJournal" className="shadow-xl md:p-2 md:bg-gray-300 sm:m-1" onClick={() => navigate('/journal-entry')}>Add Journal Entry</button>
        <button id="calorieTracker" className="shadow-xl md:p-2 md:bg-gray-300 sm:m-1" onClick={() => navigate('/tracker')}>Track Your Calories</button>
        <button id="workoutPlanner" className="shadow-xl md:p-2 md:bg-gray-300 sm:m-1" onClick={() => navigate('/workout-planner')}>Plan Your Workout</button>
      </div>

    </div>


  )
}

export default Home;
