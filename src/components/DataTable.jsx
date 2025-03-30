import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";

const DataTable = ({ data }) => {
  if (!data || data.length === 0) return <p>No results to display</p>;

  // Extract columns from data keys
  const columns = Object.keys(data[0]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
              <TableCell key={index}><strong>{col}</strong></TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col, colIndex) => (
                <TableCell key={colIndex}>{row[col]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default DataTable;
