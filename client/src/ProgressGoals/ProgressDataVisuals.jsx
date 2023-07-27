import axios from 'axios';
import React from 'react';
import '../ProgressGoals/ProgressDataVisuals.css';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';

// Test Data
/**
 * {
 * date:  from CaloriesBurnedScehma data
 * }
 */
const data = [
  {
    date: 'Page A',
    uv: 4000,
    calories: 2400,
    amt: 2400,
  },
  {
    date: 'Page B',
    uv: 3000,
    calories: 1398,
    amt: 2210,
  },
  {
    date: 'Page C',
    uv: 2000,
    calories: 9800,
    amt: 2290,
  },
  {
    date: 'Page D',
    uv: 2780,
    calories: 3908,
    amt: 2000,
  },
  {
    date: 'Page E',
    uv: 1890,
    calories: 4800,
    amt: 2181,
  },
  {
    date: 'Page F',
    uv: 2390,
    calories: 3800,
    amt: 2500,
  },
  {
    date: 'Page G',
    uv: 3490,
    calories: 4300,
    amt: 2100,
  },
];


const ProgressDataVisuals = () => {
  return (
    <div className='flex-col-container'>
      <h2 className='font-bold text-3xl text-black'>My Progress</h2>
      <div className='flex-row-container'>
        <div className='data-pie-graph-container'></div>
        <div className='data-line-graph-container'>
          <div className='text-container'>
            <h3 className='font-semibold text-xl text-black'>
              Total Calories Burned
            </h3>
            {/* 5000 Needs to be Dynamic*/}
            <span>
              <h3 className='font-bold text-3xl text-amber-500 '>5000</h3>
              <p>calories</p>
            </span>
          </div>
          <div className='line-graph'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart width={300} height={100} data={data}>
                <Tooltip />
                <Line
                  type='monotone'
                  dataKey='calories'
                  stroke='#0ea5e9'
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
            <h3 className='font-bold text-md text-sky-500 '>THIS WEEK</h3>
          </div>
        </div>
      </div>
      <div className='flex-row-container'>
        <div className='data-pie-graph-container'></div>
        <div className='data-line-graph-container'></div>
      </div>
    </div>
  );
}

export default ProgressDataVisuals;