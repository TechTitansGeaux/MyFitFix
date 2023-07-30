import React from 'react';

const Quote = (props) => {
  // console.log(props.quote);
  return (
    <div>
      <div className="bg-sky-50 rounded-lg drop-shadow-md">
        <div className="text-lg text-sky-500 pt-4 mb-2 pb-4">
          {props.quote.quote}
        </div>
        <button style={{marginBottom: '10px'}} type="button" className='w-fit bg-slate-400 border-sky-300 rounded-lg shadow-lg hover:bg-orange-500 active:bg-orange-900 font-bold tracking-wider active:text-white transform hover:scale-110 px-1 ml-4 mr-4' onClick={() => { props.deleteQuote(props.quote._id) }} >delete</button>
      </div>
      <br></br>
    </div>
  )
}

export default Quote;
