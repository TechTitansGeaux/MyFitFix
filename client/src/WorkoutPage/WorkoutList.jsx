import React, {useState, useEffect} from "react";
import WorkoutEntry from "./WorkoutEntry";
import axios from 'axios';
import moment from 'moment';




function WorkoutList({ workout, setWorkout }){

  const [currDate, setCurrDate] = useState(moment().format("YYYY-MM-DD"));
  const [currWOList, setCurrWOList] = useState([]);
  const [rep, setRep] = useState(0);
  const [set, setSet] = useState(0);

// const handleChange = (e) => {
// setExerciseEntry(e.value);
// }

  const changeList = (name) => {
    workout.forEach(exercise => {
      if (exercise.name === name) {
        setCurrWOList(currWOList => [...currWOList, { name: name, set: set, rep: rep }])
      }
    })
  }



// This is a funciton designed to update the state of reps and sets
// will have One button that make a put request to update the exercise objects before saving the workout entry
// const handleSetsReps = () => {

//   <button type="button" onClick={(e) => {handleSetsReps(e.target.value)}} value={set}>Update Sets</button>
//     <button type="button" onClick={(e) => {handleSetsReps(e.target.value)}} value={rep}>Update Reps</button>

// }

const handleDateChange = (newDate) =>{
setCurrDate(newDate);
}
//console.log(date);



const handleEntrySave = () => {
  axios.post('workout/workouts', {
    workoutArr: currWOList,
    currDate: currDate
  })
  .then(() =>{
    setWorkout([]);
    setCurrWOList([]);
    alert(`You have saved a workout for the date: ${currDate}`)
  })
  .catch((err) => {
    console.error('failed to post workouts', err);
  })
}

return(
  <div className="exercise-dropdown">
    <div className="exercise-entry">
      { workout.map((exercise, index) => {
        return <WorkoutEntry exercise={exercise} key={index} setRep={setRep} setSet={setSet} changeList={changeList}/>
      })}
    </div>
    <button type="button"  onClick={handleEntrySave}>Save Workout</button>
    <input
          type="date"
          id="workout-date"
          name="workout-entry-date"
          value={currDate}
          onChange={(e) => {
            handleDateChange(e.target.value);
          }}
    ></input>
  </div>
  )
}

export default WorkoutList;