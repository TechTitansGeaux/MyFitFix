import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodList from './FoodList';
import moment from 'moment';

function CalorieIntake() {
  const [weight, setWeight] = useState(0);
  const [product, setProduct] = useState('');
  const [date, setDate] = useState('');
  const [food, setFood] = useState([]);
  const [total, setTotal] = useState(0);
  const [finished, setFinished] = useState(false);

  //Set food state to be an array of the ingredients tied to the user
  const getAllFoodItems = () => {
    axios.get('/nutrition/product')
      .then((result) => {
        // console.log(result);
        const foodList = result.data[0].foodList;
        setFood(foodList);
      })
      .catch((err) => {
        console.error('Failed to request:', err);
      });
  }


  const setTotalCal = () => {
    let totalResult = 0
    const product = food;
    product.forEach(item => {
      totalResult += item.calories;
    })
    console.log(totalResult);
    setTotal(totalResult);
  }

  // Renders the page on visit dynamically once
  useEffect(() => {
    if (!finished) {
      setFinished(true);
    }
    getAllFoodItems();
    setDate(moment().format("YYYY-MM-DD"))
  }, [finished]);

  //Sends a Get request to the nutrition api, and a POST request to the db with the data received from the api
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

  //Saves the current date's nutrition chart
  const handleDBSave = () => {
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

      })
      .catch((err) => {
        console.error('Failed to send request', err);
      })
  }

  const clearFields = () => {
    document.getElementById("foodWeight").value = '';
    document.getElementById("foodProduct").value = '';
    setWeight(0);
    setProduct('');
  }

  return (
    <div>
      <h2>Meal Tracker</h2>
      <form>
        <input
          type="date"
          id="caloriesIn"
          name="caloriesInDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
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
        {food.map((item) => <FoodList item={item} key={`${item.name}`} />)}
      </div>
      <div>
        <br></br>
        <button onClick={() => handleDBSave()}>Save</button>
        <button onClick={() => handleDBUpdate()}>Update</button>
        <h3>Total Calories: {total}</h3>
        <button type='button' onClick={() => setTotalCal()}>Get Total</button>
      </div>
    </div>
  )
}

export default CalorieIntake;
