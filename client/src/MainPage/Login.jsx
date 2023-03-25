// import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <>
      <header style={{ textAlign: "center" }}>
        <h1>Welcome to My Fit Fix</h1>
      </header>
      <main style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        <Link to="/login">
          Log In
        </Link>
      </main>
    </>
  )
}

export default Login;
