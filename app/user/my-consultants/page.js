"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  Pagination,
} from "@mui/material";
import BrokerCard from "Components/BrokersPage/BrokerCard";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import { getBrokers } from "api/UserProfile.api";
import { useSnackbar } from "utills/SnackbarContext";
import Loader from "Components/CommonLayouts/Loading";
import { debounce } from "lodash";
import { DEBOUNCE_TIMER, SORTING } from "utills/Constants";
import NoDataCard from "Components/CommonLayouts/CommonDataCard";

function Brokers() {
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [consultantList, setConsultantList] = useState({
    rows: [],
    totalCount: 0,
  });
  const debouncedSearch = debounce(performSearch, DEBOUNCE_TIMER);
  const [initialMount, setInitialMount] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getList();
  }, [rowsPerPage, page]);

  useEffect(() => {
    if (initialMount) {
      setInitialMount(false);
      return;
    }

    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  const { openSnackbar } = useSnackbar(),
    showToaterMessages = (message, severity) => {
      openSnackbar(message, severity);
    };

  const getList = async () => {
      try {
        const {
          data: {
            data: { data = [], totalCount = 0 },
          },
        } = await getBrokers(rowsPerPage, page, searchTerm);
        let total = parseInt(totalCount / rowsPerPage);
        if (totalCount % rowsPerPage) {
          total += 1;
        }
        setTotalPage(total);
        setConsultantList({ rows: data, totalCount });
      } catch (error) {
        showToaterMessages(error.message, "error");
      }
    },
    handleChangePage = (event, newPage) => {
      setPage(newPage - 1);
    };

  function performSearch() {
    getList();
  }

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };
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
            {consultantList.totalCount} Consultants you contacted with
          </Typography>
          <Card>
            <CustomSearchInput value={searchTerm} onChange={handleSearch} />
          </Card>
        </Container>
      </Box>

      <Container>
        <Grid container spacing={2}>
          {consultantList?.rows?.length ? (
            consultantList?.rows?.map((broker) => {
              const type = broker.businessType,
                profilePicture = broker?.brokerPic?.[0]?.profilePicture ?? "";
              broker = { ...broker, type, profilePicture };

              return (
                <Grid item xs={12} key={broker._id}>
                  <BrokerCard
                    showRating={true}
                    broker={broker}
                    noReview={false}
                    updateBroker={getList}
                  />
                </Grid>
              );
            })
          ) : (
            <Grid item xs={12} justifyContent={"center"}>
              <NoDataCard title={"No data found"} />
            </Grid>
          )}
          <Grid item xs={12} display={"flex"} justifyContent={"end"}>
            <Pagination
              page={page + 1}
              onChange={handleChangePage}
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
