'use client'

import React, { useState } from "react";
import { Container, Typography, Card, Box } from "@mui/material";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import PropertyListTable from "Components/Admin/PropertyList/PropertyListTable";
import CustomAdminBreadScrumbs from "Components/CommonLayouts/CustomAdminBreadScrumbs";

function PropertyList() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  return (
    <>

      <CustomAdminBreadScrumbs text='Property list' />

      <Container>
        <Typography variant="h6" sx={{ mb: 2 }}>
          26 Properties listed
        </Typography>
        <Card sx={{ mb: 2 }}>
          <CustomSearchInput value={searchTerm}  onChange={handleSearch} />
        </Card>
        <PropertyListTable searchText={searchTerm}  />
      </Container>
    </>
  );
}

export default PropertyList;
