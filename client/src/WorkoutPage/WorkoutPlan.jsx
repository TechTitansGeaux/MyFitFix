import React, { useState } from 'react';
import data from "./data.json";
import WorkoutList from './WorkoutList';
import SearchWorkout from './SearchWorkout.jsx';
import axios from "axios";



function WorkoutPlanner() {

const [exercises, setExercises] = useState([]);
const [muscle, setMuscle] = useState('');
const [exerciseResults, setExerciseResults] = useState([]);

const getAllExercises = () => {
axios.get('/workout/workout')
  .then(({data}) => {
//console.log("able to get exercises from db:", data);
   setExercises(data);
  })
  .catch((err) => {
   // console.error('failed to get exercises from db:', err)
  })
}


  const handleSearch = (e) => {
 axios.get('/workout/exercise', { params: {muscle: `${muscle}`} })
  .then((response) => {
  // console.log('line19', response.data);
   setExerciseResults(response.data)
  })
  .then(getAllExercises())
  .catch((error) => {
  // console.error('cannot get:', error);
  });
}


    return (
  <div>
    <h1 align='center'>Plan Your Workout</h1>
    <h2 align='right'> Today's Workout</h2>
    <div align='right'className='workout'>
     <WorkoutList exercises={exercises} getAllExercises={getAllExercises}/>
     </div>
    <h3 align='left'>Search for Exercises</h3>
    <div className="search-input">
    <form>
      <input type="text" placeholder="biceps" onChange={e => {setMuscle(e.target.value)}}/>
      <button type="button" onClick={(e) => handleSearch(e)}>Search</button>
    </form>
  </div>
    <div className='workoutSearch'>
       <SearchWorkout exerciseResults={exerciseResults}/>
    </div>
    </div>
  )
}

export default WorkoutPlanner;