import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './MainPage/App.jsx';


const root = createRoot(document.getElementById('app'));
root.render(
  <GoogleOAuthProvider clientId="878530699205-du9u24dirbogfho5eir32e4en2av93sc.apps.googleusercontent.com">
    <Router>
      <App />
    </Router>
  </GoogleOAuthProvider>
);
