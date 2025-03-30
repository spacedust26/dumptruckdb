import React, { useState, useEffect } from "react";
import initSqlJs from "sql.js";
import CSVUploader from "./CSVUploader";
import DataTable from "./DataTable";
import QueryManager from "./QueryManager"; 
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
      const rows = csvData.trim().split("\n").map((row) => row.split(",").map(cell => cell.trim()));
      const headers = rows.shift();
      if (!headers || headers.length === 0) {
        alert("CSV file is empty or invalid!");
        return;
      }
      // alert("done 1");
      const table = filename.replace(".csv", "").replace(/\s+/g, "_");
      // alert("done table name");
      const createTableSQL = `CREATE TABLE ${table} (${headers.map(h => `"${h}" TEXT`).join(", ")});`;
      db.run(createTableSQL);
      // alert("done create table");
      const insertSQL = `INSERT INTO ${table} VALUES (${headers.map(() => "?").join(", ")});`;
      const stmt = db.prepare(insertSQL);
      rows.forEach((row) => stmt.run(row));
      stmt.free();
      // alert("done table insert");
      setTableName(table);
    } catch (error) {
      console.error("CSV Processing Error:", error);
      alert("Error processing CSV file.");
    }
  };

  const executeQuery = (query) => {
    if (!db || !tableName) {
      alert("No table selected or database not initialized.");
      return;
    }

    try {
      const result = db.exec(query);
      setQueryResult(result.length > 0 ? { columns: result[0].columns, values: result[0].values } : { columns: [], values: [] });
    } catch (error) {
      alert("SQL Error: " + error.message);
    }
  };

  return (
    <div className="query-app">
    <div className="header-container">
      <h2>Dump Your Data Into The Truck</h2>
      <img src="/bin.gif" alt="Bin Icon" className="header-icon" />
    </div>
      <div className="transparent-div">
        <CSVUploader onUpload={handleCSVUpload} />
        <QueryManager onExecute={executeQuery} tableName={tableName} />
      </div>
      <div className="transparent-div">
        <DataTable data={queryResult} />
      </div>
    </div>
  );
};

export default QueryApp;
