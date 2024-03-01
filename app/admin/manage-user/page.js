"use client";

import React, { useState, useEffect } from "react";
import { Container, Typography, Card, Box } from "@mui/material";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import ManageUserTable from "Components/Admin/ManageUser/ManageUserTable";
import CustomAdminBreadScrumbs from "Components/CommonLayouts/CustomAdminBreadScrumbs";
import InfoBox from "Components/CommonLayouts/CommonHeader";
function ManageUser() {
  const [searchTerm, setSearchTerm] = useState("");
 
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  return (  
    <>

        <CustomAdminBreadScrumbs text='Manage user' />
     
        
      
     
      {/* <InfoBox
        title="Anand Gupta(Admin)"
        subtitle="3,344 property consultant links are currently active"
        
      /> */}
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
