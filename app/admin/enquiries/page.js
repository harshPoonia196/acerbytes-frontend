'use client'

import React from "react";
import { Box, Container, Typography,Card } from "@mui/material";
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
      <InfoBox
        title={`${userDetails ? `${userDetails?.name?.firstName} ${userDetails?.name?.lastName} (${userDetails.role})` : ""}`}
        subtitle={`Leads: ${leadsCount}`} 
      />
      <Container>
        <Typography variant="h6" sx={{ mb: 2,mt:1 }}>
          List of Enquiries (Admin)
        </Typography>
        <Card sx={{ mb: 2 }}>
                    <CustomSearchInput value={search} onChange={handleSearch} />
                </Card>
        <EnquiriesTable search={search} setLeadsCount={setLeadsCount} />
      </Container>
    </>
  );
}

export default Enquiries;
