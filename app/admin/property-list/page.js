'use client'

import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import PropertyListTable from "Components/Admin/PropertyList/PropertyListTable";
import CustomAdminBreadScrumbs from "Components/CommonLayouts/CustomAdminBreadScrumbs";
import InfoBox from "Components/CommonLayouts/CommonHeader";

function PropertyList() {
  const [count, setCount] = useState({ noOfProperties: 0 });

  useEffect(() => {

  }, [count]);

  return (
    <>
      <CustomAdminBreadScrumbs text='Property list' />
      <InfoBox dataList={[{ label: 'Published', value: count?.noOfProperties },
      { label: 'Drafted', value: count?.noOfProperties + '(static)' }]} />
      <Container>
        <PropertyListTable setCount={setCount} />
      </Container>
    </>
  );
}

export default PropertyList;
