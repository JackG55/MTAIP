import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "event", label: "Sự kiện", minWidth: 170, width: 250 },
  { id: "price", label: "Giá (ETH)", minWidth: 100, format:(value) => value.toString() },
  { id: "from", label: "Từ", minWidth: 170 },
  { id: "to", label: "Đến", minWidth: 170 },
  { id: "time", label: "Thời gian", minWidth: 170 }
];



export default function TableUI( { rows } ) {

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, width: column.width, fontWeight: '400',
                    fontSize: '18px',
                    lineHeight: '22px' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: ' #F5F5F5' }}>
            {rows
              .map((row) => {
                return (
                  <TableRow key={row.time}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{fontWeight: 400,
                            fontSize: '18px',
                            lineHeight: '22px'}}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
