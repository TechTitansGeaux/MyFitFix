import React from 'react';
// import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';

function App() {



  return (
    <Routes>
      <Route path='/' element={<Login />} />
    </Routes>
  )
}
export default App;