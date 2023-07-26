import React from "react";


function PastWorkoutEntry( { workout } ){




  return (
 <table class="w-full table-fixed">

  <tbody>
    <tr>
      <td>{workout.name}</td>
      <td>SETS:{workout.set}</td>
      <td>REPS:{workout.rep}</td>
    </tr>
    </tbody>
    </table>

  )
};

export default PastWorkoutEntry

