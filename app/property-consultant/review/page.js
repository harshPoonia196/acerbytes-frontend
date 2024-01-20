"use client";

import { Container, Grid } from '@mui/material';
import React from 'react'
import { useSearchParams } from 'next/navigation'
import BrokerDetails from 'Components/Ratings/BrokerDetails';
import BrokerFeedBack from 'Components/Ratings/BrokerFeedBack';



const page = () => {

  const searchParams = useSearchParams()
  const name = searchParams.get('name')

  return (
    <>
      <Container maxWidth="evmd" sx={{ position: 'sticky', top: { xs: 48, sm: 64 }, zIndex: 100, background: 'white' }} >
        <BrokerDetails name={name} />
      </Container >
      <Container maxWidth="evmd" sx={{ pt: '0 !important' }}>
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
