import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";


const Goals = ({ user, ateTotal, dailyBurn, dailyWorkout }) => {
    // Navigate to Home page
    const navigate = useNavigate();
  return (
    <div className="alert alert-dismissible fade show fixed bottom-0 right-0 left-0 z-[1030] w-full items-center justify-between bg-neutral-900 py-4 px-6 text-center text-white">
      <div className="flex-hori center-content-hori">
        <div className="margin-hori-sm">
          Total Calories Burned: <span>DYNAMIC SUM</span>
        </div>
        <div className="margin-hori-sm">
          Total Pounds Lost: <span>DYNAMIC SUM</span>
        </div>
        <button className="margin-hori-sm" onClick={() => navigate("/home")}>
          See Total Progress
        </button>
      </div>
    </div>
  );
}

export default Goals;
