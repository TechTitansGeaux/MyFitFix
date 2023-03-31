import React, {useState} from "react";
import axios from 'axios';


function SearchEntry( { exercise, handleWorkoutState } ){

  const [toggle, setToggle] = useState(true);
  const [checked, setChecked] = useState(false);
  const [toggleDetail, setToggleDetail] = useState(false);

  const toggleSave = () => {
  setToggle(!toggle)
  }

  const handleCheck = () => {
    setChecked(!checked)
  }

  const toggleDetails = () => {
    setToggleDetail(!toggleDetail)
    }

// const handleSave = () => {
// axios.post('workout/exercise', {
//   name: exercise.name,
//   type: exercise.type,
//   muscle: exercise.equipment,
//   difficulty: exercise.difficulty,
//   instructions: exercise.instructions,
//   sets: 0,
//   reps: 0
// })
//  .then((data) => {
//   //console.log("posted workout to db:", data)
//       })
//   .then(toggleSave())
//   .then(handleCheck())
//   .catch((err) => {
//        // console.error('failed to post workout to db:', err);
//       });
// }



  return (
<div class="max-w-sm rounded overflow-hidden shadow-lg">
  <div className="search-data">
    <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2"className="result-data">{exercise.name}</div>
        <div class="font-bold text-xl mb-2"className="result-data"> Muscle - {exercise.muscle}</div>
    </div>
        { toggleDetail ?
    <div className="result-entry">
    { toggle ?
    <ul className="result-data-list">
    <li className="result-data">{exercise.type}</li>
    <li className="result-data">{exercise.equipment}</li>
    <li className="result-data">{exercise.difficulty}</li>
    <li className="result-data">{exercise.instructions}</li>
    </ul>
    :
    <></>
}
</div>
:
<></>
}
<div class="px-6 pt-4 pb-2">
   <button onClick={(e) => {
    handleWorkoutState(e.target.value)
    toggleSave()
    handleCheck()
  }} value={exercise.name} className="btn btn-primary">Add Exercise to Workout</button>
   <button onClick={toggleDetails} exercise={exercise} className="btn btn-primary">Show/Hide Details</button>
   <p>
      {checked ? 'Added to Workout' : ''}
    </p>
    </div>
    <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{exercise.equipment}</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{exercise.difficulty}</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{exercise.type}</span>
    </div>
  </div>
</div>
  )
};

export default SearchEntry;


