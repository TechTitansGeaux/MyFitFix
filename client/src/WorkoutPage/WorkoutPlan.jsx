import React, { useState } from 'react';
import data from "./data.json";
import WorkoutList from './WorkoutList';
import SearchWorkout from './SearchWorkout.jsx';



function WorkoutPlanner() {

const [ exercises, setExercises] = useState(data);

// const getExercises = () => {
// axios.get('')
//       .then(({ data }) => {
//         this.setState({
//           transactions: data
//         });
//       })
//       .catch((err) => {
//         console.error('failed to get transaction', err);
//       });
//   }

    return (
  <div>
    <h1 align='center'>Plan Your Workout</h1>
    <h2 align='left'>Search for Exercises</h2>
    <h3 align='right'> Today's workout</h3>
    <div className='workoutSearch'>
       <SearchWorkout />
    </div>
    <div className='workout'>
     <WorkoutList exercises={exercises}/>
     </div>
</div>
    )
}

export default WorkoutPlanner;