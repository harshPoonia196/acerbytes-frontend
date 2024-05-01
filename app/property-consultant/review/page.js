"use client";

import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BrokerDetails from "Components/Ratings/BrokerDetails";
import BrokerFeedBack from "Components/Ratings/BrokerFeedBack";
import InfoBox from "Components/CommonLayouts/CommonHeader";
import CustomConsultantBreadScrumbs from "Components/CommonLayouts/CustomConsultantBreadScrumbs";
import { getReviews } from 'api/Broker.api';
import { useSnackbar } from "utills/SnackbarContext";

const page = () => {

  const [data, setData] = useState(null);
  useEffect(() => {
    getList()
  }, [])

  const { openSnackbar } = useSnackbar(),
    showToaterMessages = (message, severity) => {
      openSnackbar(message, severity);
    },

    getList = async () => {
      try {
        const { data: { data } } = await getReviews();
        setData(data)
      } catch (error) {
        showToaterMessages(error.message, "error");
      }
    }

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
          <BrokerDetails name={name} data={data} />
        </Container>
      </Box>
      <Container maxWidth="evmd">
        <Grid container spacing={2}>
          {
            data?.reviews?.map((review) => <BrokerFeedBack review={review} />)
          }
        </Grid>
      </Container>
    </>
  );
};

export default page;
