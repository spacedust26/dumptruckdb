import React, { useState } from "react";
import { Box, Button, TextareaAutosize, Typography, Paper, Select, MenuItem, Divider } from "@mui/material";

const QueryManager = ({ onExecute, tableName }) => {
  const [query, setQuery] = useState(""); 
  const [selectedQuery, setSelectedQuery] = useState(""); 
  const [isEditorActive, setIsEditorActive] = useState(true);

  const predefinedQueries = [
    { label: "View All Data", value: `SELECT * FROM ${tableName}` },
    { label: "Count Rows", value: `SELECT COUNT(*) FROM ${tableName}` },
    { label: "View First 5 Rows", value: `SELECT * FROM ${tableName} LIMIT 5` },
  ];

  const handleEditorChange = (e) => {
    setQuery(e.target.value);
    setIsEditorActive(true); 
    setSelectedQuery(""); 
  };

  const handleEditorClick = () => {
    setIsEditorActive(true); 
    setSelectedQuery(""); 
  };

  const handleQuerySelect = (e) => {
    const selectedQuery = e.target.value;
    setQuery(selectedQuery);
    setSelectedQuery(selectedQuery);
    setIsEditorActive(false); 
    onExecute(selectedQuery); 
  };

  return (
    <Paper elevation={3} sx={{
      backgroundColor: "#0F2027",
      color: "white", 
      fontWeight: 600,
      padding: "0.8rem 1.5rem",
      fontSize: "1rem", 
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <Typography variant="h5" gutterBottom sx={{
            color: "#9ebdcb", 
            fontWeight: 600,
            fontSize: "1.2rem", 
          }}>
        Manage Your Queries
      </Typography>

      <Select
        value={selectedQuery}
        onChange={handleQuerySelect}
        displayEmpty
        sx={{ width: "100%", mb: 2, backgroundColor: "#203A43", color: "white" }}
      >
        <MenuItem value="">Choose a Predefined Query</MenuItem>
        {predefinedQueries.map((query, index) => (
          <MenuItem key={index} value={query.value}>
            {query.label}
          </MenuItem>
        ))}
      </Select>

      <Divider sx={{ my: 2, color: "white" }}>OR</Divider>

      <TextareaAutosize
        minRows={5}
        value={query}
        onChange={handleEditorChange}
        onClick={handleEditorClick}
        placeholder="Type your SQL query here..."
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "1rem",
          fontFamily: "monospace",
          backgroundColor: isEditorActive ? "#203A43" : "#0F2027",
          color: "#ffffff",
          border: "1px solid #2C5364",
          borderRadius: "5px",
        }}
      />

      <Box mt={2}>
        <Button
          variant="contained"
          onClick={() => onExecute(query)}
          sx={{
            backgroundColor: "#2C5364",
            transition: "0.3s", 
            boxShadow: "none", 
            fontWeight: 500,
            "&:hover": { 
              backgroundColor: "#2C5364", 
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.9)" 
            }
          }}
          disabled={!query.trim()}
        >
          Run Query
        </Button>
      </Box>
    </Paper>
  );
};

export default QueryManager;
