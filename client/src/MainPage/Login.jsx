import { useEffect } from 'react';
import React from 'react';
// import { Link } from 'react-router-dom';

function Login() {

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token:", response.credential)
  }

  useEffect(() => {
    /* global google */
    console.log(google);
    google.accounts.id.initialize({
      client_id: "878530699205-du9u24dirbogfho5eir32e4en2av93sc.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })
    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: "outline", size: "large" }
    )
  }, [])

  return (
    <>
      <header style={{ textAlign: "center" }}>
        <h1>Welcome to My Fit Fix</h1>
      </header>
      <main style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        <div id='signInDiv'></div>
      </main>
    </>
  )
}

export default Login;
