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
  <SearchEntry exerciseData={exerciseData}/>
</div>
)
}

export default SearchList;