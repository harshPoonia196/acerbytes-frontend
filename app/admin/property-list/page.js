'use client'

import React from "react";
import { Container, Typography, Card } from "@mui/material";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import PropertyListTable from "Components/Admin/PropertyList/PropertyListTable";

function PropertyList() {

  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 2 }}>
        26 Properties listed
      </Typography>
      <Card sx={{ mb: 2 }}>
        <CustomSearchInput />
      </Card>
      <PropertyListTable />
    </Container>
  );
}

export default PropertyList;
