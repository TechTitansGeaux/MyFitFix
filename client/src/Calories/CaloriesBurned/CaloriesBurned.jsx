import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
// import StevenHe from 'youtube';

function CaloriesBurned() {

  //Set state with React hooks
  const [weight, setWeight] = useState(0);
  const [time, setTime] = useState(0);
  const [burned, setBurned] = useState(0);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

  //function to clear in put fields on button click
  const clearFields = () => {
    document.getElementById("input1").value = '';
    document.getElementById("input2").value = '';
  }

  //Axios requests to the server. After information is received from API, it posts it to the DB
  const requestHandler = () => {
    axios.get('/cb/caloriesBurned', {
      params: {activity: 'lifting', weight: `${weight}`, duration: `${time}`}
    })
      .then((response) => {
        console.log('Successful GET', response.data);

        axios.post('/cb/caloriesBurned', {
          date: date,
          activity: 'lifting',
          weight: `${weight}`,
          duration: `${time}`,
          burned: setBurned(response.data.total_calories)})
          .then((result) => {
            console.log('Success?', result);
          })
          .catch((err) => {
            console.error('WHAT THE HAAAIL YOU SAY?', err);
          })
      })

      .catch((err) => {
        console.log('Unsuccessful GET', err);
      })
  }

//function to handled function on clicking "Burn!" button
 const onClickFunctions = () => {
  requestHandler();
  clearFields()
 }

 //function finds previous entries to view and/or edit.
  const findEntry = () => {
    axios.get(`/cb/caloriesBurned/${date}`)
      .then((responseObj) => {
        console.log('Success!', responseObj);
        if(responseObj.data.length > 0) {
          const { date, currentWeight, duration, caloriesBurned } = responseObj.data[0];
          setDate(date);
          setWeight(currentWeight);
          setTime(duration);
          setBurned(caloriesBurned);
        }
        else {
          console.log('0 length Array', responseObj);
          setDate(date);
          setWeight(0);
          setTime(0);
          setBurned('No data for this date');
        }
      })
      .catch((err) => {
        console.log('Smell like Failure', err);
      })
  }

  //update the date view
  const update = (event) => {
    setDate(event);
  }

  useEffect(() => {
    findEntry()
  }, [date])


  //DELETE entry from DB
  const deleteEntry = () => {
    axios.delete(`/cb/caloriesBurned/${date}`)
      .then(() => {
          setDate(date);
          setWeight(0);
          setTime(0);
          setBurned('No data for this date');
      })
      .catch((err) => {
        console.log('Could not DELETE task:', err);
      });
  }

  return (
    <div>
      <h3>Workout</h3>
      <form>
        <input
          type="date"
          id="cb-date"
          name="cb-date"
          value={date}
          onChange={(event) => update(event.target.value)}
          >
        </input>

        Current Weight (lbs):
        <input type="number" id="input1" onChange={ event => setWeight(event.target.value) }></input>
        Total Time (minutes):
        <input type="number" id="input2" onChange={ event => setTime(event.target.value) } ></input>

        <button type="button" onClick={ (event) => onClickFunctions(event) }>Burn!</button>
      </form>
      <div className="txt-table">
       <div className="txt-data">Date: {date}</div>
        <div className="txt-data">Current Weight: {weight}</div>
        <div className="txt-data">Total Time: {time}</div>
        <div className="txt-data">Calories Burned: {burned}</div>
      </div>
      <div>
      <button type="button" onClick={ (event) => deleteEntry(event) } >Delete</button>
      </div>
    </div>
  )
}

export default CaloriesBurned;

