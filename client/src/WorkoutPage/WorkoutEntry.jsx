import React, { useState } from "react";


function WorkoutEntry( {exercise, setSet, setRep, changeList} ){



const [toggle, setToggle] = useState(false);


const toggleDetails = () => {
setToggle(!toggle)
}



  // const handleAdd = () => {
  //   setToggleAdd(!toggleAdd)
  // }

  return (
    <div className="exercise-entry">
      <div className="exercise-container">
        <div className="exercise-name">{exercise.name}</div>
        {toggle ?
          <ul className="exercise data">
            <li className="exercise-data">{exercise.type}</li>
            <li className="exercise-data">{exercise.muscle}</li>
            <li className="exercise-data">{exercise.equipment}</li>
            <li className="exercise-data">{exercise.difficulty}</li>
            <li className="exercise-data">{exercise.instructions}</li>
          </ul>
          : <></>
        }
      </div>
      SETS:<input id='foodWeight' type='number' onChange={e => setSet(e.target.value)}></input>
      REPS:<input id='foodProduct' type='number' onChange={e => setRep(e.target.value)}></input>
      <button type="button" class="w-fit border-sky-300 rounded-lg shadow-lg hover:bg-orange-500 active:bg-orange-900 font-bold tracking-wider active:text-white transform hover:scale-110 px-1 ml-4 mr-4"onClick={(e) => changeList(e.target.value)} value={exercise.name}>Save Sets & Reps</button>
      <button class="w-fit border-sky-300 rounded-lg shadow-lg hover:bg-orange-500 active:bg-orange-900 font-bold tracking-wider active:text-white transform hover:scale-110 px-1 ml-4 mr-4"onClick={toggleDetails} > Show Details</button>
    </div>
  )
};

export default WorkoutEntry;