import React from "react";

function ClearButton({ clearComplete }) {
  return (
    <button
      className="button"
      onClick={() => {
        clearComplete();
      }}
    >
      Clear completed
    </button>
  );
}

export default ClearButton;
