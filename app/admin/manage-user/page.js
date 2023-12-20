"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
} from "@mui/material";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import ManageUserTable from "Components/Admin/ManageUser/ManageUserTable";

function ManageUser() {
  const [searchTerm, setSearchTerm] = useState("");
  // const [filteredRows, setFilteredRows] = useState(rows);

  // const handleSearch = (event) => {
  //   const term = event.target.value.toLowerCase();
  //   setSearchTerm(term);

  //   const filtered = rows.filter(
  //     (row) =>
  //       row.firstName.toLowerCase().includes(term) ||
  //       row.lastName.toLowerCase().includes(term) ||
  //       row.phone.toLowerCase().includes(term) ||
  //       row.role.toLowerCase().includes(term) ||
  //       row.status.toLowerCase().includes(term)
  //   );
  //   setFilteredRows(filtered);
  // };

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
          // onChange={handleSearch}
          sx={{ mb: 2 }}

        />
      </Card>
      <ManageUserTable />
    </Container>
  );
}

export default ManageUser;
