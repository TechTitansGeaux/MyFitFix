import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './MainPage/App.jsx';


const root = createRoot(document.getElementById('app'));
root.render(
  <Router>
    <App />
  </Router>
);
