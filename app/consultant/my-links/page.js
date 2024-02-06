"use client";

import { Box, Card, Container } from "@mui/material";
import React from "react";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import MyLinksTable from "Components/Consultant/ConsultantLinks/MyLinksTable";
import CustomConsultantBreadScrumbs from "Components/CommonLayouts/CustomConsultantBreadScrumbs";
import InfoBox from "Components/CommonLayouts/CommonHeader";

const page = () => {
  return (
    <>
      <CustomConsultantBreadScrumbs text="Make links" />
      <InfoBox
        title="Anand Gupta(Admin)"
        subtitle="3,344 property consultant links are currently active"
        pagename="pagename"
      />
      <Container>
        <Card sx={{ mb: 2 }}>
          <CustomSearchInput />
        </Card>
        <MyLinksTable />
      </Container>
    </>
  );
};

export default page;
