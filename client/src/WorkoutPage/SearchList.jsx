import React from "react";
import SearchEntry from "./SearchEntry";



function SearchList( { exerciseResults }){

// const [workout, setWorkout] = useState(0);
// const prevRef = useRef();

// useEffect(() => {

// })
// {  exerciseData.map((search, index) => {
// })}

//console.log(props);

return(
  <div className="search-list">
     {  exerciseResults.map((workout, index) => {
  return<SearchEntry workout={workout} key={index} />
 })}
</div>
)
}

export default SearchList;