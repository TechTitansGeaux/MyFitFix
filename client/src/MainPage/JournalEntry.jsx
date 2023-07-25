import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function JournalEntry() {
  // Creating variable 'navigate' to re-direct to other pages through react-routing
  const navigate = useNavigate();

  //----REACT HOOKS: SETTING STATE-----

  // Creating a state variable named 'date' that is changed through our function setDate, when a user clicks a specific date on calendar
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));  // Using moment, the initial date of the calendar would be the date of today

  // Creating a state variable named 'entry' that is changed through our function setEntry, when a user types in their journal entry
  const [entry, setEntry] = useState('');

  // Creating a state variable named 'entryBox'that is changed through our function setEntryBox, that retrieves the journal entry that matches the users' date that they clicked
  const [entryBox, setEntryBox] = useState('')


  //------FUNCTIONS: CLIENT-SIDE AXIOS REQUESTS-----

  // This function retrieves the current user's google ID


  // This function loads a previous journal entry from the DB into the current textbox
  const showEntry = (date) => {
    axios.get(`/journal-entry/${date}`)
      .then(({ data }) => {
        if ({ data }) {
          // If there is a journal entry in the DB, matching the choice of date that the user clicked, display that text
          setEntryBox(data[0].entry)
        }
      })
      .catch((err) => {
        // If there is NO journal entry in the DB, matching the choice of date that the user click, the text box should be empty
        setEntryBox('');
        console.error(`There is no stored journal entry for ${date} in the DB. `);
      })
  }

  // This function submits a journal entry to the DB
  const submitJournalEntry = () => {
    // Alerting a user that they have successfully submitted a journal entry
    alert(`You have submitted your journal entry for the date: ${date}`);

    // Sending an axios POST request to submit the journal entry
    axios.post('/journal-entry', { entry: entry, date: date })
      .then((response) => console.log('This journal was submitted:', response))
      .catch((err) => console.error('err'));
  }

  // This function deletes a journal entry in the DB
  const deleteEntry = () => {
    // Alerting a user, to make sure they want to delete this current entry
    if (confirm('Are you sure you want to delete this journal entry?')) {
      // Sending an AXIOS delete request to delete the selected entry
      axios.delete(`/journal-entry/${date}`)
        .then(() => console.log('The selected journal entry was deleted.'))
        .catch(() => console.log('We were not able to delete your journal entry. Try again.'))
      //This will only fire if the person clicks 'delete'
      setEntryBox('')

    } else {
      //Nothing will occur if the user clicks 'cancel'
      console.log('Entry was cancelled from being deleted.')
    }


  }


  //------FUNCTIONS: MISC -----

  // This function alerts the user to select a date before typing in the text box
  const selectDate = () => {
    //If no date is selected, alert user to select a date, before continuing
    if (date === '') {
      alert('Please select a date, before typing journal entry.')
    }
  }

  useEffect((e) => {
    if (date === moment().format("YYYY-MM-DD")) {
      showEntry(date);
    }
  }, [])

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

            {/* Quote List Item */}
            <button class="flex dark:text-white justify-start items-center space-x-6 hover:text-white focus:outline-none focus:bg-sky-500 focus:text-white hover:bg-sky-500 text-gray-600 rounded py-3 pl-4 w-full" onClick={() => navigate('/quotes')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/></svg>
            <p class="text-base leading-4">Quotes</p>
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
      {/* END NAV BAR */}

      <div class="ml-52">
        {/* START JOURNAL COMPONENT */}
        <div className='mt-20 ml-100 sm:w-full  '>

          {/* Placing Calendar and Trash box in columns */}

          <div className='flex justify-right ml-20'>
            {/* <div class ="grid grid-cols-2">  */}
            {/* CALENDAR */}

            <ul class="flex bg-white border-solid border border-stone-300">
              <li class="flex-1 border-solid border border-stone-300">
                <div name="calendar">
                  <input type="date"
                    id="start"
                    name="journal-start"
                    min="2023-01-01"
                    max="2026-01-01"
                    value={date}
                    class="text-xl h-full ml-3 mr-3 cursor-pointer"
                    onChange={(e) => { setDate(e.target.value); showEntry(e.target.value); }}>
                  </input>
                </div>
              </li>
              <li class="flex-1 border-solid border border-stone-300 ">
                <div>

                  {/* Delete Button */}
                  <button class="inline-flex items-center justify-right w-9 h-9 mr-10 ml-10 text-gray-700 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-gray-200" onClick={() => { deleteEntry(); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" width="24" height="24" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="m112 112 20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" /><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" /><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40m-64 64v224m-72-224 8 224m136-224-8 224" /></svg>
                  </button>
                </div>
              </li>
            </ul>





            {/* </div> */}

          </div>
          <br></br>

          {/* Message Box */}
          <div name="messageBox" className='flex justify-right ml-20'>
            <form>
              <label htmlFor="multiLineInput">
                <textarea rows="15"
                  cols="70"
                  class=" shadow-2xl block p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="entryBox"
                  value={entryBox}
                  onChange={(e) => { setEntry(e.target.value); setEntryBox(e.target.value); }}
                  onClick={selectDate}
                  placeholder="Write your thoughts here...">
                </textarea>
              </label>

              <br></br>

              <button class="shadow-2xl text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={(e) => { submitJournalEntry(); e.preventDefault(); }}>
                <svg width="15" height="20" xmlns="http://www.w3.org/2000/svg" class="inline-block" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M380.93 57.37A32 32 0 0 0 358.3 48H94.22A46.21 46.21 0 0 0 48 94.22v323.56A46.21 46.21 0 0 0 94.22 464h323.56A46.36 46.36 0 0 0 464 417.78V153.7a32 32 0 0 0-9.37-22.63zM256 416a64 64 0 1 1 64-64 63.92 63.92 0 0 1-64 64zm48-224H112a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h192a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16z" /></svg>
                <span class="inline-block ml-3">Save Entry</span>
              </button>
            </form>
          </div>

        </div>
      </div>


    </div>
  )
}

export default JournalEntry;