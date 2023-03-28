import React, {useState} from 'react';
import axios from 'axios';

function JournalEntry () {

  //----REACT HOOKS: SETTING STATE-----

  //Creating a state property named 'date' that is changed through our function setDate, when a user clicks a specific date on calendar
      const [date, setDate] = useState(''); 

  //Creating a state property named 'entry' that is changed through our function setEntry, when a user types their journal entr
      const [entry, setEntry] = useState('');


  //------FUNCTIONS: CHANGE HANDLERS-----

  const handleDateChange = (e) => {
    setDate(e.target.value);
  }
  
  const handleEntryChange = (e) => {
    setEntry(e.target.value);
  }

  //This function will load a previous journal entry from the DB 
  const showEntry = (e) => {

  }

   //------FUNCTIONS: CLIENT-SIDE AXIOS REQUESTS-----
  const submitJournalEntry = ()  => {axios.post('/journal-entry', {entry: entry, date: date})
   .then((response) => console.log('This journal was submitted:', response))
   .catch((err) => console.error('err'));
}

    return (
        <div>

    <h1>Write Your Journal Entry Here</h1>
 <br></br>
    <label htmlFor="start">Journal Entry Date:</label>
          <input type="date" 
                  id="start" 
                  name="journal-start"
                min="2023-01-01" 
                max="2026-01-01"
                onChange={handleDateChange}>
                </input>

                <form>
              <label htmlFor="multiLineInput">
                <textarea rows="30" 
                cols="80" 
                id="multiLineInput" 
                //value={showEntry}
                onChange={handleEntryChange}>
                </textarea>
              </label> 

              <br></br>
     <input type="button" value="Save Entry" onClick={submitJournalEntry} />
   </form>
     
       </div>
    )
}

export default JournalEntry;