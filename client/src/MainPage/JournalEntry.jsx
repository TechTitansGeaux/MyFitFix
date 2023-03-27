import React, {useState} from 'react';

function JournalEntry () {

    const [date, setDate] = useState(0); 
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
       onChange={(e) => console.log('This is the selected users journal entry date:', e.target.value)}>
       </input>

       <form>
     <label htmlFor="multiLineInput">
       <textarea rows="30" cols="80" id="multiLineInput" onChange={(e) => console.log(e.target.value)}></textarea>
     </label> 
     <br></br>

     <input type="button" value="Save Entry" />

   </form>
     
       </div>
    )
}

export default JournalEntry;