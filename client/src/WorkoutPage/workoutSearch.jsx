import React from "react";
import axios from 'axios';



const workoutSearch = () => {

const search = () => {
  const options = {
    method: 'GET',
    url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
    params: {muscle: 'biceps'},
    headers: {
      'X-RapidAPI-Key': '6a0b1c8aa1msh39014e152c65916p14ced2jsn51e6c32bd8f2',
      'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
    }
  }
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

}

return (
  <div className="search container">
    <input type="text" onChange={} />
    <input type="submit" onClick={} />
  </div>

)
}