import React from "react";

const WorkoutEntry = ( {exercise} ) => {


  return (
    <div className="execise-entry">
    <div className="exercise-data">{exercise.name}</div>
    <div className="exercise-data">{exercise.type}</div>
    <div className="exercise-data">{exercise.type}</div>
    <div className="exercise-data">{exercise.instructions}</div>
    </div>
  )
};

export default WorkoutEntry;