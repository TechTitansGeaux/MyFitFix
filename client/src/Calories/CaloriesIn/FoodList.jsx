import React from 'react'

function FoodList(props) {
  const { item, handleDeleteOneEntry } = props;

  return (
    <div className="flex items-center">
      <div className='pr-10'>{item.name}</div>
      <div className='pr-10'>{item.serving_size_g}</div>
      <div className='pr-10'>{item.calories}</div>
      <button type='button' value={item.name} onClick={(e) => handleDeleteOneEntry(e.target.value)}>Delete</button>
    </div>
  )
}

export default FoodList;
