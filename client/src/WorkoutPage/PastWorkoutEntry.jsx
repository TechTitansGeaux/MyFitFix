import React, { useState } from "react";


function PastWorkoutEntry( {pastWorkout} ){



const [toggleEntry, setToggleEntry] = useState(false);


const toggleEntrys = () => {
setToggleEntry(!toggleEntry)
}



return (
  <div className="past-workout-entry">
  <div className="past-workout-container">
  <div className="past-workout-name">{pastWorkout.name} </div>
    {toggleEntry ?
    <ul className="past-workout-data">
  <li className="past-workout-data">{pastWorkout.type}</li>
  <li className="past-workout-data">{pastWorkout.muscle}</li>
  <li className="past-workout-data">{pastWorkout.equipment}</li>
  <li className="past-workout-data">{pastWorkout.difficulty}</li>
  <li className="past-workout-data">{pastWorkout.instructions}</li>
  </ul>
  :
  <></>
    }
  </div>
  <button onClick={toggleEntrys} className="btn btn-primary"> Show Details</button>
  </div>
)
};

export default PastWorkoutEntry