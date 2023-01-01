import React from "react";

import "./Loading.css";

const Loading = ({ fixed }) => {
  console.log(fixed);
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <div className={"spinner-container" + (fixed ? " loading " : "")}>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default Loading;
