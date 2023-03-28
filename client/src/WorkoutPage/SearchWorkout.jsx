import React, {useState} from "react";
import axios from 'axios';
import SearchList from "./SearchList";



function SearchWorkout(){

  const [muscle, setMuscle] = useState('');
  const [exerciseData, setExerciseData] = useState([]);
  //const [workout, setWorkout] = ([])

  const handleSearch = (e) => {
 axios.get('/workout/exercise', { params: {muscle: `${muscle}`} })
  .then((response) => {
  // console.log(response.data);
   setExerciseData(response.data[0]);
  }).catch((error) => {
   //console.error('cannot get:', error);
  });
}

// const handleNext = (e) => {
//  exerciseData.filter((el, index) => {
//       sete(el[index] + 1);
//  })
// }

// const handlePrevious = (e) => {
//   exerciseData.filter((el, index) => {
//     if(index >= 0){
//     setWorkout(el[index] - 1);
//     }
// })

// }

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
    <button type="button" onClick={(e) => handleNext(e)}>Next</button>
    <button type="button" onClick={(e) => handlePrevious(e)}>Previous</button>
    <button type="button" onClick={(e) => handleSave(e)}>Save Exercise</button>
  <SearchList exerciseData={exerciseData}>{exerciseData}</SearchList>
  </div>
)
}
export default SearchWorkout;