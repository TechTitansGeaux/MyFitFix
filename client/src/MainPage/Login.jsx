import { useEffect, useState } from 'react';
import React from 'react';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';

function Login() {

  // This is the user's info when they log in
  const [user, setUser] = useState({});

  //This will handle the response that the Auth request in the initialize will handle the info
  const handleCallbackResponse = (response) => {
    const userObject = jwt_decode(response.credential);
    setUser(userObject);
    document.getElementById('signInDiv').hidden = true;
    document.getElementById('dashButton').hidden = false;

  }

  //This will handle the sign out functionality
  const handleSignOut = (event) => {
    setUser({});
    document.getElementById('signInDiv').hidden = false;
  }

  // Google Auth Sign-in process
  useEffect(() => {
    /* global google */

    // Initializes the Google Account on render
    google.accounts.id.initialize({
      client_id: "878530699205-du9u24dirbogfho5eir32e4en2av93sc.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    // This is the button that will log in the user and print their profile pic and username to the website
    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: "outline", size: "large" }
    )

    // This helps with remembering accounts that you have that will ask you if you want to sign in with them
    google.accounts.id.prompt();
  }, [])

  return (
    <>
      <header style={{ textAlign: "center" }}>
        <h1>Welcome to My Fit Fix</h1>
      </header>
      <main style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        <div id='signInDiv'></div>
        {Object.keys(user).length != 0 &&
          < button onClick={(e) => handleSignOut(e)}>Sign Out</button>
        }
        {user &&
          <div>
            <img src={user.picture}></img>
            <h3>{user.name}</h3>
          </div>
        }
        <Link to="/dashboard" user={user}>
          <button id="dashButton" hidden>Got to Dashboard</button>
        </Link>
      </main>
    </>
  )
}

export default Login;
