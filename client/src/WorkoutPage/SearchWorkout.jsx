import React, {useState} from "react";
import axios from 'axios';
import SearchList from "./SearchList";



function SearchWorkout(){

  const [muscle, setMuscle] = useState('');
  const [exerciseData, setExerciseData] = useState([]);

  const handleSearch = (e) => {
 axios.get('/workout/exercise', { params: {muscle: `${muscle}`} })
  .then((response) => {
   console.log(response.data);
   setExerciseData(response.data[0]);
  }).catch((error) => {
   console.error('cannot get:', error);
  });
}


return (
  <div className="search-input">
    <form>
      <input type="text" placeholder="Bicep" onChange={e => {setMuscle(e.target.value)}}/>
      <button type="button" onClick={(e) => handleSearch(e)}>Search</button>
    </form>
  <SearchList exerciseData={exerciseData}>{exerciseData}</SearchList>
  </div>
)
}
export default SearchWorkout;