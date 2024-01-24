"use client";

import React, { useState } from "react";
import { Container, Typography, Card, Box } from "@mui/material";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import ManageUserTable from "Components/Admin/ManageUser/ManageUserTable";
import CustomAdminBreadScrumbs from "Components/CommonLayouts/CustomAdminBreadScrumbs";

function ManageUser() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  return (
    <>
      <Box sx={{ backgroundColor: "white" }}>
        <Container maxWidth="lg">
          <CustomAdminBreadScrumbs text="Manage user" />
        </Container>
      </Box>
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
          />
        </Card>
        <ManageUserTable searchText={searchTerm} />
      </Container>
    </>
  );
}

export default ManageUser;
