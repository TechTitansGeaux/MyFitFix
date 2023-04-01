<div className='flex justify-center'>
<svg className="flex-shrink-0"></svg>
          {/* JOURNAL */}
          <div className="max-w-sm rounded overflow-hidden shadow-lg rounded-lg ">
            <div className="px-10 py-7 space-x-3">
              <div className="font-bold text-xl mb-2 inline-block">Daily Journal Entry</div>
              <button type="button" onClick={() => navigate('/journal-entry')} className=" inline-block text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-2 py-0.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 rounded-full">+</button>

              <p className="text-gray-700 text-base">
                <span>{icon}
                {journalMessage}</span>
              </p>
            {/* </div> */}
          </div>
          {/* WORKOUT PLANNER */}
          <div class="mt-8 ml-2  sm:w-full sm:max-w-md  px-10 py-12 bg-gradient-to-tl from-sky-600 from-10%  via-sky-400 to-sky-100 to-40% ...">
            {/* <div class="px-14 py-14"> */}
              <div class="font-bold text-xl mb-2">Workout Planner</div>
              <p class="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
              </p>
            {/* </div> */}
          </div>
          </div>

           // // Implementing useEffect to send a GET request to retrieve the current signed-in user's name
  // axios.get('/dashboard/name')
  //   .then(({ data }) => { setName(data.name); setImage(data.thumbnail); })
  //   .catch((err) => { console.err(err) });

  //   // Implementing useEffect to send a GET request to check if the current signed-in user's daily entry was completed
  // axios.get(`/journal-entry/${todaysDate}`)
  //   .then(({ data }) => {
  //       if ({ data }) {
  //         setJournalMessage('All done. You have submitted your journal entry for today.')
  //         setIcon(<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
  //         <path fill="#c8e6c9" d="M44 24c0 11.045-8.955 20-20 20S4 35.045 4 24 12.955 4 24 4s20 8.955 20 20z"/>
  //         <path fill="#4caf50" d="m34.586 14.586-13.57 13.586-5.602-5.586-2.828 2.828 8.434 8.414 16.395-16.414-2.829-2.828z"/>
  //         </svg>)
  //       } else {
  //         setJournalMessage('You have not completed a journal entry for today')
  //       }
  // })
  //   .catch((err) => console.log(err, 'Request failed'));
  // })