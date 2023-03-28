import React, {useState, useEffect} from 'react';
import axios from 'axios';

function JournalEntry () {

  //----REACT HOOKS: SETTING STATE-----

  // Creating a state property named 'date' that is changed through our function setDate, when a user clicks a specific date on calendar
      const [date, setDate] = useState(''); 

  // Creating a state property named 'entry' that is changed through our function setEntry, when a user types in their journal entry
      const [entry, setEntry] = useState('');

  // Creating a state property named 'entryBox'that is changed through our function setEntryBox, that retrieves the journal entry that matches the users' date that they clicked
      const [entryBox, setEntryBox] = useState('')


   //------FUNCTIONS: CLIENT-SIDE AXIOS REQUESTS-----

  // This function will load a previous journal entry from the DB into the current textbox where the user can update a previous entry
  const showEntry = (date) => {
    axios.get(`/journal-entry/${date}`)
    .then(({ data }) => {
      if ({ data }) {
        // If there is a journal entry in the DB, matching the choice of date that the user clicked, display that text
        setEntryBox(data[0].entry)
      } else {
        setEntryBox('')
      }
    })
    .catch((err) => {
      // If there is NO journal entry in the DB, matching the choice of date that the user click, the text box should be empty
      setEntryBox(''); 
      console.error(`There is no stored journal entry for ${date} in the DB. `);
    })
  }

  // This function will submit a journal entry to the DB
  const submitJournalEntry = ()  => {
    // Alerting a user that they have successfully submitted a journal entry 
     alert(`You have submitted your journal entry for the date: ${date}`); 

    axios.post('/journal-entry', {entry: entry, date: date})
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
                onChange={(e) => {setDate(e.target.value); showEntry(e.target.value);}}>
                </input>
                <form>
              <label htmlFor="multiLineInput">
                <textarea rows="30" 
                cols="80" 
                id="multiLineInput" 
                name="entryBox"
                value={entryBox}
                onChange={(e) => {setEntry(e.target.value); setEntryBox(e.target.value);}}>
                </textarea>
              </label> 

              <br></br>
     <input type="button" 
     value="Save Entry" 
     onClick={submitJournalEntry} />
   </form>
     
       </div>
    )
}

export default JournalEntry;