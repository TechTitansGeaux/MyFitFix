import React, {useState} from "react";
import SearchEntry from "./SearchEntry";



function SearchList({ exerciseData }){

// const [workout, setWorkout] = useState(0);
// const prevRef = useRef();

// useEffect(() => {

// })


return(
  <div className="search-list">
    <button type="button" onClick={(e) => handleNext(e)}>Next</button>
    <button type="button" onClick={(e) => handlePrevious(e)}>Previous</button>
    <button type="button" onClick={(e) => handleSave(e)}>Save Exercise</button>

{  exerciseData.map((search, index) => {
  return <SearchEntry search={search} key={index} exerciseData={exerciseData}/>
})}
</div>
)
}

export default SearchList;