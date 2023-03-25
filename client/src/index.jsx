import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './MainPage/App.jsx';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
);
