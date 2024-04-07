"use client";

import { Container } from "@mui/material";
import React, { useState } from "react";
import MyLinksTable from "Components/Consultant/ConsultantLinks/MyLinksTable";
import CustomConsultantBreadScrumbs from "Components/CommonLayouts/CustomConsultantBreadScrumbs";
import InfoBox from "Components/CommonLayouts/CommonHeader";
import { useAuth } from "utills/AuthContext";
import { capitalLizeName } from "utills/CommonFunction";

const page = () => {
  const { userDetails } = useAuth();
  const [count, setCount] = useState(0);

  return (
    <>
      <CustomConsultantBreadScrumbs text="My links" />
      <InfoBox
        label='My links'
        dataList={[{ label: 'Links', value: count }]}
      />
      <Container>
        <MyLinksTable setCount={setCount} />
      </Container>
    </>
  );
};

export default page;
