import React, { useState } from "react";
import { Button, Typography, Box, Alert } from "@mui/material";
<script src="https://cdn.lordicon.com/lordicon.js"></script>

const CSVUploader = ({ onUpload }) => {
  const [fileName, setFileName] = useState(""); 
  const [error, setError] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      setError("Please upload a valid CSV file.");
      setFileName("");
      return;
    }
    setError(""); 
    setFileName(file.name); 

    // Read and upload CSV data
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      onUpload(file.name, text);
    };
    reader.readAsText(file);
  };

  return (
    <Box textAlign="center" p={2}>
      <input
        accept=".csv"
        id="csv-upload"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
      <label htmlFor="csv-upload">
        <Button
          variant="contained"
          component="span"
          sx={{
            backgroundColor: "#0F2027",
            color: "white", 
            fontWeight: 600,
            padding: "0.8rem 1.5rem",
            fontSize: "1rem", 
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Upload CSV File
        </Button>
      </label>

      {fileName && (
        <Typography mt={1} color = "#5c8192">
          Selected File : {fileName}
        </Typography>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default CSVUploader;
