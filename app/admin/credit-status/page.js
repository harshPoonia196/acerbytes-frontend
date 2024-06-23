"use client";

import { Box, Container, Typography, Card, Grid } from "@mui/material";
import CreditTable from "Components/Admin/CreditStatus/CreditTable";

import CustomAdminBreadScrumbs from "Components/CommonLayouts/CustomAdminBreadScrumbs";
import InfoBox from "Components/CommonLayouts/CommonHeader";
// import CustomSearchInput from 'Components/CommonLayouts/SearchInput';
import React, { useState } from "react";

function CreditStatus() {
  const [dashboardInfo, setDashboardInfo] = useState({});
  const [userDetails, setUserDetails] = useState({});

  const handleDashboardDataUpdate = ({ countInfo, userDetails }) => {
    setDashboardInfo(countInfo);
    setUserDetails(userDetails || {});
  };

  return (
    <>
      <CustomAdminBreadScrumbs text="Credit points status" />
      <CreditTable
        onDashboardDataUpdate={handleDashboardDataUpdate}
        dashboardInfo={dashboardInfo}
      />
    </>
  );
}

export default CreditStatus;
