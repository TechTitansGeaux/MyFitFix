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

  //Axios requests to the server. After information is received from API, it posts it to the DB.
  //This will also handle updating entries after they have been made
  const requestHandler = () => {
    if ((weight >= 50 && weight <= 500) && time > 0) {
      axios.get('/cb/caloriesBurned', {
        params: { activity: 'lifting', weight: `${weight}`, duration: `${time}` }
      })
        .then((response) => {
          // burnedCalories = response.data.total_calories;
          axios.post('/cb/caloriesBurned', {
            date: date,
            activity: 'lifting',
            weight: `${weight}`,
            duration: `${time}`,
            burned: setBurned(response.data.total_calories)
          })
            .then((result) => {
            })
            .catch((err) => {
              console.error('WHAT THE HAAAIL YOU SAY?', err);
            })
        })
        .catch((err) => {
          console.log('Unsuccessful GET', err);
        })
    }

  }


  //function finds previous entries to view and/or edit.
  const findEntry = () => {
    axios.get(`/cb/caloriesBurned/${date}`)
      .then((responseObj) => {
        if (responseObj.data.length > 0) {
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
          setBurned('No entry for this date');
        }
      })
      .catch((err) => {
        console.log('Smell like Failure', err);
      })
  }
  
//////////////////////
  //update the date view
  const selectDate = (event) => {
    setDate(event);
  }

  useEffect(() => {
    findEntry()
  }, [date])
/////////////////////

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
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md '>
      <div className='bg-gradient-to-t from-sky-600 from-10%  via-sky-400 to-sky-50 to-40% ... py-8 px-6 shadow rounded-lg sm:px-10  drop-shadow-md ml-4 ' >

      <div className='flex justify-center py-5'>
      <h3 className='text-2xl text-sky-500 hover:text-orange-500 font-bold'>Calories Burned</h3>
      </div>

      <svg className="flex-shrink-0"></svg>



      <form className='mb-0 space-y-6'>
        <div>
          <label className='block text-sm font-medium text-sky-500 hover:text-orange-500'>Select Date</label>
          <input
            type="date"
            id="cb-date"
            name="cb-date"
            className='w-full border border-sky-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 hover:border-blue-700'
            value={date}
            onChange={(event) => selectDate(event.target.value)}
          >
          </input>
        </div>

        <div>
          <label className='block text-sm font-medium text-sky-500 hover:text-orange-500'>Current Weight (lbs)</label>

          <input type="number" id="input1" className='w-full border border-sky-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 hover:border-blue-700' onChange={event => setWeight(event.target.value)}></input>
        </div>

        <div>
          <label className='block text-sm font-medium text-sky-500 hover:text-orange-500'>Total Time (minutes)</label>
          <input type="number" id="input2" className='w-full border border-sky-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 hover:border-blue-700' onChange={event => setTime(event.target.value)} ></input>
        </div>

      <div className="txt-table">
        <div className="txt-data">Date: {date}</div>
        <div className="txt-data">Current Weight: {weight}</div>
        <div className="txt-data">Total Time: {time}</div>
        <div className="txt-data">Calories Burned: {burned}</div>
      </div>
      <div className='flex justify-evenly'>
      <button type="button" className='w-full border border-sky-300 rounded-lg shadow-lg hover:bg-orange-500 active:bg-orange-900 active:text-white' onClick={ (event) => requestHandler(event, clearFields())}>Burn!</button>
        <button type="button" className='w-full border border-sky-300 rounded-lg shadow-lg hover:bg-orange-500 active:bg-orange-900 active:text-white' onClick={(event) => deleteEntry(event)} >Delete</button>
      </div>
      </form>
      </div>
    </div>
  )
}

export default CaloriesBurned;

