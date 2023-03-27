import React from "react";
import workoutEntry from "./WorkoutEntry";



const WorkoutList = ({ exercises}) => {

return(
  <div className="exercise-list">
{  exercises.map((exercise) => {
  return <WorkoutEntry exercise= {exercise} key={exercise._id} />
})}
</div>
)
}

export default WorkoutList;