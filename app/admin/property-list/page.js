'use client'

import React from "react";
import { Container, Typography, Card, Box } from "@mui/material";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import PropertyListTable from "Components/Admin/PropertyList/PropertyListTable";
import CustomAdminBreadScrumbs from "Components/CommonLayouts/CustomAdminBreadScrumbs";

function PropertyList() {

  return (
    <>
      <Box sx={{ backgroundColor: "white" }}>
        <Container
          maxWidth="lg"
          sx={{ pb: "0 !important" }}
        >
          <CustomAdminBreadScrumbs text='Property list' />
        </Container>
      </Box>
      <Container>
        <Typography variant="h6" sx={{ mb: 2 }}>
          26 Properties listed
        </Typography>
        <Card sx={{ mb: 2 }}>
          <CustomSearchInput />
        </Card>
        <PropertyListTable />
      </Container>
    </>
  );
}

export default PropertyList;
