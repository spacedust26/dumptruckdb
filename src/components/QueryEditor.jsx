import React from "react";
import { TextField } from "@mui/material";

const QueryEditor = ({ query, setQuery }) => {
  return (
    <TextField
      label="SQL Query"
      variant="outlined"
      fullWidth
      multiline
      rows={3}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      sx={{ my: 2 }}
    />
  );
};

export default QueryEditor;
