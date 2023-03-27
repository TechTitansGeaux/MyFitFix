import React, { useState } from 'react';
import data from "./data.json";
import WorkoutList from './WorkoutList';
import WorkoutSearch from './workoutSearch';


function WorkoutPlanner () {

const [ exercises, setExercises] = useState(data);



    return (
  <div>
    <h1 align='center'>Plan Your Workout</h1>
    <h2 align='left'>Search for Exercises</h2>
    <h3 align='right'> Add Exercises To Your Workout</h3>
    <div className='workoutSearch'>
      <WorkoutSearch />
    </div>
    <div className='workout'>
     <WorkoutList exercises={exercises}/>
     </div>
</div>
    )
}

export default WorkoutPlanner;