"use client";

import { Box, Card, Container, Grid, IconButton, InputBase } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import BrokerCard from 'Components/BrokersPage/BrokerCard';

const page = () => {

  const [brokersList, setBrokersList] = useState([
    { name: "Anand Gupta", type: "Consultant", stars: 4, clients: 432 },
    { name: "Raghav Patel", type: "Consultant", stars: 5, clients: 45 },
  ]);


  return (
    <>
      <Container>
        <Card>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              pl: 2,
              borderRadius: "8px",
            }}
          >
            <InputBase
              placeholder="Search"
              type="text"
              inputProps={{ "aria-label": "Search..." }}
              fullWidth
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Box>
        </Card>
      </Container>

      <Container>
        <Grid container spacing={2}>
          {brokersList?.map((broker) => (
            <Grid item xs={12} key={broker.name}>
              <BrokerCard type={'View Reviews'} broker={broker} />
            </Grid>
          ))}
        </Grid>
      </Container>


    </>
  )
}

export default page
