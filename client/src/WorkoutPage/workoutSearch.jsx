import React, {useState} from "react";
import axios from 'axios';



const WorkoutSearch = () => {


const [searchData, setSearchData] = useState(null);

 const search = (muscle) => {
 useEffect(() => {
   const options = {
     method: 'GET',
     url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
    params: { muscle: `${muscle}`},
    headers: {
      'X-RapidAPI-Key': '6a0b1c8aa1msh39014e152c65916p14ced2jsn51e6c32bd8f2',
     'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
   }
   }
  axios.request(options)
  .then((response) => {
   // console.log(response.data);
      setSearchData(response.data);
  }).catch((error) => {
   // console.error('cannot get:', error);

  });
});
 }

// const handleInputChange = (e, key) => {
//   setSearchData({
//     [key]: e.target.value
//   })
// }
{/* <input type="text" placeholder="Muscle" onChange={(e) => {handleInputChange(e, 'muscle')}} />
      <input type="text" placeholder="Difficulty" onChange={(e) => {handleInputChange(e, 'difficulty')}} /> */}



return (
  <div className="search-form">
    <div className="search-input">
      <input type="text" placeholder="Exercise" onChange={(e) => {handleInputChange(e, 'name')}} />
      <input type="submit" onClick={search} />
    </div>
  </div>

)
}
export default WorkoutSearch;