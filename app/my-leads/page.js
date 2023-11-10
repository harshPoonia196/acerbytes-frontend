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
import { useRouter } from "next/navigation";
import Link from "next/link";

function createData(
  firstName,
  lastName,
  city,
  countryCode,
  phone,
  phoneVerified,
  email,
  emailVerified,
  role,
  maxBudget,
  closedStatus,
  pendingStatus,
  updatedBy,
  lastModified
) {
  return {
    firstName,
    lastName,
    city,
    countryCode,
    phone,
    email,
    role,
    maxBudget,
    closedStatus,
    pendingStatus,
    updatedBy,
    lastModified,
  };
}

const rows = [
  createData(
    "Anand",
    "Gupta",
    "Mumbai",
    "+91",
    "1234567558",
    "anand@gmail.com",
    "Investor",
    "12000",
    "Pending",
    "Pending",
    "Anand",
    "12th Nov 2018, 09:18 AM"
  ),
];

function MyLeads() {
  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 2 }}>
        My Leads
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Country code</TableCell>
              <TableCell>Phone number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Max budget</TableCell>
              <TableCell>Closed status</TableCell>
              <TableCell>Pending status</TableCell>
              <TableCell>Updated by</TableCell>
              <TableCell>Last modified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.countryCode}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.maxBudget}</TableCell>
                <TableCell>{row.closedStatus}</TableCell>
                <TableCell>{row.pendingStatus}</TableCell>
                <TableCell>{row.updatedBy}</TableCell>
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

export default MyLeads;
