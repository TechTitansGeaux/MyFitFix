import React, {useState} from "react";
import WorkoutEntry from "./WorkoutEntry";
import axios from 'axios';




function WorkoutList({ exercises }){

  const [exerciseEntry, setExerciseEntry] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);

// const handleChange = (e) => {
// setExerciseEntry(e.value);
// }





//this is a function designed to render one exercise to the todays workout section, still working on it
const handleAdd = () => {
  axios.get(`/workout/workout/${exerciseEntry}`)
  .then(({data}) => {
   // console.log("able to get exercise from db:", data);
    setWorkoutData(data);
  })
  //.then(handleAdd())
  .catch((err) => {
   // console.error('failed to post a workout entry to the db:', err)
  })
}


const handleEntrySave = () => {
  axios.post('workout/workouts', {workoutData})
.then((data) =>{
  console.log('posted workouts:', data);
})
.catch((err) => {
  console.error('failed to post workouts', err);
})

}

return(
  <div className="exercise-dropdown">
  <select>
  <option>-Choose an Exercise-</option>
  { exercises.map((exercise, index) => {
  return <option onChange={(e) => {handleChange(e)}} value={exercise.name} exercise={exercise} key={index}>{exercise.name}</option>
})}
</select>
  <div className="exercise-entry">
{  workoutData.map((exercise, index) => {
  return <WorkoutEntry exercise={exercise} key={index} >{exercise.name} </WorkoutEntry>
})}
    </div>
    <button type="button" onChange={handleAdd()} onClick={handleEntrySave}>Save Today's Workout</button>
</div>
)
}

export default WorkoutList;