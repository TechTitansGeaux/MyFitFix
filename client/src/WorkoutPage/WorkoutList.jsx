import React from "react";
import WorkoutEntry from "./WorkoutEntry";



function WorkoutList({ exercises }){


return(
  <div className="exercise-list">
  <select>
  Choose an Exercise
{  exercises.map((exercise, index) => {
  return <option exercise={exercise} key={index}>{exercise.name}</option>
})}
</select>
<button type="button" onClick={(e) => handleSearch(e)}>Add Exercise to Workout</button>
{  exercises.map((exercise, index) => {
  return <WorkoutEntry exercise={exercise} key={index}>{exercise.name}</WorkoutEntry>
})}
</div>
)
}

export default WorkoutList;