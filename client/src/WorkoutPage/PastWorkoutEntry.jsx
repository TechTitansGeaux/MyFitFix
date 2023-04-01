import React from "react";


function PastWorkoutEntry( { workout } ){




  return (
 <div className="past-workout-entry">
      <div className="past-workout-container">
        <div className="past-workout-name">{workout.name}</div>
        <div className="past-workout-set">{workout.set}</div>
        <div className="past-workout-reps">{workout.rep}</div>
      </div>
    </div>

  )
};

export default PastWorkoutEntry

