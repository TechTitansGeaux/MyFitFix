import React, { useState } from 'react';
import axios from 'axios';

function CaloriesBurned() {
  const [weight, setWeight] = useState(0);
  const [time, setTime] = useState(0);
  const [burned, setBurned] = useState(0);


  const requestHandler = () => {
    axios.get ('/cb/caloriesBurned', {
      params: {weight: `${weight}`, duration: `${time}`}
    })
      .then((data) => {
        console.log('Successful GET', data);
      })
      .catch((err) => {
        console.log('Unsuccessful GET', err);
      })
  }



  return (
    <div>
      <h3>Calories Burned</h3>
      <form>
        Weight (lbs):
        <input type="number" onChange={ event => setWeight(event.target.value) }></input>
        Duration (minutes):
        <input type="number" onChange={ event => setTime(event.target.value) }></input>
        <button type="button" onClick={ (event) => requestHandler(event) }>Submit</button>
      </form>
      <div className="txt-table">
        <div className="txt-data"></div>
        <div className="txt-data"></div>
        <div className="txt-data"></div>
      </div>
    </div>
  )
}

export default CaloriesBurned;