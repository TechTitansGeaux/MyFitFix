import React from 'react'

function FoodList(props) {
  const { item } = props;


  return (
    <div>
      <div>{item.name}</div>
      <div>{item.serving_size_g}</div>
      <div>{item.calories}</div>
    </div>
  )
}

export default FoodList;
