import React from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const predefinedQueries = [
  { label: "Select All", query: "SELECT * FROM data;" },
  { label: "Select Name & Age", query: "SELECT name, age FROM data;" },
  { label: "Filter Age > 30", query: "SELECT * FROM data WHERE age > 30;" },
  { label: "Sort by Age", query: "SELECT * FROM data ORDER BY age DESC;" },
  { label: "Limit Results", query: "SELECT * FROM data LIMIT 5;" },
];

const QuerySelector = ({ setQuery }) => {
  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>Select a Query</InputLabel>
      <Select onChange={(e) => setQuery(e.target.value)}>
        {predefinedQueries.map((option, index) => (
          <MenuItem key={index} value={option.query}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default QuerySelector;
