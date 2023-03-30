import React, {useState} from "react";
import axios from 'axios';


function SearchEntry( { exercise, handleWorkoutState } ){

  const [toggle, setToggle] = useState(true);
  const [checked, setChecked] = useState(false);
  const [toggleDetail, setToggleDetail] = useState(true);

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
    <div className="search-data">
    <div className="result-data">{exercise.name}</div>
    { toggleDetail ?
    <div className="result-entry">
    { toggle ?
    <ul className="result-data-list">
    <li className="result-data">{exercise.type}</li>
    <li className="result-data">{exercise.muscle}</li>
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
   <button onClick={(e) => handleWorkoutState(e.target.value)} value={exercise.name} className="btn btn-primary">Add Exercise to Workout</button>
   <button onClick={toggleDetails} exercise={exercise} className="btn btn-primary">Show/Hide Details</button>

   <p>
      {checked ? 'Saved' : ''}
    </p>
    </div>
  )
};

export default SearchEntry;