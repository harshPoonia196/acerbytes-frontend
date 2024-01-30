"use client";

import { Box, Container, Grid } from '@mui/material';
import React from 'react'
import { useSearchParams } from 'next/navigation'
import BrokerDetails from 'Components/Ratings/BrokerDetails';
import BrokerFeedBack from 'Components/Ratings/BrokerFeedBack';



const page = () => {
  const searchParams = useSearchParams()
  const name = searchParams.get('name')

  return (
    <>
      <Box sx={{ zIndex: 100, background: 'white', position: 'sticky', top: { xs: 48, sm: 64 } }}>
        <Container maxWidth="evmd">
          <BrokerDetails name={name} />
        </Container >
      </Box>
      <Container maxWidth="evmd" >
        <Grid container spacing={2}>
          <BrokerFeedBack />
          <BrokerFeedBack />
          <BrokerFeedBack />
        </Grid>
      </Container>
    </>
  )
}

export default page
