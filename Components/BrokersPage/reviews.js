"use client";

import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BrokerDetails from "Components/Ratings/BrokerDetails";
import BrokerFeedBack from "Components/Ratings/BrokerFeedBack";
import InfoBox from "Components/CommonLayouts/CommonHeader";
import CustomConsultantBreadScrumbs from "Components/CommonLayouts/CustomConsultantBreadScrumbs";
import { getReviews } from 'api/Property.api';
import { useSnackbar } from "utills/SnackbarContext";
import NoDataCard from "Components/CommonLayouts/CommonDataCard";

const Reviews = ({ broker }) => {
  const { _id } = broker;
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
        const { data: { data } } = await getReviews(_id);
        setData(data)
      } catch (error) {
        showToaterMessages(error.message, "error");
      }
    }

  const searchParams = useSearchParams();
  const name = searchParams.get("name");


  return (
    <>
      {data ?
        <><Box
          sx={{
            zIndex: 100,
            background: "white",
            position: "sticky",
            top: { xs: 0, sm: 0 },
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
          </Container></>

        : <Grid item xs={12} justifyContent={"center"}>
          {/* <Typography variant="h3" sx={{ my: 2, ml: 2 }}>
            No data found!
          </Typography> */}
          <NoDataCard title={"No data found"} />
        </Grid>
      }
    </>
  );
};

export default Reviews;
