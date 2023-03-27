import React from "react";
import WorkoutEntry from "./WorkoutEntry";



const WorkoutList = ({ exercises }) => {

return(
  <div className="exercise-list">
{  exercises.map((exercise, index) => {
  return <WorkoutEntry exercise={exercise} key={index} />
})}
</div>
)
}

export default WorkoutList;