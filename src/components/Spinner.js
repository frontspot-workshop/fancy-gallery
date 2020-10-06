import React from "react";

export default function Spinner() {
  return (
    <div className="spinner">
      <div className="spinner__square"></div>
      <h6 className="spinner__text">Loading...</h6>
    </div>
  );
}
