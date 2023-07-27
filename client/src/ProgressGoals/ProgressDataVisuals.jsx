import axios from 'axios';
import React from 'react';
import '../ProgressGoals/ProgressDataVisuals.css';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

// Test Data
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
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
                <Line
                  type='monotone'
                  dataKey='pv'
                  stroke='#8884d8'
                  strokeWidth={2}
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