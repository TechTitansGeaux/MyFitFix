import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CalorieIntake() {
  const [weight, setWeight] = useState(0);
  const [product, setProduct] = useState('');
  const [calories, setCalories] = useState(0);
  const [cTotal, setCTotal] = useState(0);

  const handleApiRequest = (event) => {
    axios.get('/nutrition/food', { params: { q: `${weight}g ${product}` } })
      .then((response) => {
        console.log(response.data.items);
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
      <div className='txt-table'>
        <div className='txt-data'>Product</div>
        <div className='txt-data'>Weight(g)</div>
        <div className='txt-data'>Calories</div>
      </div>
    </div>
  )
}

export default CalorieIntake;
