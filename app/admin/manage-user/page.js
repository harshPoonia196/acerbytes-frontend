"use client";

import React, { useState, useEffect } from "react";
import { Container, Typography, Card, Box } from "@mui/material";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import ManageUserTable from "Components/Admin/ManageUser/ManageUserTable";
import CustomAdminBreadScrumbs from "Components/CommonLayouts/CustomAdminBreadScrumbs";
import InfoBox from "Components/CommonLayouts/CommonHeader";
function ManageUser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };
  const handleScroll = () => {
    setIsSticky(window.scrollY > 0);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (  
    <>
     <div style={{ position: "sticky", top: 0, zIndex: 1000, backgroundColor: isSticky ? 'white' : 'transparent', borderBottom: isSticky ? '1px solid whitesmoke' : 'none' }}>
        <CustomAdminBreadScrumbs text='Manage user' />
      </div>
      <InfoBox
        title="Anand Gupta(Admin)"
        subtitle="3,344 property consultant links are currently active"
        pagename="pagename"
      />
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
