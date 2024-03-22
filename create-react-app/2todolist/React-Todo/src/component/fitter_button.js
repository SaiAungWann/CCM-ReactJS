import React, { useState, useEffect } from "react";

function FitterButton({ filterBy }) {
  let [filter, setFilter] = useState("All");

  useEffect(() => {
    filterBy(filter);
  }, [filter, filterBy]);

  return (
    <div>
      <button
        className={`button filter-button ${filter === "All" ? "filter-button-active" : ""}`}
        onClick={() => setFilter("All")}
      >
        All
      </button>
      <button
        className={`button filter-button ${filter === "Active" ? "filter-button-active" : ""}`}
        onClick={() => setFilter("Active")}
      >
        Active
      </button>
      <button
        className={`button filter-button ${filter === "Complete" ? "filter-button-active" : ""}`}
        onClick={() => setFilter("Complete")}
      >
        Complete
      </button>
    </div>
  );
}

export default FitterButton;
