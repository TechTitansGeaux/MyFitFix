import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Goals = ({ user, goals, handleScrollClick }) => {
  // Navigate to Home page
  const navigate = useNavigate();
  const [showGoals, setShowGoals] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [newGoals, setGoals] = useState(goals);

  // initialSliderState must declared before sliderNumber state hook
  const initialSliderState = {
    calorieSlider: 0,
    weightSlider: 0,
  };
  const [sliderNumber, setSliderNumber] = useState(initialSliderState);

  const handleChangeSlider = (e) => {
    setSliderNumber({ ...sliderNumber, [e.target.name]: e.target.value });
  };

  const submitGoals = () => {

    axios
      .post('/goals', {
        user: user._id,
        goalCaloriesBurned: sliderNumber.calorieSlider,
        goalWeight: sliderNumber.weightSlider,
      })
      .then((response) => {
        setShowGoals(true);
        setShowInput(false);
      })
      .catch((err) => {
        console.error('ERROR. Failed to update Goals from Axios Post', err);
      });
  };

  // Effect for getting goals data
  useEffect(() => {
    axios
      .get('/goals')
      .then((goals) => {
        setGoals(goals.data);
      })

      .catch((err) => {
        console.error('Failed to get goals data:', err);
      });
  }, []);


  // console.log('newGoals ==>', newGoals)
  return (
    <>
      {showInput && (
        <div className='alert alert-dismissible fade show fixed bottom-0 right-0 left-0 z-[1030] w-full items-center justify-between bg-neutral-700 py-4 px-6 text-center text-white'>
          <div className='flex-hori center-content'>
            <div className='margin-hori-sm'>
              Calories Burned Goal:{' '}
              <span>
                <input
                  type='range'
                  id='calorieSlider'
                  name='calorieSlider'
                  min='0'
                  max='10000'
                  value={sliderNumber.calorieSlider}
                  onChange={handleChangeSlider}
                />
              </span>
              <h3 className='text-amber-500 font-semibold'>
                {sliderNumber.calorieSlider} total calories
              </h3>
            </div>
            <div className='margin-hori-sm'>
              Weight Loss Goal:{' '}
              <span>
                <input
                  type='range'
                  id='weightSlider'
                  name='weightSlider'
                  min='0'
                  max='500'
                  value={sliderNumber.weightSlider}
                  onChange={handleChangeSlider}
                />
              </span>
              <h3 className='text-amber-500 font-semibold'>
                {sliderNumber.weightSlider} total lbs
              </h3>
            </div>
            <button
              className='margin-hori-sm py-2 focus:outline-none dark:text-white justify-start hover:text-white focus:bg-sky-500 bg-amber-500 focus:text-white font-semibold hover:bg-sky-500 text-white rounded items-center space-x-6 w-48 min-h-max'
              onClick={() => {
                // scroll to progress view OR navigate back to home dashboard
                submitGoals();
              }}
            >
              Save New Goals
            </button>
          </div>
        </div>
      )}
      {showGoals && (
        <div className='alert alert-dismissible fade show fixed bottom-0 right-0 left-0 z-[1030] w-full items-center justify-between bg-neutral-900 py-4 px-6 text-center text-white'>
          <div className='flex-hori center-content'>
            <div className='margin-hori-sm'>
              Total Calories Goal:{' '}
              <span className='text-amber-500 font-semibold'>
                {newGoals.map((goal) =>
                  goal.user === user._id
                    ? goal.goalCaloriesBurned + ' cals'
                    : null
                )}
              </span>
            </div>
            <div className='margin-hori-sm'>
              Total Weight Loss Goal:{' '}
              <span className='text-amber-500 font-semibold'>
                {newGoals.map((goal) =>
                  goal.user === user._id ? goal.goalWeight + ' lbs' : null
                )}
              </span>
            </div>
            <button
              className='margin-hori-sm py-2 focus:outline-none dark:text-white justify-start hover:text-white focus:bg-sky-500 bg-amber-500 focus:text-white font-semibold hover:bg-sky-500 text-white rounded items-center space-x-6 w-48 min-h-max'
              onClick={() => {
                // scroll to progress view OR POTENTIALLY navigate back to home dashboard - not implemented
                handleScrollClick() || navigate('/home');
              }}
            >
              Update Progress
            </button>
            <button
              className='margin-hori-sm py-2 focus:outline-none dark:text-white justify-start hover:text-white focus:bg-sky-500 bg-amber-500 focus:text-white font-semibold hover:bg-sky-500 text-white rounded items-center space-x-6 w-48 min-h-max'
              onClick={() => {
                // scroll to progress view OR navigate back to home dashboard
                setShowGoals(false);
                setShowInput(true);
              }}
            >
              Save New Goals
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Goals;
