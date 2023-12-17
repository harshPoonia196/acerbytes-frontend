import React from "react";
import { IconButton, Container, Chip, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const rows = [
  {
    firstName: 'Anand',
    lastName: 'Gupta',
    city: 'Mumbai',
    countryCode: '+91',
    phone: '1234567558',
    phoneVerified: true,
    email: 'anand@gmail.com',
    emailVerified: true,
    role: 'Investor',
    maxBudget: 12000,
    closedStatus: 'Pending',
    pendingStatus: 'Pending',
    updatedBy: 'Anand',
    lastModified: "12th Nov 2018, 09:18 AM",
  }
];

function Enquiries() {
  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 2 }}>
        List of Enquiries (Admin)
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
              <TableCell>Phone verified</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Email verified</TableCell>
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
                <TableCell>{row.phoneVerified ? "Yes" : "No"}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.emailVerified ? "Yes" : "No"}</TableCell>
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

export default Enquiries;
