import React, { useState } from "react";
import QueryEditor from "./QueryEditor";
import QuerySelector from "./QuerySelector";
import DataTable from "./DataTable";
import CSVUploader from "./CSVUploader";
import { executeQuery } from "../utils/sqlParser";
import { Container, Typography, Button } from "@mui/material";

const QueryApp = () => {
  const [csvData, setCsvData] = useState([]); 
  const [query, setQuery] = useState("SELECT * FROM data;"); // User input query
  const [queryResult, setQueryResult] = useState([]); // Query results

  const handleRunQuery = () => {
    const result = executeQuery(query, csvData);
    setQueryResult(result);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ my: 3 }}>
        SQL Query Runner (Frontend)
      </Typography>
      <CSVUploader setCsvData={setCsvData} />
      <QuerySelector setQuery={setQuery} />
      <QueryEditor query={query} setQuery={setQuery} />
      <Button onClick={handleRunQuery} variant="contained" sx={{ mt: 2 }}>
        Run Query
      </Button>
      <DataTable data={queryResult} />
    </Container>
  );
};

export default QueryApp;
