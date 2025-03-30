import React from "react";
import Papa from "papaparse";

const CSVUploader = ({ setCsvData }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true, // Convert CSV to JSON with headers as keys
      skipEmptyLines: true,
      complete: (result) => {
        setCsvData(result.data);
      },
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};

export default CSVUploader;
