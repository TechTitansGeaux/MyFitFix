import React, { useState } from "react";


function WorkoutEntry( {exercise} ){

const sets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const reps = []
for(let i = 1; i < 31; i++){
  reps.push(i);
};

const [toggle, setToggle] = useState(false);

const toggleDetails = () => {
setToggle(!toggle)
}

  return (
    <div className="exercise-entry">
    <select>
      <option> 0 </option>
    {sets.map((set, index) => {
      return <option set={set} key={index}>{set}</option>
    })}
    </select>
    <select>
      <option> 0 </option>
    {reps.map((rep, index) => {
      return <option rep={rep} key={index}>{rep}</option>
    })}
    </select>
    <div className="exercise-container">
    <div className="exercise-name">{exercise.name} </div>
    <button onClick={toggleDetails} className="btn btn-primary"> Show Details</button>
      {toggle ?
      <ul className="exercise data">
    <li className="exercise-data">{exercise.type}</li>
    <li className="exercise-data">{exercise.muscle}</li>
    <li className="exercise-data">{exercise.equipment}</li>
    <li className="exercise-data">{exercise.difficulty}</li>
    <li className="exercise-data">{exercise.instructions}</li>
    </ul>
    :
    <></>
      }
    </div>
    </div>
  )
};

export default WorkoutEntry;