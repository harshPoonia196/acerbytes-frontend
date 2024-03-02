"use client";

import { Box, Card, Container, Divider, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import BrokerCard from 'Components/BrokersPage/BrokerCard';
import CustomSearchInput from 'Components/CommonLayouts/SearchInput';

const page = () => {

  const [brokersList, setBrokersList] = useState([
    { fullName: "Anand Gupta", location: "Noida", type: "Individual Consultant", rating: 4, clients: 432 },
    { fullName: "Raghav Patel", location: "Noida", type: "Consultant", rating: 5, clients: 45 },
    { fullName: "Raghav Patel", location: "Noida", type: "Consultant", rating: 5, clients: 45 },
    { fullName: "Raghav Patel", location: "Noida", type: "Consultant", rating: 5, clients: 45 },
    { fullName: "Raghav Patel", location: "Noida", type: "Consultant", rating: 5, clients: 45 },
    { fullName: "Raghav Patel", location: "Noida", type: "Consultant", rating: 5, clients: 45 },
    { fullName: "Raghav Patel", location: "Noida", type: "Consultant", rating: 5, clients: 45 },
    { fullName: "Raghav Patel", location: "Noida", type: "Consultant", rating: 5, clients: 45 },
  ]);


  return (
    <>
      <Box sx={{
        background: 'white', borderBottom: '1px solid whitesmoke', boxShadow: '1px 2px 2px -2px gainsboro!important', position: "sticky",
        top: { xs: 54, sm: 64 }, zIndex: 100
      }}>
        <Container maxWidth='evmd'>
          <Typography variant='h3' sx={{ mb: 2, ml: 2 }}>
            Consultants (45)
          </Typography>
          <Card>
            <CustomSearchInput />
          </Card>
        </Container>
      </Box>

      <Container maxWidth='evmd'>
        <Grid container spacing={2}>
          {brokersList?.map((broker) => (
            <Grid item xs={12} key={broker.fullName}>
              <BrokerCard type={'View Reviews'} broker={broker} noReview />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default page
