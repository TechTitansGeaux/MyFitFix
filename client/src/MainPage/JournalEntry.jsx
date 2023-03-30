import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function JournalEntry () {
  // Creating variable 'navigate' to re-direct to other pages through react-routing
  const navigate = useNavigate();

  //----REACT HOOKS: SETTING STATE-----

  // Creating a state variable named 'date' that is changed through our function setDate, when a user clicks a specific date on calendar
      const [date, setDate] = useState(''); 

  // Creating a state variable named 'entry' that is changed through our function setEntry, when a user types in their journal entry
      const [entry, setEntry] = useState('');

  // Creating a state variable named 'entryBox'that is changed through our function setEntryBox, that retrieves the journal entry that matches the users' date that they clicked
      const [entryBox, setEntryBox] = useState('')


   //------FUNCTIONS: CLIENT-SIDE AXIOS REQUESTS-----

   // This function retrieves the current user's google ID

   const currentUser = () => {
    axios.get('auth/google/redirect')
      .then((res) => { console.log(res)})
   }

  // This function loads a previous journal entry from the DB into the current textbox 
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

  // This function submits a journal entry to the DB
  const submitJournalEntry = ()  => {
    // Alerting a user that they have successfully submitted a journal entry 
     alert(`You have submitted your journal entry for the date: ${date}`); 

     // Sending an axios POST request to submit the journal entry 
    axios.post('/journal-entry', {entry: entry, date: date})
   .then((response) => console.log('This journal was submitted:', response))
   .catch((err) => console.error('err'));
}

    // This function deletes a journal entry in the DB 
    const deleteEntry = () => {
      // Alerting a user, to make sure they want to delete this current entry 
      confirm('Are you sure you want to delete this journal entry?')

      // Sending an AXIOS delete request to delete the selected entry 
      axios.delete(`/journal-entry/${date}`)
        .then(() => console.log('The selected journal entry was deleted.'))
        .catch(() => console.log('We were not able to delete your journal entry. Try again.'))
    }


      //------FUNCTIONS: MISC -----

   // This function alerts the user to select a date before typing in the text box 
   const selectDate = () => {
    //If no date is selected, alert user to select a date, before continuing 
    if (date === '') {
      alert('Please select a date, before typing journal entry.')
    }
 }

 useEffect(() => {
  currentUser(); 
 })

    
    return (
        <div>
    <h1>Write Your Journal Entry Here</h1>
 <div className="home-button">
        <button id="goHome-btn" onClick={() =>  navigate('/home')}>Back to Dashboard</button>
        <button id="delete-btn" onClick={() => {deleteEntry(); setEntryBox('')}}>Delete Entry</button>
      </div>
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
                onChange={(e) => {setEntry(e.target.value); setEntryBox(e.target.value);}}
                onClick={selectDate}>
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