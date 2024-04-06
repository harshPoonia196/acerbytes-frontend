'use client'

import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import PropertyListTable from "Components/Admin/PropertyList/PropertyListTable";
import CustomAdminBreadScrumbs from "Components/CommonLayouts/CustomAdminBreadScrumbs";
import InfoBox from "Components/CommonLayouts/CommonHeader";
import { useAuth } from "utills/AuthContext";
import { capitalLizeName } from "utills/CommonFunction";

function PropertyList() {
  const { userDetails } = useAuth();
  const [count, setCount] = useState({ noOfProperties: 0 });

  const name = userDetails?.name?.firstName && userDetails?.name?.lastName ? `${userDetails.name.firstName} ${userDetails.name.lastName}` : "";

  useEffect(() => {

  }, [count]);

  return (
    <>
      <CustomAdminBreadScrumbs text='Property list' />
      <InfoBox dataList={[{ label: 'Properties', value: count?.noOfProperties }]} />
      <Container>
        <PropertyListTable setCount={setCount} />
      </Container>
    </>
  );
}

export default PropertyList;
