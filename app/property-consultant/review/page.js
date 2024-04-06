"use client";

import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { useSearchParams } from "next/navigation";
import BrokerDetails from "Components/Ratings/BrokerDetails";
import BrokerFeedBack from "Components/Ratings/BrokerFeedBack";
import InfoBox from "Components/CommonLayouts/CommonHeader";
import CustomConsultantBreadScrumbs from "Components/CommonLayouts/CustomConsultantBreadScrumbs";

const page = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <>

      <CustomConsultantBreadScrumbs text="List of reviews" />
      <InfoBox
        title="Anand Gupta(Admin)"
        subtitle="3,344 property consultant links are currently active"

      />
      <Box
        sx={{
          zIndex: 100,
          background: "white",
          position: "sticky",
          top: { xs: 48, sm: 64 },
        }}
      >
        <Container maxWidth="evmd">
          <BrokerDetails name={name} />
        </Container>
      </Box>
      <Container maxWidth="evmd">
        <Grid container spacing={2}>
          <BrokerFeedBack />
          <BrokerFeedBack />
          <BrokerFeedBack />
        </Grid>
      </Container>
    </>
  );
};

export default page;
