import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodList from './FoodList';

function CalorieIntake() {
  const [weight, setWeight] = useState(0);
  const [product, setProduct] = useState('');
  const [calories, setCalories] = useState(0);
  const [cTotal, setCTotal] = useState(0);
  const [food, setFood] = useState([]);

  //Set food state to be an array of the ingredients tied to the user
  const getAllFoodItems = () => {
    axios.get('/nutrition/product')
      .then((result) => {
        setFood(result.data);
        console.log(food);
      })
      .catch((err) => {
        console.error('Failed to request:', err);
      });
  }

  //Sends a Get request to the nutrition api, and a POST request to the db with the data received from the api
  const handleApiRequest = (event) => {
    axios.get('/nutrition/food', { params: { q: `${weight}g ${product}` } })
      .then((response) => {
        const name = response.data.items[0].name;
        const calories = response.data.items[0].calories;
        const weight = response.data.items[0].serving_size_g;

        axios.post('nutrition/food', { name: name, calories: calories, weight: weight })
          .then((result) => {
            console.log(result);
          })
          .catch(() => {
            console.error('Failed to send request:', err);
          })
      })
      .catch((err) => {
        console.error('Failed request to server:', err);
      })
  }

  return (
    <div>
      <h3>Meal Tracker</h3>
      <form>
        Weight(g):<input type='number' onChange={e => setWeight(e.target.value)}></input>
        Product:<input type='text' onChange={e => setProduct(e.target.value)}></input>
        <button type='button' onClick={(e) => handleApiRequest(e)}>Submit</button>
      </form>
      <button type='button' onClick={() => getAllFoodItems()}>TestButton</button>
      <FoodList />
    </div>
  )
}

export default CalorieIntake;
