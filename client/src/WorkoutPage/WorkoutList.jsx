import React, {useState} from "react";
import WorkoutEntry from "./WorkoutEntry";



function WorkoutList({ exercises }){

  // const [toggleAdd, setToggleAdd] = useState(true);

  // const handleAdd = () => {
  //   setToggleAdd(!toggleAdd)
  // }

return(
  <div className="exercise-dropdown">
  <select>
  Choose an Exercise
{  exercises.map((exercise, index) => {
  return <option exercise={exercise} key={index}>{exercise.name}</option>
})}
</select>
<button type="button" onClick={(e) => handleAdd(e)}>Add Exercise to Workout</button>
  <div className="exercise-entry">
{  exercises.map((exercise, index) => {
  return <WorkoutEntry exercise={exercise} key={index} >{exercise.name} </WorkoutEntry>
})}
    </div>
</div>
)
}

export default WorkoutList;