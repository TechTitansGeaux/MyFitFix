import React from 'react';
import '../style.css';

function Login() {

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md pt-40">
      <div className="bg-gradient-to-t from-sky-600 from-10% via-sky-400 to-sky-50 to-40% py-12 px-6 shadow rounded-lg sm:px-10 drop-shadow-md ml-4">
        <img src="https://cdn.discordapp.com/attachments/1089609978857398383/1091520633961205770/FitFix-PhotoRoom.png"></img>
        <h1 className="mt-10 mb-10">Neil-the-Mippy's Nutrition Tracker and Workout Extravaganza</h1>
        <div>
          <img src=""></img>
          <a className="shadow-md p-2 text-center" href="/auth/google">Google</a>
        </div>
      </div>
    </div>
  )

}

export default Login;
