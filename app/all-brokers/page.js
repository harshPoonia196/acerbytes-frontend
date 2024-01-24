"use client";

import { Box, Card, Container, Divider, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import BrokerCard from 'Components/BrokersPage/BrokerCard';
import CustomSearchInput from 'Components/CommonLayouts/SearchInput';

const page = () => {

  const [brokersList, setBrokersList] = useState([
    { name: "Anand Gupta", location: "Noida", type: "Individual Consultant", stars: 4, clients: 432 },
    { name: "Raghav Patel", location: "Noida", type: "Consultant", stars: 5, clients: 45 },
    { name: "Raghav Patel", location: "Noida", type: "Consultant", stars: 5, clients: 45 },
    { name: "Raghav Patel", location: "Noida", type: "Consultant", stars: 5, clients: 45 },
    { name: "Raghav Patel", location: "Noida", type: "Consultant", stars: 5, clients: 45 },
    { name: "Raghav Patel", location: "Noida", type: "Consultant", stars: 5, clients: 45 },
    { name: "Raghav Patel", location: "Noida", type: "Consultant", stars: 5, clients: 45 },
    { name: "Raghav Patel", location: "Noida", type: "Consultant", stars: 5, clients: 45 },
  ]);


  return (
    <>
      <Box sx={{ background: 'white', borderBottom: '1px solid whitesmoke', boxShadow: '1px 2px 2px -2px gainsboro!important' }}>
        <Container maxWidth='evmd'>
          <Typography variant='h3' sx={{ my: 2, ml: 2 }}>
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
