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
  Pagination,
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
import Loader from "Components/CommonLayouts/Loading";

function Brokers() {
  const router = useRouter();

  const { openSnackbar } = useSnackbar();

  const limit = 5;

  var interval = null;

  const firstLoad = React.useRef(true);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [searchText, setSearchText] = React.useState("");
  const [totalPage, setTotalPage] = React.useState(0);

  const { data, isLoading, error, refetch } = useQueries(
    [reactQueryKey.user.myConsultant],
    async () => {
      try {
        const response = await getBrokers(limit, currentPage, searchText);
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

  const handleUpdateBroker = () => {
    refetch();
  };

  const handleSearch = (e) => {
    e.persist();
    setSearchText(e.target.value);
  };

  React.useEffect(() => {
    if (interval) {
      clearTimeout(interval);
    }
    if (!firstLoad?.current) {
      interval = setTimeout(handleUpdateBroker, 1000);
    }
    return () => {
      if (interval) {
        clearTimeout(interval);
      }
    };
  }, [searchText]);

  React.useEffect(() => {
    setBrokersList(data?.data || []);
    let total = parseInt((data?.totalCount || 0) / limit);
    if ((data?.totalCount || 0) % limit) {
      total += 1;
    }
    setTotalPage(total);
    if (total <= currentPage && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [data]);

  React.useEffect(() => {
    if (!firstLoad?.current) {
      handleUpdateBroker();
    }
    firstLoad.current = false;
  }, [currentPage]);

  return (
    <>
      {isLoading && <Loader />}

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
            <CustomSearchInput value={searchText} onChange={handleSearch} />
          </Card>
        </Container>
      </Box>

      <Container>
        <Grid container spacing={2}>
          {brokersList?.length ? (
            brokersList?.map((broker) => (
              <Grid item xs={12} key={broker._id}>
                <BrokerCard
                  broker={broker}
                  noReview={!broker?.reviews}
                  updateBroker={handleUpdateBroker}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} display={"flex"} justifyContent={"center"}>
              <Typography variant="h3" sx={{ my: 2, ml: 2 }}>
                No data found!
              </Typography>
            </Grid>
          )}
          <Grid item xs={12} display={"flex"} justifyContent={"end"}>
            <Pagination
              page={currentPage + 1}
              onChange={(e, value) => {
                setCurrentPage(value - 1);
              }}
              count={totalPage}
              shape="rounded"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Brokers;
