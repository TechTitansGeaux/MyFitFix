import React, { useState } from 'react';
import data from "./data.json";
import WorkoutList from './WorkoutList';
import SearchWorkout from './SearchWorkout.jsx';






function WorkoutPlanner() {

const [ exercises, setExercises] = useState(data);

const getAllExercises = () => {
axios.get('/workout/exercises')
  .then(({data}) => {
console.log("able to get exercises from db:", data);
   setExercises(data);
  })
  .catch((err) => {
    console.error('failed to get exercises from db:', err)
  })
}

    return (
  <div>
    <h1 align='center'>Plan Your Workout</h1>
    <h2 align='left'>Search for Exercises</h2>
    <h3 align='right'> Add Exercises To Your Workout</h3>
    <div className='workoutSearch'>
       <SearchWorkout />
    </div>
    <div className='workout'>
     <WorkoutList exercises={exercises}/>
     </div>
    </div>
  )
}

export default WorkoutPlanner;