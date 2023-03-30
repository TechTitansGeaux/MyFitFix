import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodList from './FoodList';
import moment from 'moment';

function CalorieIntake() {
  // Components in state that we are using for functionality
  const [weight, setWeight] = useState(0);
  const [product, setProduct] = useState('');
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [food, setFood] = useState([]);
  const [total, setTotal] = useState(0);

  // Set food state to be an array of the ingredients tied to the user
  const getAllFoodItems = () => {
    // Sends an axios GET request using the date as a parameter, it fetches a user's calorie intake for that date and renders it to the page or leaves it blank if nothing comes back
    axios.get('/nutrition/product', { params: { q: date } })
      .then((result) => {
        if (result.data !== "") {
          const foodList = result.data.foodList;
          setFood(foodList);
        } else {
          setFood([])
        }
      })
      .catch((err) => {
        console.error('Failed to request:', err);
      });
  }

  // Adds up the total calories in the food state array and sets the total state to be that number
  const setTotalCal = () => {
    // This variable is a holder of the result that we will be setting on our total state
    let totalResult = 0
    // We iterate over the food state array, and add all the calories up together
    food.forEach(item => {
      totalResult += item.calories;
    })
    // Set the total state to be the result of all the calorie numbers combined
    setTotal(totalResult);
  }

  //Sends a GET request to the nutrition api and sets the food array state to have that search result in it
  const handleApiRequest = (event) => {
    axios.get('/nutrition/food', { params: { q: `${weight}g ${product}` } })
      .then((response) => {
        const { items } = response.data;
        const item = items[0]
        setFood(food => [...food, item]);
      })
      .catch((err) => {
        console.error('Failed request to server:', err);
      })
  }

  //Saves the current date's nutrition chart using a POST request, then requests from the db the foodList array and states the food state to be that value
  const handleDBSave = () => {
    alert(`Successfully saved`);
    axios.post('nutrition/food', { foodList: food, date: date })
      .then(getAllFoodItems())
      .catch((err) => {
        console.error('Failed to send request:', err);
      });
  }

  //Updates the selected date's nutrition chart
  const handleDBUpdate = () => {
    axios.put(`nutrition/food/${date}`, { foodList: food })
      .then(() => {
        alert(`Successfully updated you table`)
      })
      .catch((err) => {
        console.error('Failed to send request', err);
      })
  }

  // This is a handler for when the date changes, it will fetch the calorie table from that date
  const handleDateChange = (newDate) => {
    setDate(newDate);
  }

  const handleDeleteOneEntry = (name) => {
    setFood((food) => {
      return food.filter((item) => item.name !== name)
    });
  }

  // const handleDeletingFromDB = () => {
  //   axios.delete(`nutrition/food/${date}`)
  //     .then(() => {

  //     })
  //     .catch(() => {

  //     });
  // }

  //Set to clear out the fields and reset the state when the submit button is pressed
  const clearFields = () => {
    document.getElementById("foodWeight").value = '';
    document.getElementById("foodProduct").value = '';
    setWeight(0);
    setProduct('');
  }

  // Renders the page whenever the date changes
  useEffect(() => {
    getAllFoodItems();
  }, [date]);

  // Renders the page whenever the food array changes
  useEffect(() => {
    setTotalCal();
  }, [food]);

  return (
    <div>
      <h2>Meal Tracker:
        <input
          type="date"
          id="caloriesIn"
          name="caloriesInDate"
          value={date}
          onChange={(e) => {
            handleDateChange(e.target.value);
          }}
        ></input>
      </h2>
      <form>
        Weight(g):<input id='foodWeight' type='number' onChange={e => setWeight(e.target.value)}></input>
        Product:<input id='foodProduct' type='text' onChange={e => setProduct(e.target.value)}></input>
        <button type='button' onClick={() => {
          handleApiRequest()
          clearFields();
        }}>Submit</button>
      </form>
      <div className='txt-table' onChange={() => setTotalCal()}>
        <div className='txt-data'>Product</div>
        <div className='txt-data'>Weight(g)</div>
        <div className='txt-data'>Calories</div>
        {food.map((item) => <FoodList item={item} key={`${item.name}`} handleDeleteOneEntry={handleDeleteOneEntry} />)}
      </div>
      <div>
        <br></br>
        <button type='button' onClick={() => handleDBSave()}>Save</button>
        <button type='button' onClick={() => handleDBUpdate()}>Update</button>
        <h3>Total Calories: {total}</h3>
      </div>
    </div >
  )
}

export default CalorieIntake;
