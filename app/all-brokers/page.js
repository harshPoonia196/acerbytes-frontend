"use client";

import { Box, Card, Container, Grid, IconButton, InputBase } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import BrokerCard from 'Components/BrokersPage/BrokerCard';
import CustomSearchInput from 'Components/CommonLayouts/SearchInput';

const page = () => {

  const [brokersList, setBrokersList] = useState([
    { name: "Anand Gupta", type: "Consultant", stars: 4, clients: 432 },
    { name: "Raghav Patel", type: "Consultant", stars: 5, clients: 45 },
  ]);


  return (
    <>
      <Container sx={{ pb: '0 !important' }}>
        <Card>
          <CustomSearchInput />
        </Card>
      </Container>

      <Container>
        <Grid container spacing={2}>
          {brokersList?.map((broker) => (
            <Grid item xs={12} key={broker.name}>
              <BrokerCard type={'View Reviews'} broker={broker} noReview />
            </Grid>
          ))}
        </Grid>
      </Container>


    </>
  )
}

export default page
