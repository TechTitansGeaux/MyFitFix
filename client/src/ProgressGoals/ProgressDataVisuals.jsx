import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import '../ProgressGoals/ProgressDataVisuals.css';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

///////////// MY PROGRESS DATA VISUAL COMPONENT ///////////////
const ProgressDataVisuals = ({ user, dailyBurn, goals, progress }) => {
  const [submit, setSubmit] = useState(false);
  const [weightUpdate, setWeightUpdate] = useState('');
  const [goalsUpdate, setGoalsUpdate] = useState(goals);
  const [progressUpdate, setProgressUpdate] = useState([]);
  // const [workoutCals, setWorkoutCals] = useState([]);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState([]);


  ///// PRE-POPULATED DATA FOR CHARTS
  // initial pie chart calories burned // in state below
  const initialPieDataCalories = [
    { name: 'Total Calories Burned', value: 30, color: '#0EA5E9' },
    { name: 'Calories to Goal', value: 100, color: '#B2E4FB' },
  ];
  const [pieDataCalories, setPieDataCalories] = useState(
    initialPieDataCalories
  );

  // initial pie chart weight data // in state below
  const initialPieDataWeight = [
    { name: 'Total Weight Lost', value: 0, color: '#F59E0B' },
    { name: 'Pounds to Goal', value: 100, color: '#FCE7C5' },
  ];
  const [pieDataWeight, setPieDataWeight] = useState(initialPieDataWeight);

  // Line Data calorie data // in state as progressUpdate
  const lineDataCalories = [
    { calories: 150 },
    { calories: 200 },
    { calories: 145 },
    { calories: 210 },
    { calories: dailyBurn },
  ];

  // line chart weight data // in state as progressUpdate
  const initialLineDataWeight = [
    { pounds: 1 },
    { pounds: 3 },
    { pounds: -2 },
    { pounds: 1 },
    { pounds: -3 },
  ];

  const [lineDataWeight, setLineDataWeight] = useState(initialLineDataWeight);

  // CALCULATE TOTAL CALORIES BURNED
  const updateTotalCalories = () => {
    return progressUpdate.map((progressObj) => {
      if (progressObj.user === user._id) {
        progressObj.lineDataCalories.reduce((totalCals, curr) => {
          totalCals += curr.calories;
          setTotalCaloriesBurned(totalCals);
          return totalCals;
        }, 0);
      }
    });
  };

  // CALCULATE TOTAL WEIGHT LOST
  const totalWeightLost = lineDataWeight.reduce((totalWeightLoss, curr) => {
    totalWeightLoss += curr.pounds;
    return totalWeightLoss;
  }, 0);

  //function finds goals to view
  const findGoals = () => {
    axios
      .get(`/goals`)
      .then((response) => {
        // console.log('response data from findCalories', response.data);
        setGoalsUpdate([...response.data]);
      })
      .catch((err) => {
        console.error('find Calories FAILED', err);
      });
  };

  //function finds progress stats for view
  const findProgress = () => {
    axios
      .get(`/progress`)
      .then((response) => {
        console.log('response data from findProgess', response.data);
        setProgressUpdate([...response.data]);
      })
      .catch((err) => {
        console.error('find Calories FAILED', err);
      });
  };

  //function initializes progress stats to DB
  const initializeProgress = () => {
    axios
      .post('/progress', {
        user: user._id,
        lineDataCalories: lineDataCalories,
        pieDataCalories: pieDataCalories,
        lineDataWeight: lineDataWeight,
        pieDataWeight: pieDataWeight,
      })
      .then((response) => {
        // console.log('SUCCESS: update Progress from Axios Post to DB, in ProgressDataVisuals.jsx:', response);
      })
      .catch((err) => {
        console.error('ERROR. Failed to update Goals from Axios Post', err);
      });
  };

  //////////////////////
  //update the view
  useEffect(() => {
    initializeProgress();
    findGoals();
    findProgress();
    updateTotalCalories();

    // setWorkoutCals((prevCals) => [...prevCals, { "calories": dailyBurn }])
  }, []);

  useEffect(() => {
  }, [submit])
  /////////////////////

  // weigh-in function to handle user input
  const handleChange = (e) => {
    setWeightUpdate(e.target.value);
  };

   // submits weight to state
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true)
    console.log('conform to lineDataWeight', { pounds: weightUpdate });
    let weightLeft = goals.length > 0 ? goals[0].goalWeight - weightUpdate : null; // weight change update
    // let weightLost = goals.length > 0 ? weightUpdate : null; // weight change update
    // console.log('weightlost variable', weightLost)
    setLineDataWeight([...lineDataWeight, { pounds: -weightUpdate }]);
    setPieDataWeight([
      { name: 'Total Weight Lost', value: totalWeightLost * -1, color: '#F59E0B' },
      { name: 'Pounds to Goal', value: weightLeft, color: '#FCE7C5' },
    ]);
    setWeightUpdate('');

  };

  // const initialPieDataWeight = [
    // { name: 'Total Weight Lost', value: 0, color: '#F59E0B' },
    // { name: 'Pounds to Goal', value: 100, color: '#FCE7C5' },
  // ];
  // const [pieDataWeight, setPieDataWeight] = useState(initialPieDataWeight);

  // console.log('goalsUpdate state ===>', goalsUpdate);
  // console.log('workoutCals state ===>', workoutCals);
  // console.log('dailyBurn from props >>>', dailyBurn);
  // console.log('goals from props >>>', goals);
  // console.log('progress from props >>>', progress);

  ///////////////////// RENDERING COMPONENT TO DASHBOARD ///////////////////////////
  return (
    <div className='flex-col-container'>
      <h2 className='font-bold text-3xl text-black'>My Progress</h2>
      <div className='input-row-container'>
        <input
          name='weigh-in'
          type='number'
          min='75'
          step='1'
          placeholder='lbs Losts '
          onChange={handleChange}
          onKeyDown={(e) => (e.key === 'Enter' ? handleSubmit(e) : null)}
          value={weightUpdate}
          className='text-input'
        ></input>
        <button
          className='margin-hori-sm py-2 focus:outline-none dark:text-white justify-start hover:text-white focus:bg-sky-500 bg-amber-500 focus:text-white font-semibold hover:bg-sky-500 text-white rounded items-center space-x-6 w-48 min-h-max'
          onClick={(e) => handleSubmit(e)}
        >
          <b>UPDATE lbs LOST</b>
        </button>
      </div>
      <div className='flex-row-container'>
        {/** CALORIE PIE CHART */}
        <div className='data-pie-graph-container'>
          <div className='text-container'>
            <h3 className='font-semibold text-xl text-black'>
              Goal Calories Remaining
            </h3>
            <span>
              <h3 className='font-bold text-3xl text-sky-500'>
                {/* {pieDataCalories[1].value} */}
                {goals.length > 0
                  ? goals[0].goalCaloriesBurned - dailyBurn
                  : null}
              </h3>
              <p className='p-goals'>
                <b>{goals.length > 0 ? goals[0].goalCaloriesBurned : null} </b>
                <span className='small-text'>calories - to burn goal</span>
              </p>
            </span>
          </div>
          <div className='pie-graph'>
            <ResponsiveContainer width='99%' height='99%'>
              <PieChart>
                <Tooltip labelStyle={{ display: 'none' }} />
                <Pie
                  data={pieDataCalories}
                  innerRadius={'70%'}
                  outerRadius={'90%'}
                  fill='#8884d8'
                  paddingAngle={5}
                  dataKey='value'
                >
                  {pieDataCalories.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/** CALORIE LINE CHART */}
        <div className='data-line-graph-container'>
          <div className='text-container'>
            <h3 className='font-semibold text-xl text-black'>
              Total Calories Burned
            </h3>
            {/* CHECK total calories Dynamic value*/}
            <span>
              <h3 className='font-bold text-3xl text-sky-500 '>
                {dailyBurn}
                {/* {totalCaloriesBurned} */}
              </h3>
              <p>calories</p>
            </span>
          </div>
          <div className='line-graph'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart width={300} height={100} data={lineDataCalories}>
                <Tooltip labelStyle={{ display: 'none' }} />
                <Line
                  type='monotone'
                  dataKey='calories'
                  stroke='#0ea5e9'
                  strokeWidth={3}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
            <h3 className='font-bold text-md text-sky-500'>PER WORKOUT</h3>
          </div>
        </div>
      </div>
      <div className='flex-row-container'>
        {/** WEIGHT LOSS PIE CHART */}
        <div className='data-pie-graph-container'>
          <div className='text-container'>
            <h3 className='font-semibold text-xl text-black'>
              Goal Weight Remaining
            </h3>
            {/* 1500 Needs to be Dynamic*/}
            <span>
              <h3 className='font-bold text-3xl text-amber-500 '>
                {/* {pieDataWeight[1].value} */}
                {goals.length > 0
                  ? goals[0].goalWeight + totalWeightLost
                  : null}
              </h3>
              <p className='p-goals'>
                <b>{goals.length > 0 ? goals[0].goalWeight : null} </b>
                <span className='small-text'>pounds - to lose goal</span>
              </p>
            </span>
          </div>
          <div className='pie-graph'>
            <ResponsiveContainer width='99%' height='99%'>
              <PieChart>
                <Tooltip labelStyle={{ display: 'none' }} />
                <Pie
                  data={pieDataWeight}
                  innerRadius={'70%'}
                  outerRadius={'90%'}
                  fill='#8884d8'
                  paddingAngle={5}
                  dataKey='value'
                >
                  {pieDataWeight.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/** WEIGHT LOSS LINE CHART */}
        <div className='data-line-graph-container'>
          <div className='text-container'>
            <h3 className='font-semibold text-xl text-black'>
              Total Weight Lost
            </h3>
            {/* CHECK WEIGHT DYNAMIC VALUE*/}
            <span>
              <h3 className='font-bold text-3xl text-amber-500 '>
                {totalWeightLost}
              </h3>
              <p>pounds</p>
            </span>
          </div>
          <div className='line-graph'>
            <ResponsiveContainer className='mt-12' width='100%' height='50%'>
              <LineChart width={300} height={100} data={lineDataWeight}>
                <Tooltip labelStyle={{ display: 'none' }} />
                <Line
                  type='monotone'
                  dataKey='pounds'
                  stroke='#F59E0B'
                  strokeWidth={3}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
            <h3 className='font-bold text-md text-amber-500 '>PER UPDATE</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressDataVisuals;
