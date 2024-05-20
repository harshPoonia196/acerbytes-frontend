'use client'

import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import PropertyListTable from "Components/Admin/PropertyList/PropertyListTable";
import CustomAdminBreadScrumbs from "Components/CommonLayouts/CustomAdminBreadScrumbs";
import InfoBox from "Components/CommonLayouts/CommonHeader";

function PropertyList() {
  const [count, setCount] = useState({ noOfPublished: 0, noOfDraft: 0 });

  useEffect(() => {

  }, [count]);

  return (
    <>
      <CustomAdminBreadScrumbs text='Property list' />
      <InfoBox dataList={[{ label: 'Published', value: count?.noOfPublished },
      { label: 'Drafted', value: count?.noOfDraft }]} />
      <Container>
        <PropertyListTable setCount={setCount} />
      </Container>
    </>
  );
}

export default PropertyList;
