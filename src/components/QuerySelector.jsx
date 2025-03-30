import React from "react";

const QuerySelector = ({ onSelect }) => {
  const predefinedQueries = [
    { label: "View All Data", value: "SELECT * FROM table_name" },
    { label: "Count Rows", value: "SELECT COUNT(*) FROM table_name" },
    { label: "View First 5 Rows", value: "SELECT * FROM table_name LIMIT 5" },
  ];

  const handleQueryChange = (e) => {
    onSelect(e.target.value);
  };

  return (
    <div>
      <h3>Select Query</h3>
      <select onChange={handleQueryChange}>
        <option value="">-- Choose a Query --</option>
        {predefinedQueries.map((query, index) => (
          <option key={index} value={query.value}>
            {query.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QuerySelector;
