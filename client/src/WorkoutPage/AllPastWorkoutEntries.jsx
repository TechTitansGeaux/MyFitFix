import React from "react";

function AllPastWorkoutEntries( { workouts } ){

  return (
 <table class="w-full table-fixed">

  <tbody>
    <tr>
      <td>{workouts.date}</td>
      <td>{workouts.exercise[0].name}</td>
      <td>SETS:{workouts.exercise[0].set}</td>
      <td>REPS:{workouts.exercise[0].rep}</td>
    </tr>
    </tbody>
    </table>

  )
};

export default AllPastWorkoutEntries;
