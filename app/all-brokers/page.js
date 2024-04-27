"use client";

import { Box, Card, Container, Divider, Grid, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import BrokerCard from 'Components/BrokersPage/BrokerCard';
import CustomSearchInput from 'Components/CommonLayouts/SearchInput';
import { useSnackbar } from "utills/SnackbarContext";
import { getBrokersList } from "api/Property.api"
import { debounce } from "lodash";
import { DEBOUNCE_TIMER } from 'utills/Constants';
import NoDataCard from 'Components/CommonLayouts/CommonDataCard';

const page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = debounce(performSearch, DEBOUNCE_TIMER);
  const [initialMount, setInitialMount] = useState(true);
  const [brokersList, setBrokersList] = useState({ rows: [], totalCount: 0 });

  useEffect(() => {
    getList()
  }, [])

  useEffect(() => {
    if (initialMount) {
      setInitialMount(false);
      return;
    }

    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm])

  const { openSnackbar } = useSnackbar(),
    showToaterMessages = (message, severity) => {
      openSnackbar(message, severity);
    };

  const getList = async () => {
    try {
      const { data: { data: { data = [], totalCount = 0 } }, status } = await getBrokersList(searchTerm);
      setBrokersList({ rows: data, totalCount })
    } catch (error) {
      showToaterMessages(error.message, "error");
    }
  }

  function performSearch() {
    getList()
  }

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };


  return (
    <>
      <Box sx={{
        background: 'white', borderBottom: '1px solid whitesmoke', boxShadow: '1px 2px 2px -2px gainsboro!important', position: "sticky",
        top: { xs: 54, sm: 64 }, zIndex: 100
      }}>
        <Container maxWidth='evmd'>
          <Typography variant='h3' sx={{ mb: 2, ml: 2 }}>
            Consultants ({brokersList.totalCount})
          </Typography>
          <Card>
            <CustomSearchInput value={searchTerm}
              onChange={handleSearch} />
          </Card>
        </Container>
      </Box>

      <Container maxWidth='evmd'>
        <Grid container spacing={2}>
          {brokersList?.rows?.map((broker) => {

            const type = broker.businessType,
              profilePicture = broker?.brokerPic?.[0]?.profilePicture ?? '';
            broker = { ...broker, type, profilePicture }

            return (
              <Grid item xs={12} key={broker.fullName}>
                <BrokerCard type={'View Reviews'} broker={broker} noReview />
              </Grid>
            )
          }
          )}
        </Grid>
        {!brokersList?.rows.length ? <NoDataCard title={"No data found"} /> : null}
      </Container>
    </>
  )
}

export default page
