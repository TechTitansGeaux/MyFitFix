import React from "react";


function SearchEntry( {exerciseData} ){

  return (
    <div className="search-data">
    <ul className="result-data">{exerciseData.name}
    <li className="result-data">{exerciseData.type}</li>
    <li className="result-data">{exerciseData.muscle}</li>
    <li className="result-data">{exerciseData.equipment}</li>
    <li className="result-data">{exerciseData.difficulty}</li>
    <li className="result-data">{exerciseData.instructions}</li>
    </ul>
    </div>
  )
};

export default SearchEntry;