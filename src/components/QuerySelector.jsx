import React from "react";

const QuerySelector = ({ tables, onSelect }) => {
  return (
    <div>
      <h3>Select Table</h3>
      <select onChange={(e) => onSelect(e.target.value)}>
        {tables.map((table, index) => (
          <option key={index} value={table}>
            {table}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QuerySelector;
