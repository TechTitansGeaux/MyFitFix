import React from 'react';

function WorkoutPlanner() {

  const workoutState = [];

  // const workouts, setWorkouts = useState(workoutState);




  return (
    <div>
      <h1 align='center'>Plan Your Workout</h1>
      <h2 align='left'>Search for Exercises</h2>

      <h3 align='right'> Add Exercises To Your Workout</h3>
      <div className='workout'>
        <WorkoutList> </WorkoutList>
      </div>
    </div>
  )
}

export default WorkoutPlanner;