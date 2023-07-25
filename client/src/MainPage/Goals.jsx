import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";


const Goals = ({ user, ateTotal, dailyBurn, dailyWorkout }) => {
    // Navigate to Home page
    const navigate = useNavigate();
  return (
    <div className="alert alert-dismissible fade show fixed bottom-0 right-0 left-0 z-[1030] w-full items-center justify-between bg-neutral-900 py-4 px-6 text-center text-white">
      <div className="flex-hori center-content">
        <div className="margin-hori-sm">
          Total Calories Burned:{" "}
          <span className="text-amber-500 font-semibold">DYNAMIC SUM</span>
        </div>
        <div className="margin-hori-sm">
          Total Pounds Lost:{" "}
          <span className="text-amber-500 font-semibold">DYNAMIC SUM</span>
        </div>
        <button
          className="margin-hori-sm py-2 focus:outline-none dark:text-white justify-start hover:text-white focus:bg-sky-500 bg-amber-600	 focus:text-white hover:bg-sky-500 text-white rounded items-center space-x-6 w-48 min-h-max"
          onClick={() => navigate("/home")}
        >
          See Progress Stats
        </button>
      </div>
    </div>
  );
}

export default Goals;
