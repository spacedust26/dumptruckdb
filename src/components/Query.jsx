import React, { useState, useEffect } from "react";
import initSqlJs from "sql.js";
import CSVUploader from "./CSVUploader";
import DataTable from "./DataTable";
import QueryEditor from "./QueryEditor";
import QuerySelector from "./QuerySelector";
import "../query.css";

const QueryApp = () => {
  const [db, setDb] = useState(null);
  const [tableName, setTableName] = useState(""); 
  const [queryResult, setQueryResult] = useState({ columns: [], values: [] });

  useEffect(() => {
    const loadSQL = async () => {
      try {
        const SQL = await initSqlJs({ locateFile: (file) => `https://sql.js.org/dist/${file}` });
        setDb(new SQL.Database());
      } catch (error) {
        console.error("Error loading sql.js:", error);
      }
    };
    loadSQL();
  }, []);

  const handleCSVUpload = (filename, csvData) => {
    if (!db) return;

    try {
      const rows = csvData.split("\n").map((row) => row.split(","));
      const headers = rows.shift();
      const table = filename.replace(".csv", "").replace(/\s+/g, "_");

      const createTableSQL = `CREATE TABLE ${table} (${headers.map(h => `"${h}" TEXT`).join(", ")});`;
      db.run(createTableSQL);

      const insertSQL = `INSERT INTO ${table} VALUES (${headers.map(() => "?").join(", ")});`;
      const stmt = db.prepare(insertSQL);
      rows.forEach((row) => stmt.run(row));
      stmt.free();

      setTableName(table); 
    } catch (error) {
      console.error("CSV Processing Error:", error);
      alert("Error processing CSV file.");
    }
  };

  const executeQuery = (query) => {
    if (!db || !tableName) return;
    const formattedQuery = query.replace("table_name", tableName); 

    try {
      const result = db.exec(formattedQuery);
      if (result.length > 0) {
        setQueryResult({ columns: result[0].columns, values: result[0].values });
      } else {
        setQueryResult({ columns: [], values: [] });
      }
    } catch (error) {
      alert("SQL Error: " + error.message);
    }
  };

  return (
    <div className="query-app">
      <h2>Dump Your Data Into The Truck</h2>
      <div className="transparent-div">
        <CSVUploader onUpload={handleCSVUpload} />
        <QuerySelector onSelect={executeQuery} />
        <QueryEditor onExecute={executeQuery} />
      </div>
      <div className="transparent-div">
        <DataTable data={queryResult} />
      </div>
    </div>
  );
};

export default QueryApp;
