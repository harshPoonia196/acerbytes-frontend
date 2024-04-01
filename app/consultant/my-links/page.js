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

  const name = userDetails?.name?.firstName && userDetails?.name?.lastName ? `${userDetails.name.firstName} ${userDetails.name.lastName}` : "";
  return (
    <>
      <CustomConsultantBreadScrumbs text="Make links" />
      <InfoBox
        title={`${capitalLizeName(name)} (${capitalLizeName(userDetails?.role)})`}
        subtitle={`${count && count} property consultant links are currently active`}
      />
      <Container>
        <MyLinksTable setCount={setCount}/>
      </Container>
    </>
  );
};

export default page;
