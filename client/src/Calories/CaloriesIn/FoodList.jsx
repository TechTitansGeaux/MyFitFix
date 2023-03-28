import React from 'react'

function FoodList(props) {
  const { item } = props;
  return (
    <div>
      <div>{item.foodItem}</div>
      <div>{item.weightInGrams}</div>
      <div>{item.calories}</div>
    </div>
  )
}

export default FoodList;
