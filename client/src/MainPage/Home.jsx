import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import moment from 'moment';

// this is a test for the push/merge conflicts

function Home() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);
  const [user, setUser] = useState({});
  const [ateTotal, setAteTotal] = useState(0);
  const [dailyBurn, setDailyBurn] = useState(0);
  const [dailyWorkout, setDailyWorkout] = useState([]);
  const [journalMessage, setJournalMessage] = useState('');
  const [icon, setIcon] = useState('')
  const [workoutIcon, setWorkoutIcon] = useState('')

  let todaysDate = moment().format("YYYY-MM-DD");


  const logoutOfApp = () => {
    axios.get('/auth/logout')
      .then(() => {
        alert('You are logged out');
        navigate('/');
      })
      .catch((err) => {
        console.error('Failed to logout:', err);
      });
  }

  // Helper for total ate Cals
  const getTotalCals = (list) => {
    let total = 0;
    list.forEach(item => total += item.calories);
    setAteTotal(`${total} calories`)
  }

  // Effect for getting a user
  useEffect(() => {
    axios.get('/dashboard/user')
      .then(({ data }) => {
        setUser(data[0]);
      })
      .catch((err) => { console.err(err) });
  }, [load])

  //Effect for getting their total calories ate
  useEffect(() => {
    axios.get('dashboard/caloriesIn')
      .then(({ data }) => {
        if (data.length !== 0) {
          const foodList = data[0].foodList;
          getTotalCals(foodList);
        } else {
          setAteTotal('0 calories');
        }
      })
      .catch((err) => {
        console.error('Failed to get caloriesIn:', err);
      });
  }, [user])

  //Effect for getting total calories burned
  useEffect(() => {
    axios.get('dashboard/caloriesBurned')
      .then(({ data }) => {
        if (data.length !== 0) {
          const calBurned = data[0].caloriesBurned;
          setDailyBurn(calBurned);
        } else {
          setDailyBurn(0);
        }
      })
      .catch((err) => {
        console.error('Failed to get caloriesBurned:', err);
      });
  }, [ateTotal])

  // Effect for getting the Daily Workout
  useEffect(() => {
    axios.get('dashboard/workouts')
      .then(({ data }) => {
        if (data.length !== 0) {
          const workout = data[0].exercise;
          setDailyWorkout(workout);
          setWorkoutIcon(<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="inline-block ml-3">
            <path fill="#27ae60" d="M22 13c0 5.523-4.477 10-10 10S2 18.523 2 13 6.477 3 12 3s10 4.477 10 10z" />
            <path fill="#2ecc71" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" />
            <path fill="#27ae60" d="m16 9-6 6-2.5-2.5-2.125 2.1 2.5 2.5 2 2 .125.1 8.125-8.1L16 9z" />
            <path fill="#ecf0f1" d="m16 8-6 6-2.5-2.5-2.125 2.1 2.5 2.5 2 2 .125.1 8.125-8.1L16 8z" />
          </svg>);
        } else {
          setDailyWorkout('You have not created a workout today.');
          setWorkoutIcon(<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 64 64" class="inline-block ml-3" >
            <path fill="#ffc048" d="M32 3.4A28.59 28.59 0 0 0 3.4 32 28.59 28.59 0 0 0 32 60.6 28.59 28.59 0 0 0 60.6 32 28.59 28.59 0 0 0 32 3.4Zm0 49.2a4.32 4.32 0 1 1 4.31-4.31A4.32 4.32 0 0 1 32 52.6ZM37.23 17 35.6 39a.6.6 0 0 1-.6.56h-6a.6.6 0 0 1-.6-.56l-1.63-22a5.24 5.24 0 1 1 10.46 0Z" data-name="Layer 35" />
          </svg>);
        }
      })
      .catch((err) => {
        console.error('Failed to get workout:', err);
      })
  }, [dailyBurn])

  useEffect(() => {
    // Implementing useEffect to send a GET request to check if the current signed-in user's daily entry was completed
    axios.get(`/journal-entry/${todaysDate}`)
      .then((response) => {
        if (response.data.length !== 0) {
          setJournalMessage('All done. You have submitted your journal entry for today.')
          setIcon(<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="inline-block ml-3">
            <path fill="#27ae60" d="M22 13c0 5.523-4.477 10-10 10S2 18.523 2 13 6.477 3 12 3s10 4.477 10 10z" />
            <path fill="#2ecc71" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" />
            <path fill="#27ae60" d="m16 9-6 6-2.5-2.5-2.125 2.1 2.5 2.5 2 2 .125.1 8.125-8.1L16 9z" />
            <path fill="#ecf0f1" d="m16 8-6 6-2.5-2.5-2.125 2.1 2.5 2.5 2 2 .125.1 8.125-8.1L16 8z" />
          </svg>)
        } else {
          setJournalMessage('You have not completed a journal entry for today.')
          setIcon(<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 64 64" class="inline-block ml-3" >
            <path fill="#ffc048" d="M32 3.4A28.59 28.59 0 0 0 3.4 32 28.59 28.59 0 0 0 32 60.6 28.59 28.59 0 0 0 60.6 32 28.59 28.59 0 0 0 32 3.4Zm0 49.2a4.32 4.32 0 1 1 4.31-4.31A4.32 4.32 0 0 1 32 52.6ZM37.23 17 35.6 39a.6.6 0 0 1-.6.56h-6a.6.6 0 0 1-.6-.56l-1.63-22a5.24 5.24 0 1 1 10.46 0Z" data-name="Layer 35" />
          </svg>)
        }
      })
      .catch((err) => console.log(err, 'Request failed'));
  }, [journalMessage])


  return (
    <div className='grid grid-cols-4 grid-rows-2'>

      {/* START OF NAVIGATION BAR */}
      <div class="flex row-span-2">
        <div class="bg-white dark:bg-gray-800  xl:hidden flex text-gray-800 hover:text-black focus:outline-none focus:text-black justify-between w-full p-6 items-center">

          <div aria-label="toggler" class="flex justify-center items-center">
            <button id="open" onclick="showNav(true)" aria-label="open" class="hidden text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4 12H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4 18H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <button id="close" onclick="showNav(true)" aria-label="close" class="focus:outline-none dark:text-white text-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>
        <div id="Main" class="bg-white dark:bg-gray-800  transform xl:translate-x-0 ease-in-out transition duration-500 flex justify-start items-start w-full sm:w-72 flex-col h-full">
          <button class="hidden xl:flex text-gray-800 dark:text-white hover:text-black focus:outline-none focus:text-black justify-start px-6 pt-6 items-center space-x-3 w-full">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 17H0H1ZM7 17H6H7ZM17 27V28V27ZM27 17H28H27ZM17 0C12.4913 0 8.1673 1.79107 4.97918 4.97918L6.3934 6.3934C9.20644 3.58035 13.0218 2 17 2V0ZM4.97918 4.97918C1.79107 8.1673 0 12.4913 0 17H2C2 13.0218 3.58035 9.20644 6.3934 6.3934L4.97918 4.97918ZM0 17C0 21.5087 1.79107 25.8327 4.97918 29.0208L6.3934 27.6066C3.58035 24.7936 2 20.9782 2 17H0ZM4.97918 29.0208C8.1673 32.2089 12.4913 34 17 34V32C13.0218 32 9.20644 30.4196 6.3934 27.6066L4.97918 29.0208ZM17 34C21.5087 34 25.8327 32.2089 29.0208 29.0208L27.6066 27.6066C24.7936 30.4196 20.9782 32 17 32V34ZM29.0208 29.0208C32.2089 25.8327 34 21.5087 34 17H32C32 20.9782 30.4196 24.7936 27.6066 27.6066L29.0208 29.0208ZM34 17C34 12.4913 32.2089 8.1673 29.0208 4.97918L27.6066 6.3934C30.4196 9.20644 32 13.0218 32 17H34ZM29.0208 4.97918C25.8327 1.79107 21.5087 0 17 0V2C20.9782 2 24.7936 3.58035 27.6066 6.3934L29.0208 4.97918ZM17 6C14.0826 6 11.2847 7.15893 9.22183 9.22183L10.636 10.636C12.3239 8.94821 14.6131 8 17 8V6ZM9.22183 9.22183C7.15893 11.2847 6 14.0826 6 17H8C8 14.6131 8.94821 12.3239 10.636 10.636L9.22183 9.22183ZM6 17C6 19.9174 7.15893 22.7153 9.22183 24.7782L10.636 23.364C8.94821 21.6761 8 19.3869 8 17H6ZM9.22183 24.7782C11.2847 26.8411 14.0826 28 17 28V26C14.6131 26 12.3239 25.0518 10.636 23.364L9.22183 24.7782ZM17 28C19.9174 28 22.7153 26.8411 24.7782 24.7782L23.364 23.364C21.6761 25.0518 19.3869 26 17 26V28ZM24.7782 24.7782C26.8411 22.7153 28 19.9174 28 17H26C26 19.3869 25.0518 21.6761 23.364 23.364L24.7782 24.7782ZM28 17C28 14.0826 26.8411 11.2847 24.7782 9.22183L23.364 10.636C25.0518 12.3239 26 14.6131 26 17H28ZM24.7782 9.22183C22.7153 7.15893 19.9174 6 17 6V8C19.3869 8 21.6761 8.94821 23.364 10.636L24.7782 9.22183ZM10.3753 8.21913C6.86634 11.0263 4.86605 14.4281 4.50411 18.4095C4.14549 22.3543 5.40799 26.7295 8.13176 31.4961L9.86824 30.5039C7.25868 25.9371 6.18785 21.9791 6.49589 18.5905C6.80061 15.2386 8.46699 12.307 11.6247 9.78087L10.3753 8.21913ZM23.6247 25.7809C27.1294 22.9771 29.1332 19.6127 29.4958 15.6632C29.8549 11.7516 28.5904 7.41119 25.8682 2.64741L24.1318 3.63969C26.7429 8.20923 27.8117 12.1304 27.5042 15.4803C27.2001 18.7924 25.5372 21.6896 22.3753 24.2191L23.6247 25.7809Z"
                fill="currentColor" />
            </svg>
            <img src="https://i.pinimg.com/564x/55/40/de/5540de31482047fb26e188037245b9f8.jpg"></img>  {/* MyFitFix Logo */}
          </button>


          <div class="w-full px-4">
            <hr class="border-gray-100 dark:border-gray-700  w-full" />
          </div>

          {/* Start of List Items */}
          <div class="xl:mt-6 flex flex-col justify-start items-start px-4 w-full space-y-3 pb-5">
            {/* Dashboard List Item */}
            <button class="focus:outline-none flex dark:text-white jusitfy-start hover:text-white focus:bg-sky-500 focus:text-white hover:bg-sky-500 text-gray-600 rounded py-3 pl-4 items-center space-x-6 w-full" onClick={() => navigate('/home')}>
              <svg class="fill-stroke" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M19 4H15C14.4477 4 14 4.44772 14 5V9C14 9.55228 14.4477 10 15 10H19C19.5523 10 20 9.55228 20 9V5C20 4.44772 19.5523 4 19 4Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p class="text-base leading-4">Dashboard</p>
            </button>

            {/* Calorie Tracker List Item */}
            <button class="focus:outline-none flex dark:text-white jusitfy-start hover:text-white focus:bg-sky-500 focus:text-white hover:bg-sky-500 text-gray-600 rounded py-3 pl-4 items-center w-full space-x-6" onClick={() => navigate('/tracker')}>
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M112 320c0-93 124-165 96-272 66 0 192 96 192 272a144 144 0 0 1-288 0z" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 368c0 57.71-32 80-64 80s-64-22.29-64-80 40-86 32-128c42 0 96 70.29 96 128z" />
              </svg>
              <p class="text-base leading-4">Calorie Tracker</p>
            </button>

            {/* Workout Plan List Item */}
            <button class="focus:outline-none dark:text-white flex justify-start items-center space-x-6 hover:text-white focus:bg-sky-500 focus:text-white hover:bg-sky-500 text-gray-600 rounded py-3 pl-4 w-full" onClick={() => navigate('/workout-planner')}>
              <svg width="24" height="24" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M48 256h416" /><rect width="32" height="256" x="384" y="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" rx="16" ry="16" /><rect width="32" height="256" x="96" y="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" rx="16" ry="16" /><rect width="16" height="128" x="32" y="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" rx="8" ry="8" /><rect width="16" height="128" x="464" y="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" rx="8" ry="8" />
              </svg>
              <p class="text-base leading-4">Workout Plan</p>
            </button>

            {/* Journal List Item */}
            <button class="flex dark:text-white justify-start items-center space-x-6 hover:text-white focus:outline-none focus:bg-sky-500 focus:text-white hover:bg-sky-500 text-gray-600 rounded py-3 pl-4 w-full" onClick={() => navigate('/journal-entry')}>
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M364.13 125.25 87 403l-23 45 44.99-23 277.76-277.13-22.62-22.62zm56.56-56.56-22.62 22.62 22.62 22.63 22.62-22.63a16 16 0 0 0 0-22.62h0a16 16 0 0 0-22.62 0z" />
              </svg>
              <p class="text-base leading-4">Journal</p>
            </button>

            {/* Divider */}
            <div class="w-full px-4">
              <hr class="border-gray-100 dark:border-gray-700  w-full" />
            </div>
            {/* Sign-out */}
            <button class="flex dark:text-white justify-start items-center space-x-6 hover:text-white focus:outline-none focus:bg-sky-500 focus:text-white hover:bg-sky-500 text-gray-600 rounded py-3 pl-4 w-full" onClick={() => logoutOfApp()}>
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40m64 160 80-80-80-80m-192 80h256" />
              </svg>
              <p class="text-base leading-4">Sign-Out</p>
            </button>
          </div>



        </div>
      </div>

      {/* Start of Cards*/}



      <div class="col-span-2">
        {/* Start of Welcome Title & Image */}
        <div >
          {/* Start of Welcome Title & Image */}
          <div>
            <header class=" font-bold text-4xl inline-block mt-8 flex justify-center text-transparent bg-clip-text bg-gradient-to-r to-orange-500 from-slate-50	ml-20">
              <img class="rounded-full inline-block gap-x-2 h-12 justify-right" src={user.thumbnail} alt="avatar" />
              <div class="ml-6">
              <div class ="font-bold text-4xl text-black">Welcome, </div>{user.name}!
              </div>
            </header>
          </div>

          {/* <div class="grid grid-rows-4 grid-flow-col gap-4gap-x-5 justify-center mx-auto mb-5"> */}
          <div>

          <div className='flex justify-center'>
            {/* <svg className="flex-shrink-0"></svg> */}

            {/* CALORIE INTAKE */}
            <div class="mt-8 mr-2 sm:mx-auto sm:w-full sm:max-w-md  px-10 py-12 rounded-md shadow-lg bg-gradient-to-br from-sky-600 from-10%  via-sky-400 to-sky-100 to-40% ...">
              <div class="font-bold text-xl mb-2 hover:text-orange-500">Calorie Intake</div>
              <p class="text-gray-700 text-base font-bold ">
                Today, you have eaten:
              </p>
              <p className='text-gray-700 text-base font-bold text-orange-500 mt-4 ml-10'>
                {ateTotal}
              </p>
            </div>

            {/* CALORIES BURNED */}
            <div class="mt-8 ml-2 sm:w-full sm:max-w-md  px-10 py-12 rounded-md shadow-lg bg-gradient-to-bl from-sky-600 from-10%  via-sky-400 to-sky-100 to-40% ...">
              <div class="font-bold text-xl mb-2 hover:text-orange-500">Calories Burned</div>
              <p class="text-gray-700 text-base font-bold">
                Today, you have burned:
              </p>
              <p className='text-gray-700 text-base font-bold text-orange-500 mt-4 ml-20'>
                {dailyBurn} calories
              </p>
            </div>
          </div>

          <div className='flex justify-center'>
            {/* <svg className="flex-shrink-0"></svg> */}

            {/* JOURNAL */}
            <div className="mt-8 mr-2 sm:mx-auto sm:w-full sm:max-w-md  px-10 py-12 rounded-md shadow-lg bg-gradient-to-tr from-sky-600 from-10%  via-sky-400 to-sky-100 to-40% ...">
              {/* <div className="px-10 py-7 space-x-3"> */}
              <div className="font-bold text-xl mb-2 inline-block hover:text-orange-500">Daily Journal Entry</div>

              {icon}

              <p className="text-gray-700 text-base font-bold">
                <span>
                  {journalMessage}</span>
              </p>
            </div>

            {/* WORKOUT PLANNER */}
            <div class="mt-8 ml-2  sm:w-full sm:max-w-md  px-10 py-12 rounded-md shadow-lg bg-gradient-to-tl from-sky-600 from-10%  via-sky-400 to-sky-100 to-40% ...">
              <div class="font-bold text-xl mb-2 hover:text-orange-500 inline-block">Workout Planner</div>
              {workoutIcon}
              <p class="text-gray-700 text-base font-bold">
                {/* {dailyWorkout} */}
              </p>
            </div>
          </div>


        </div>
      </div>
      </div>

    </div>



  )
}

export default Home;
//{dailyWorkout}