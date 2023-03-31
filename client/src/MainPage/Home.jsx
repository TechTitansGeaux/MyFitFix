import React from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 class="mb-6 text-5xl font-bold">Welcome to the Dashboard</h1>
      <div className="journal-button">
        <button id="addJournal" onClick={() => navigate('/journal-entry')}>Add Journal Entry</button>
        <button id="calorieTracker" onClick={() => navigate('/tracker')}>Track Your Calories</button>
        <button id="workoutPlanner" onClick={() => navigate('/workout-planner')}>Plan Your Workout</button>
      </div>

    </div>


  )
}

export default Home;
