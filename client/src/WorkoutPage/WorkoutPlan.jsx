import React, { useState, useEffect } from 'react';
import WorkoutList from './WorkoutList';
import axios from "axios";
import moment from 'moment';
import SearchEntry from './SearchEntry.jsx';
import PastWorkoutEntry from './PastWorkoutEntry';
import '../style.css';



function WorkoutPlan() {

const [workout, setWorkout] = useState([]);
const [muscle, setMuscle] = useState('');
const [exerciseResults, setExerciseResults] = useState([]);
const [pastDate, setPastDate] = useState(moment().format("YYYY-MM-DD"))
const [pastWorkout, setPastWorkout] = useState([]);

// const findPastDate = (newDate) => {
//   setPastDate(newDate);
// }

const handleSearch = (e) => {
  axios.get('/workout/exercise', { params: {muscle: `${muscle}`} })
    .then((response) => {
      setExerciseResults(response.data)
    })
    .catch((err) => {
     console.error('cannot get:', err);
    });
}


const getPastWorkout = () => {
axios.get(`workout/workouts/${pastDate}`)
.then((response) => {
  setPastWorkout(response.data[0].exercise);
})
.catch((err) => {
  console.error('unable to get past workout:', err);
})
}

const deletePastWorkout = () => {
  axios.delete(`/workout/workouts/${pastDate}`)
    .then((data) => {
      console.log('able to delete past-workout:', data)})
    .then(setPastWorkout([]))
    .catch((err) => {
      console.error('could not delete past workout', err);
    });
};


const handleWorkoutState = (name) => [
  exerciseResults.forEach(exercise => {
    if (exercise.name === name) {
      setWorkout(workout => [...workout, exercise])
    }
  })
]

//  <h2 align='left'>Search for Exercises</h2>
//       <div className="search-input">
//         <form>
//           <input type="text" placeholder="biceps" onChange={e => {setMuscle(e.target.value)}}/>
//           <button type="button" onClick={(e) => handleSearch(e)}>Search</button>
//         </form>
//       </div>
//       <div className='exerciseSearch'>
//         {exerciseResults.map(exercise => <SearchEntry exercise={exercise} key={exercise.name} handleWorkoutState={handleWorkoutState} />)}
//       </div> 

// line 97 thru 100
{/* <h3 align='center'> Today's Workout</h3>
<div align='center'className='workout'>
   <WorkoutList workout={workout} setWorkout={setWorkout}/>
</div> */}


  return (
<div>
  <h1 align='center'>Plan Your Workout</h1>
        <div align='center'className='workout'>
            <WorkoutList workout={workout} setWorkout={setWorkout}/>
        </div>
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
       <div class="px-6 py-4">
        <h2 class="font-bold text-xl mb-2" align='left'>Search for Exercises</h2>
          <div className="search-input">
            <form>
                <input type="text" placeholder="biceps" onChange={e => {setMuscle(e.target.value)}}/>
                  <button type="button" onClick={(e) => handleSearch(e)}>Search</button>
            </form>
           </div>
        </div>
    </div>
      <div className='exerciseSearch'>
       {exerciseResults.map(exercise => <SearchEntry exercise={exercise} key={exercise.name} handleWorkoutState={handleWorkoutState} />)}
     </div>

    <h4 align='right'> Search Workout by Date </h4>
      <div align= 'right' className='search-past-workouts'>
        <input
              type="date"
              id="past-workout-date"
              name="past-workout-date"
              value={pastDate}
              onChange={(e) => {
                  setPastDate(e.target.value);
              }}
         ></input>
      <button type="button" onClick={() => getPastWorkout()} >Search For Workout</button>
      <button type="button" onClick={() => deletePastWorkout()} >Delete Workout</button>
        { pastWorkout.map(workout => <PastWorkoutEntry workout={workout} key={workout.name} />)}
    </div>
</div>
  )
}

export default WorkoutPlan;


