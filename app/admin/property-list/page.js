import React from "react";
import { IconButton, Container, Chip, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

function createData(
  project,
  builder,
  city,
  area,
  sector,
  status,
  lastModified
) {
  return {
    project,
    builder,
    city,
    area,
    sector,
    status,
    lastModified,
  };
}

const rows = [
  createData(
    "Rizvi heights",
    "Rizvi builders",
    "Mumbai",
    "Noida",
    'sector 26',
    "Draft",
    "12th Nov 2018, 09:18 AM"
  ),
];

function PropertyList() {
  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 2 }}>
        26 Properties listed
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Builder</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Last modified</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.builder}</TableCell>
                <TableCell>{row.project}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.area}</TableCell>
                <TableCell>{row.sector}</TableCell>
                <TableCell>
                  <IconButton>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell>
                  {row.lastModified}
                </TableCell>
                <TableCell><Chip label={row.status} size="small" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default PropertyList;
