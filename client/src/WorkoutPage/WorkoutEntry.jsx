import React, { useState } from "react";


function WorkoutEntry( {exercise, setSet, setRep, changeList} ){


  return (
    <table class="table-fixed">
      <tbody>
    <tr>
      <td>{exercise.name}</td>
      <td>SETS:<input class=" block w-10 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" id='foodWeight' type='number' onChange={e => setSet(e.target.value)}></input></td>
      <td>REPS:<input class=" block w-10 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" id='foodProduct' type='number' onChange={e => setRep(e.target.value)}></input></td>
      <td><button type="button" class="w-52 block bg-slate-400 border-sky-300 rounded-lg shadow-lg hover:bg-orange-500 active:bg-orange-900 font-bold tracking-wider active:text-white transform hover:scale-110 px-1 ml-4 mr-4"onClick={(e) => changeList(e.target.value)} value={exercise.name}>Save Sets & Reps</button></td>
    </tr>
  </tbody>
  </table>

  )
};

export default WorkoutEntry;