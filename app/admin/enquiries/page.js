'use client'

import React from "react";
import { Box, Container, Typography, Card, Grid } from "@mui/material";
import EnquiriesTable from "Components/Admin/Enquiries/EnquiriesTable";
import CustomAdminBreadScrumbs from "Components/CommonLayouts/CustomAdminBreadScrumbs";
import InfoBox from "Components/CommonLayouts/CommonHeader";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import { useAuth } from 'utills/AuthContext';

function Enquiries() {
  const { userDetails } = useAuth();
  const [search, setSearch] = React.useState("");
  const [leadsCount, setLeadsCount] = React.useState("");
  const handleSearch = (e) => {
    e.persist();
    setSearch(e.target.value);
  };
  console.log("userDetails:", userDetails);
  return (
    <>
      <CustomAdminBreadScrumbs text='List of leads' />
      <Box sx={{ backgroundColor: "white" }}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4} md={2}>
              <Card sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h3">{`${leadsCount}`}</Typography>
                <Typography variant="h6">Leads</Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container>
        <Card sx={{ mb: 2 }}>
          <CustomSearchInput value={search} onChange={handleSearch} />
        </Card>
        <EnquiriesTable search={search} setLeadsCount={setLeadsCount} />
      </Container>
    </>
  );
}

export default Enquiries;
