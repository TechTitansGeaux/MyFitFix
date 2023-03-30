import React, { useState, useEffect } from 'react';
import WorkoutList from './WorkoutList';
import axios from "axios";
import moment from 'moment';
import SearchEntry from './SearchEntry.jsx';



function WorkoutPlan() {

const [workout, setWorkout] = useState([]);
const [muscle, setMuscle] = useState('');
const [exerciseResults, setExerciseResults] = useState([]);
const [finished, setFinished] = useState(false);
const [pastDate, setPastDate] = useState(moment().format("YYYY-MM-DD"))


const findPastDate = (newDate) => {
  setPastDate(newDate);
}



// const getAllExercises = () => {
// axios.get('/workout/workout')
//   .then(({data}) => {
//     setWorkout(data);
//   })
//   .catch((err) => {
//    console.error('failed to get exercises from db:', err)
//   })
// }

const handleSearch = (e) => {
  axios.get('/workout/exercise', { params: {muscle: `${muscle}`} })
    .then((response) => {
      setExerciseResults(response.data)
    })
    .catch((err) => {
     // console.error('cannot get:', err);
    });
}

const handleWorkoutState = (name) => [
  exerciseResults.forEach(exercise => {
    if (exercise.name === name) {
      setWorkout(workout => [...workout, exercise])
    }
  })
]

// useEffect(() => {
  
// }, [workout])


//<button type="button" onClick={getPastWorkouts}>Search For Previous Workout</button>


    return (
  <div>
    <h1 align='center'>Plan Your Workout</h1>
    <h2 align='right'> Today's Workout</h2>
    <div align='right'className='workout'>
     <WorkoutList workout={workout} />
     </div>
     <h3 align='right'> Search Past Workouts by Date </h3>
    <div align= 'right' className='search-past-workouts'>
    <input
          type="date"
          id="past-workout-date"
          name="past-workout-date"
          value={pastDate}
          onChange={(e) => {
            findPastDate(e.target.value);
          }}
        ></input>
        </div>
    <h4 align='left'>Search for Exercises</h4>
    <div className="search-input">
    <form>
      <input type="text" placeholder="biceps" onChange={e => {setMuscle(e.target.value)}}/>
      <button type="button" onClick={(e) => handleSearch(e)}>Search</button>
    </form>
  </div>
    <div className='exerciseSearch'>
       {exerciseResults.map(exercise => <SearchEntry exercise={exercise} key={exercise.name} handleWorkoutState={handleWorkoutState} />)}
    </div>
    </div>
  )
}

export default WorkoutPlan;