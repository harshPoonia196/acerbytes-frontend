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
  locality,
  status,
  isListed,
  lastModified
) {
  return {
    project,
    builder,
    city,
    locality,
    status,
    isListed,
    lastModified,
  };
}

const rows = [
  createData(
    "Rizvi heights",
    "Rizvi builders",
    "Mumbai",
    "Malad",
    "Booked",
    true,
    "12th Nov 2018, 09:18 AM"
  ),
];

function PropertyList() {
  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 2 }}>
        List of Properties (Admin)
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Project</TableCell>
              <TableCell>Builder</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Locality</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>View</TableCell>
              <TableCell>Listed</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Last modified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.project}</TableCell>
                <TableCell>{row.builder}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.locality}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <Link
                    href="/details"
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    Preview
                  </Link>
                </TableCell>
                <TableCell>{row.isListed ? "Yes" : "No"}</TableCell>
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
                  <Chip label={row.lastModified} size="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default PropertyList;
