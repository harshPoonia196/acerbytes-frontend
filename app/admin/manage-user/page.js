"use client";

import React, { useState, useEffect } from "react";
import { Container, Typography, Card, Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import ManageUserTable from "Components/Admin/ManageUser/ManageUserTable";
import CustomAdminBreadScrumbs from "Components/CommonLayouts/CustomAdminBreadScrumbs";
import InfoBox from "Components/CommonLayouts/CommonHeader";
import { capitalLizeName } from "utills/CommonFunction";
function ManageUser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dashboardInfo, setDashboardInfo] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [value, setValue] = useState(0);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleDashboardDataUpdate = ({ countInfo, userDetails }) => {
    setDashboardInfo(countInfo);
    setUserDetails(userDetails || {});
  }

  const handleChange = (event, newValue) => {
    if (newValue !== null)
      setValue(newValue);
  };

  const generateSubtitle = () => {
    console.log(dashboardInfo)
    let result = []
    let subtitle = "";
    if (Object.keys(dashboardInfo).length > 0) {
      if (value === 0) {
        result.push({ label: 'Super admins', value: dashboardInfo.noOfSuperAdmins })
        result.push({ label: 'Admins', value: dashboardInfo.noOfAdmin })
        result.push({ label: 'Brokers', value: dashboardInfo.noOfBroker })
        result.push({ label: 'Users', value: dashboardInfo.noOfUsers })
        // subtitle = `${dashboardInfo?.noOfSuperAdmins ? `Super admins: ${dashboardInfo.noOfSuperAdmins}, ` : ''}Admins: 
        // ${dashboardInfo.noOfAdmin}, Brokers: ${dashboardInfo.noOfBroker}, Users: ${dashboardInfo.noOfUsers}`;
      } else if (value === 1) {
        result.push({ label: 'Super admins', value: dashboardInfo.noOfSuperAdmins })
        result.push({ label: 'Admins', value: dashboardInfo.noOfAdmin })
        // subtitle = `${dashboardInfo?.noOfSuperAdmins ? `Pending approval: ${dashboardInfo.noOfSuperAdmins}, ` : ''}Pending approval : ${dashboardInfo.noOfAdmin}`;
      }
    }
    return result;
  };

  const displayNameAndRole = userDetails => {
    const name = `${userDetails?.name?.firstName} ${userDetails?.name?.lastName}`;
    const role = userDetails?.role;
    return `${capitalLizeName(name)} (${capitalLizeName(role)})`;
  };

  return (
    <>

      <CustomAdminBreadScrumbs text='Manage users' />

      <InfoBox
        // label={generateSubtitle()}
        dataList={generateSubtitle()}
      />

      <Container>
        {userDetails?.role === "superAdmin" ?
          <Card sx={{ my: 2 }}>
            <ToggleButtonGroup
              color="primary"
              value={value}
              exclusive
              aria-label="Platform"
              sx={{ display: "flex" }}
              onChange={handleChange}
            >
              <ToggleButton
                size="small"
                value={0}
                sx={{ flex: 1, border: "none" }}
              >
                Manage User
              </ToggleButton>
              <ToggleButton
                size="small"
                value={1}
                sx={{ flex: 1, border: "none" }}
              >
                Pending Request
              </ToggleButton>
            </ToggleButtonGroup>
          </Card>
          :
          <></>
        }
        <Card sx={{ mb: 2 }}>
          <CustomSearchInput
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Card>
        <ManageUserTable searchText={searchTerm} onDashboardDataUpdate={handleDashboardDataUpdate}
          selectedTabValue={value} />

      </Container>
    </>
  );
}

export default ManageUser;
