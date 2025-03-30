import React, { useState } from "react";

const QueryEditor = ({ onExecute }) => {
  const [query, setQuery] = useState("SELECT * FROM sqlite_master;");

  return (
    <div>
      <h3>SQL Query Editor</h3>
      <textarea
        rows="5"
        cols="50"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <br />
      <button onClick={() => onExecute(query)}>Run Query</button>
    </div>
  );
};

export default QueryEditor;
