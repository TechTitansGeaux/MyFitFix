import React, {useState} from "react";
import axios from 'axios';


function SearchEntry( {workout} ){

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

const handleSave = () => {
axios.post('workout/exercise', {
  name: workout.name,
  type: workout.type,
  muscle: workout.equipment,
  difficulty: workout.difficulty,
  instructions: workout.instructions,
  sets: 0,
  reps: 0
})
 .then((data) => {
  //console.log("posted workout to db:", data)
      })
  .then(toggleSave())
  .then(handleCheck())
  .catch((err) => {
       // console.error('failed to post workout to db:', err);
      });
}



  return (
    <div className="search-data">
    <div className="result-data">{workout.name}</div>
    { toggleDetail ?
    <div className="result-entry">
    { toggle ?
    <ul className="result-data-list">
    <li className="result-data">{workout.type}</li>
    <li className="result-data">{workout.muscle}</li>
    <li className="result-data">{workout.equipment}</li>
    <li className="result-data">{workout.difficulty}</li>
    <li className="result-data">{workout.instructions}</li>
    </ul>
    :
    <></>
}
</div>
:
<></>
}
   <button onClick={handleSave} workout={workout} className="btn btn-primary">Add Exercise to Workout</button>
   <button onClick={toggleDetails} workout={workout} className="btn btn-primary">Show/Hide Details</button>

   <p>
      {checked ? 'Saved' : ''}
    </p>
    </div>
  )
};

export default SearchEntry;