import React from "react";
import "../css/OnLoadSpinner.css";

function OnLoadSpinner() {
  return (
    <div>
      <div className="spinner-container">
        <svg className="spinner" role="alert" aria-live="assertive">
          <circle cx="30" cy="30" r="20" className="circle" />
        </svg>
      </div>
    </div>
  );
}

export default OnLoadSpinner;
