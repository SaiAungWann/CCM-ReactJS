import React from "react";
import "./navBar.css";

export default function navBar({ setShowModel }) {
  return (
    <nav>
      <div className="container ">
        <h1>Logo</h1>
        <ul>
          <li>Home</li>
          <li>List</li>
          <li>About Us</li>
          <li onClick={() => setShowModel(true)}>Show Model</li>
        </ul>
      </div>
    </nav>
  );
}
