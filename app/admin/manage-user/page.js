"use client";

import React, { useState, useEffect } from "react";
import { Container, Typography, Card, Box } from "@mui/material";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import ManageUserTable from "Components/Admin/ManageUser/ManageUserTable";
import CustomAdminBreadScrumbs from "Components/CommonLayouts/CustomAdminBreadScrumbs";
import InfoBox from "Components/CommonLayouts/CommonHeader";
function ManageUser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dashboardInfo, setDashboardInfo] = useState({});
  const [userDetails, setUserDetails] = useState({});

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleDashboardDataUpdate = ({ countInfo, userDetails }) => {
    setDashboardInfo(countInfo);
    setUserDetails(userDetails || {});
  }

  return (
    <>

      <CustomAdminBreadScrumbs text='Manage user' />

      <InfoBox
        title={Object.keys(userDetails).length > 0 ? `${userDetails?.name?.firstName} ${userDetails?.name?.lastName}(${userDetails?.role})` : ""}
        subtitle={Object.keys(dashboardInfo).length > 0 ? `${dashboardInfo?.noOfSuperAdmins ? `Super admins: ${dashboardInfo.noOfSuperAdmins}`: ``} Admins: ${dashboardInfo.noOfAdmin}, Brokers: ${dashboardInfo.noOfBroker}, Users: ${dashboardInfo.noOfUsers}` : ''}
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
        <ManageUserTable searchText={searchTerm} onDashboardDataUpdate={handleDashboardDataUpdate} />

      </Container>
    </>
  );
}

export default ManageUser;
