import React, { useState } from 'react';
import axios from 'axios';

function CaloriesBurned() {

  //Set state with React hooks
  const [weight, setWeight] = useState(0);
  const [time, setTime] = useState(0);
  const [burned, setBurned] = useState(0);
  const [date, setDate] = useState('');

  //function handles date change
  // const handleDateChange = (event) => {
  //   setDate(event.target.value);
  // }

  //function to clear in put fields on button click
  const clearFields = () => {
    document.getElementById("input1").value = '';
    document.getElementById("input2").value = '';
  }

  //Axios requests to the server.
  const requestHandler = () => {
    axios.get('/cb/caloriesBurned', {
      params: {activity: 'lifting', weight: `${weight}`, duration: `${time}`}
    })
      .then((response) => {
        console.log('Successful GET', response.data);

        axios.post('/cb/caloriesBurned', {date: date, activity: 'lifting', weight: `${weight}`, duration: `${time}`, burned: setBurned(response.data.total_calories)})
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.error('Failed to POST cb', err);
          })
      })

      .catch((err) => {
        console.log('Unsuccessful GET', err);
      })


  }

  return (
    <div>
      <h3>Workout</h3>
      <form>
        <input
          type="date"
          id="cb-date"
          name="cb-date"
          min="2020-01-01"
          max="2050-01-01"
          onChange={ event => setDate(event.target.value)}>
        </input>

        Current Weight (lbs):
        <input type="number" id="input1" onChange={ event => setWeight(event.target.value) }></input>
        Total Time (minutes):
        <input type="number" id="input2" onChange={ event => setTime(event.target.value) }></input>
        <button type="button" onClick={ (event) => requestHandler(event, clearFields()) }>Burn!</button>
      </form>
      <div className="txt-table">
       {/* <h3>Workout</h3> */}
       <div className="txt-data">Date: {date}</div>
        <div className="txt-data">Current Weight: {weight}</div>
        <div className="txt-data">Total Time: {time}</div>
        <div className="txt-data">Calories Burned: {burned}</div>
      </div>
    </div>
  )
}

export default CaloriesBurned;