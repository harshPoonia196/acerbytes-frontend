"use client";

import React, { useState } from "react";
import {
  IconButton,
  Container,
  Chip,
  Typography,
  Card,
  Menu, MenuItem
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import UnblockIcon from "@mui/icons-material/CheckCircleOutline";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import MoreVertIcon from '@mui/icons-material/MoreVert';

function createData(
  firstName,
  lastName,
  phone,
  role,
  status,
  action
) {
  return {
    firstName,
    lastName,
    phone,
    role,
    status,
    action,
  };
}

const rows = [
  createData("Anand", "Gupta", "1234567558", "Active"),
];


function ManageUser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);
 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = rows.filter(
      (row) =>
        row.firstName.toLowerCase().includes(term) ||
        row.lastName.toLowerCase().includes(term) ||
        row.phone.toLowerCase().includes(term) ||
        row.role.toLowerCase().includes(term) ||
        row.status.toLowerCase().includes(term)
    );
    setFilteredRows(filtered);
  };

  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Manage User
      </Typography>
      <Card sx={{ mb: 2 }}>
      <CustomSearchInput
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 2 }}
        
      />
      </Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Phone number</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>
                <IconButton size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  </TableCell>
                <TableCell>
                  <Chip label={row.status} size="small" />
                </TableCell>
                <TableCell>
                  <IconButton>
                    <MoreVertIcon onClick={handleClick} />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={handleClose}>Block</MenuItem>
                    <MenuItem onClick={handleClose}>Unblock</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ManageUser;
