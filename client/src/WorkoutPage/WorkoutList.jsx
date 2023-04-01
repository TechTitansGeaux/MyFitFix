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
{/* <div className="exercise-dropdown">
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
  </div> */}






return(
<div class="max-w-sm rounded overflow-hidden shadow-lg bg-gradient-to-bl from-sky-600 from-10%  via-sky-400 to-sky-50 to-40% ...">
  
  <div class="max-w-sm w-full lg:max-w-full lg:flex">
    <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400" >
      <h3> Today's Workout</h3>
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



    <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
      <div class="mb-8">
        <div class="flex items-center" className='workout'>
            <div className="exercise-entry">
            { workout.map((exercise, index) => {
            return <WorkoutEntry exercise={exercise} key={index} setRep={setRep} setSet={setSet} changeList={changeList}/>
            })}
            </div>
        </div>
          <div class="flex items-center">
            <div class="text-sm">
            <p class="text-gray-900 leading-none">Jonathan Reinink</p>
            <p class="text-gray-600">Aug 18</p>
            </div>
          </div>
      </div>
  </div>
</div>
</div>

  )
}

export default WorkoutList;

{/* <div class="max-w-sm w-full lg:max-w-full lg:flex">
<div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" >
      <h3> Today's Workout</h3>
</div>
<div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
<div class="mb-8">
    <div class="flex items-center" className='workout'>
    </div>
  <div class="flex items-center">
     <div class="text-sm">
         <p class="text-gray-900 leading-none">Jonathan Reinink</p>
        <p class="text-gray-600">Aug 18</p>
     </div>
   </div>
  </div>
</div>
</div> */}