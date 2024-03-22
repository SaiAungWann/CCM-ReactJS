import React from "react";
import "./model.css";
import ReactDom from "react-dom";

export default function Model({ children, danger = true, setShowModel }) {
  let className = danger ? "border-red" : "border-blue";

  return ReactDom.createPortal(
    <div className="model_bcakdrop">
      <div className={`model ${className}`}>
        {children}
        {/* <button onClick={() => setShowModel(false)}>Close Model</button> */}
      </div>
      ;
    </div>,
    document.getElementById("model")
  );
}
