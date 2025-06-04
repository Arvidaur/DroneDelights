import React from "react";

function FilterButton({ onClick, children, active }) {
  return (
    <button
      className={`filter-button${active ? " active" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default FilterButton;
