import React from 'react';

const Quote = (props) => {
  // console.log(props.quote.quote);
  return (
    <div>
      <div>{props.quote.quote}</div>
      <br></br>
    </div>
  )
}

export default Quote;
