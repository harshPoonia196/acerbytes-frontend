"use client";

import React from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  Box,
  Card,
  InputBase,
  IconButton,
} from "@mui/material";
import BrokerCard from "Components/BrokersPage/BrokerCard";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import { useQueries } from "utills/ReactQueryContext";
import { getBrokers } from "api/UserProfile.api";
import { reactQueryKey } from "utills/Constants";
import { useSnackbar } from "utills/SnackbarContext";
import PageLoader from "Components/Loader/PageLoader";

function Brokers() {
  const router = useRouter();

  const { openSnackbar } = useSnackbar();

  const { data, isLoading, error } = useQueries(
    [reactQueryKey.user.myConsultant],
    async () => {
      try {
        const response = await getBrokers();
        if (response.status == 200) {
          const { success, data, message } = response.data;
          if (success) {
            return data;
          } else {
            openSnackbar(message, "error");
          }
        }
      } catch (error) {
        openSnackbar(
          error?.response?.data?.message ||
            error?.message ||
            "Something went wrong!",
          "error"
        );
        return error;
      }
    }
  );

  const [brokersList, setBrokersList] = React.useState([]);

  const handleUpdateBroker = (updatedBroker) => {
    setBrokersList((brokersList) => {
      return (
        brokersList?.map((broker) => {
          if (broker?._id == updatedBroker?._id) {
            return updatedBroker;
          } else {
            return broker;
          }
        }) || []
      );
    });
  };

  React.useEffect(() => {
    setBrokersList(data || []);
  }, [data]);

  return (
    <>
      <PageLoader isLoading={isLoading} />
      <Box
        sx={{
          background: "white",
          borderBottom: "1px solid whitesmoke",
          boxShadow: "1px 2px 2px -2px gainsboro!important",
          position: "sticky",
          top: { xs: 54, sm: 64 },
          zIndex: 100,
        }}
      >
        <Container>
          <Typography variant="h3" sx={{ my: 2, ml: 2 }}>
            75 consultant may be interested to work with you
          </Typography>
          <Card>
            <CustomSearchInput />
          </Card>
        </Container>
      </Box>

      <Container>
        <Grid container spacing={2}>
          {brokersList?.map((broker) => (
            <Grid item xs={12} key={broker._id}>
              <BrokerCard
                broker={broker}
                noReview={!broker?.reviews}
                updateBroker={handleUpdateBroker}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Brokers;
