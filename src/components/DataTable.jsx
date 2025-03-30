import React from "react";

const DataTable = ({ data }) => {
  if (!data.columns.length) return <p>No results</p>;

  return (
    <table border="1">
      <thead>
        <tr>
          {data.columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.values.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
