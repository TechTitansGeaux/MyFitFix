import React from 'react';
import '../style.css';

function Login() {

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md pt-40">
      <div className="bg-gradient-to-t from-sky-600 from-10%  via-sky-400 to-sky-50 to-40% py-8 shadow rounded-lg sm:px10 drop-shadow-md">
        <div>
          <img className="mt-10" src="https://cdn.discordapp.com/attachments/187823430295355392/1091709350189473903/FitFix-PhotoRoom.png"></img>
          <div className="mt-10 mb-10 text-3xl">
            <h1 className="flex justify-center">Neil-the-Mippy's</h1>
            <h1 className="flex justify-center">Workout Extravaganza</h1>
          </div>
          <div className="flex justify-center">
            <a className="flex justify-center p-3 shadow rounded-lg bg-white hover:bg-orange-500" href="/auth/google">
              <img className="w-6 h-6" src="https://cdn.discordapp.com/attachments/187823430295355392/1091525978490155068/GoogleLogo.png" />
              <a className="font-medium">Sign In</a>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
