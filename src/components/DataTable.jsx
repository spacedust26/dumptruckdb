import React, { useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, TablePagination, Paper } from "@mui/material";

const DataTable = ({ data }) => {
  const rowsPerPageOptions = [5, 10, 15]; // Options for rows per page
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  if (!data.columns.length) return <p>No Table to Display</p>;

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = data.values.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden"}}>
      <TableContainer sx={{ maxHeight: 900}}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {data.columns.map((col, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: "600",
                    backgroundColor: "#0F2027",
                    color: "white",
                    padding: "3px 10px",
                    fontSize: "1rem",
                    border: "1px solid #5c8192", 
                  }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    sx={{
                      fontWeight: "500",
                      padding: "3px",
                      fontSize: "1rem",
                      backgroundColor: "#172f3a",
                      color: "white",
                      border: "1px solid #5c8192",
                    }}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.values.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          backgroundColor: "#0F2027",
          color: "white", 
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
            color: "white", 
          },
          "& .MuiSelect-select, & .MuiSvgIcon-root": {
            color: "white",
          },
        }}
      />
    </Paper>
  );
};

export default DataTable;
