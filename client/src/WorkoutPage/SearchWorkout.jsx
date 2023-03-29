import React, {useState} from "react";
import axios from 'axios';
import SearchList from "./SearchList";



function SearchWorkout( {exerciseResults} ){


// const handleNext = () => {
//   counter++;
//   setWorkout(exerciseResults[counter]);
//   console.log(workout, counter);
// }

// const handlePrevious = () => {
//   counter--;
//   setWorkout(exerciseResults[counter]);
//   console.log(workout, counter);
// }
{/* <button type="button" onClick={() => handleNext()}>Next</button>
    <button type="button" onClick={() => handlePrevious()}>Previous</button> */}

// const handleSave = (e) => {
//     axios.post('/workout/exercise', {
//     exercise:{
//     }
//     })
//      .then((response) => {
//      // console.log(response.data);
//       setExerciseData(response.data);
//      }).catch((error) => {
//      // console.error('cannot get:', error);
//      });
//    }
// }


return (

  <div className="search-list">
  <SearchList exerciseResults={exerciseResults} />
  </div>
)
}
export default SearchWorkout;