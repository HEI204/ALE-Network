import React from "react";

import "./Loading.css";

const Loading = () => {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default Loading;
