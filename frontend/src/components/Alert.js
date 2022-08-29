import React from "react";

function Alert({ alertType, message }) {
  return (
    <div
      className={`alert alert-${alertType} alert-dismissible fade show mb-4`}
      role="alert"
    >
      {message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}

export default Alert;
