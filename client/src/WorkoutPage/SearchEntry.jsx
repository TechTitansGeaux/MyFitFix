import React from "react";


function SearchEntry( {search} ){

  return (
    <div className="search-data">
    <ul className="result-data">{search.name}
    <li className="result-data">{search.type}</li>
    <li className="result-data">{search.muscle}</li>
    <li className="result-data">{search.equipment}</li>
    <li className="result-data">{search.difficulty}</li>
    <li className="result-data">{search.instructions}</li>
    </ul>
    </div>
  )
};

export default SearchEntry;