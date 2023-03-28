import React, {useState} from "react";
import SearchEntry from "./SearchEntry";



function SearchList({ exerciseData }){

// const [workout, setWorkout] = useState(0);
// const prevRef = useRef();

// useEffect(() => {

// })
// {  exerciseData.map((search, index) => {
// })}
return(
  <div className="search-list">
    <button type="button" onClick={(e) => handleNext(e)}>Next</button>
    <button type="button" onClick={(e) => handlePrevious(e)}>Previous</button>
    <button type="button" onClick={(e) => handleSave(e)}>Save Exercise</button>
  <SearchEntry exerciseData={exerciseData}/>
</div>
)
}

export default SearchList;