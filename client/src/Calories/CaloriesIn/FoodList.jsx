import React from 'react'

function FoodList(props) {
  const { item, handleDeleteOneEntry } = props;

  return (
    <div>
      <div>{item.name}</div>
      <div>{item.serving_size_g}</div>
      <div>{item.calories}</div>
      <button type='button' value={item.name} onClick={(e) => handleDeleteOneEntry(e.target.value)}>Delete</button>
    </div>
  )
}

export default FoodList;
