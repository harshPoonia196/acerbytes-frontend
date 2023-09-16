import * as React from "react";
import Table from "@mui/material/Table";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const rows = [{ name: "dsdsd", city: "mumsb", sector: 67, interested: "yes" }];

export default function PropertyTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="caption">Project name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="caption">City</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="caption">Sector</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="caption">Interested</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.sector}</TableCell>
              <TableCell>{row.interested}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
