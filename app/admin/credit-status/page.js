"use client";

import CreditTable from "Components/Admin/CreditStatus/CreditTable";

import CustomAdminBreadScrumbs from "Components/CommonLayouts/CustomAdminBreadScrumbs";
import React, { useState } from "react";

function CreditStatus() {
  const [dashboardInfo, setDashboardInfo] = useState({});

  const handleDashboardDataUpdate = ({ countInfo }) => {
    setDashboardInfo(countInfo);
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
