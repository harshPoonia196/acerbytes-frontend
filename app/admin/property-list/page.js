'use client'

import React, { useState } from "react";
import { Container, Typography} from "@mui/material";
import PropertyListTable from "Components/Admin/PropertyList/PropertyListTable";
import CustomAdminBreadScrumbs from "Components/CommonLayouts/CustomAdminBreadScrumbs";
import InfoBox from "Components/CommonLayouts/CommonHeader";
import { useAuth } from "utills/AuthContext";
import { capitalLizeName } from "utills/CommonFunction";

function PropertyList() {
  const { userDetails } = useAuth();
  const [count, setCount] = useState(0);

  const name = userDetails?.name?.firstName && userDetails?.name?.lastName ? `${userDetails.name.firstName} ${userDetails.name.lastName}` : "";

  return (
    <>

      <CustomAdminBreadScrumbs text='Property list' />
      <InfoBox
        title={`${capitalLizeName(name)} (${capitalLizeName(userDetails?.role)})`}
        subtitle={`${count && count} property consultant links are currently active`}
      />
      <Container>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {count && count} Properties listed
        </Typography>
        <PropertyListTable setCount={setCount} />
      </Container>
    </>
  );
}

export default PropertyList;
