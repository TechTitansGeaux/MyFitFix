import React, {useState} from "react";
import axios from 'axios';
import SearchList from "./SearchList";



function SearchWorkout(){

  const [muscle, setMuscle] = useState('');
  //const [workout, setWorkout] = useState({})
  const [exerciseResults, setExerciseResults] = useState([]);
  //let counter = 0;
  // let workout = {};

  const handleSearch = (e) => {
 axios.get('/workout/exercise', { params: {muscle: `${muscle}`} })
  .then((response) => {
   console.log('line19', response.data);
   setExerciseResults(response.data);
  //set workout takes in the 0 index of the results data and has a counter property which we then can use to increments index
   //setWorkout(exerciseResults);
   //console.log(workout);
  }).catch((error) => {
   console.error('cannot get:', error);
  });
}

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
  <div className="search-input">
    <form>
      <input type="text" placeholder="Bicep" onChange={e => {setMuscle(e.target.value)}}/>
      <button type="button" onClick={(e) => handleSearch(e)}>Search</button>
    </form>
  <SearchList exerciseResults={exerciseResults} />
  </div>
)
}
export default SearchWorkout;