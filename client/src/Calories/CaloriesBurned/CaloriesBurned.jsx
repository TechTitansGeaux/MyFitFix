import React, { useState } from 'react';
import axios from 'axios';

function CaloriesBurned() {

  //Set state with React hooks
  const [weight, setWeight] = useState(0);
  const [time, setTime] = useState(0);
  const [burned, setBurned] = useState(0);
  const [date, setDate] = useState('');

  //function to clear in put fields on button click
  const clearFields = () => {
    document.getElementById("input1").value = '';
    document.getElementById("input2").value = '';
    document.getElementById("cb-date").value = '';
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

  // const inputRef1 = React.createRef();
  // const inputRef2 = React.createRef();

 const onClickFunctions = () => {
  requestHandler();
  // setWeight(inputRef1.current.value);
  // setTime(inputRef2.current.value);
  clearFields()
 }

  const findEntry = () => {
    axios.get(`/cb/caloriesBurned/${date}`)
      .then((responseObj) => {
        const {date, currentWeight, duration, caloriesBurned} = responseObj.data[0];
        console.log('Success!', responseObj.data[0]);
        // if(responseObj.data.length > 0) {
          setDate(date);
          setWeight(currentWeight);
          setTime(duration);
          setBurned(caloriesBurned);
        // } 
        // else {
        //   setDate('');
        //   setWeight('');
        //   setTime('');
        //   setBurned('No data for this date');
        // }
      })
      .catch((err) => {
        console.log('Smell like Failure', err);
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
          onChange={ event => setDate(event.target.value, findEntry())}
          onClick={ findEntry()}>
        </input>

        Current Weight (lbs):
        <input type="number" id="input1" onChange={ event => setWeight(event.target.value) }></input>
        Total Time (minutes):
        <input type="number" id="input2" onChange={ event => setTime(event.target.value) } ></input>

        {/* Current Weight (lbs):
        <input type="number" id="input1" ref={inputRef1}></input>
        Total Time (minutes):
        <input type="number" id="input2" ref={inputRef2}></input> */}

        <button type="button" onClick={ (event) => onClickFunctions(event, clearFields()) }>Burn!</button>
        <button type="button" >Update</button>
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






  // const updateEntry = () => {
  //   console.log('HELLLPPPPP')
  //   axios.put(`/cb/caloriesBurned/${date}`)
  //     .then((data) => {
  //       console.log('DATA???', data)
  //       // if(data) {

  //       // } else {

  //       // }
  //     }
  //     )
  //     .catch ((err) => {
  //       console.log((`No entry for ${date}`, err));
  //     })
  // }