import React, { useState, useEffect } from "react";
import initSqlJs from "sql.js";
import CSVUploader from "./CSVUploader";
import DataTable from "./DataTable";
import QueryEditor from "./QueryEditor";
import QuerySelector from "./QuerySelector";
import "../query.css";

const QueryApp = () => {
  const [db, setDb] = useState(null);
  const [tables, setTables] = useState([]);
  const [queryResult, setQueryResult] = useState({ columns: [], values: [] });

  useEffect(() => {
    const loadSQL = async () => {
      const SQL = await initSqlJs({ locateFile: (file) => `https://sql.js.org/dist/${file}` });
      setDb(new SQL.Database());
    };
    loadSQL();
  }, []);

  const handleCSVUpload = (filename, csvData) => {
    if (!db) return;
    
    const rows = csvData.split("\n").map((row) => row.split(","));
    const headers = rows.shift();
    const tableName = filename.replace(".csv", "").replace(/\s+/g, "_");

    const createTableSQL = `CREATE TABLE ${tableName} (${headers.map(h => `"${h}" TEXT`).join(", ")});`;
    db.run(createTableSQL);

    const insertSQL = `INSERT INTO ${tableName} VALUES (${headers.map(() => "?").join(", ")});`;
    const stmt = db.prepare(insertSQL);
    rows.forEach((row) => stmt.run(row));
    stmt.free();

    updateTableList();
  };

  const updateTableList = () => {
    if (!db) return;
    const tablesQuery = db.exec("SELECT name FROM sqlite_master WHERE type='table';");
    if (tablesQuery.length > 0) {
      setTables(tablesQuery[0].values.flat());
    }
  };

  const executeQuery = (query) => {
    if (!db) return;
    try {
      const result = db.exec(query);
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
      <div class="transparent-div">
        <CSVUploader onUpload={handleCSVUpload} />
        <QuerySelector tables={tables} onSelect={(table) => executeQuery(`SELECT * FROM ${table}`)} />
        <QueryEditor onExecute={executeQuery} />
      </div>
      <DataTable data={queryResult} />
    </div>
  );
};

export default QueryApp;
