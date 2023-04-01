import React, {useState} from "react";
import axios from 'axios';


function SearchEntry( { exercise, handleWorkoutState } ){

  const [toggle, setToggle] = useState(true);
  const [toggleDetail, setToggleDetail] = useState(false);

  const toggleSave = () => {
  setToggle(!toggle)
  }

  const handleCheck = () => {
    alert('exercise is saved to workout');
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

<div class=" max-w-sm rounded overflow-hidden shadow-xl ml-60 mt-4 bg-gradient-to-bl from-sky-600 from-10%  via-sky-400 to-sky-50 to-40% ...">
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

<div className='flex justify-around'>
   <button onClick={(e) => {
    handleWorkoutState(e.target.value)
    toggleSave()
    handleCheck()
  }} value={exercise.name} className='w-full border border-sky-300 rounded-lg shadow-lg hover:bg-orange-500 active:bg-orange-900 text-sm font-bold active:text-white transform hover:scale-110 px-1 ml-2 mr-2'>Add Exercise to Workout</button>

   <button className='w-full border border-sky-300 rounded-lg shadow-lg hover:bg-orange-500 active:bg-orange-900 text-sm font-bold active:text-white transform hover:scale-110 px-1 mr-2 ml-2' onClick={toggleDetails} exercise={exercise}>Show/Hide Details</button>

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


