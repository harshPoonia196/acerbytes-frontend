"use client";

import { Container } from '@mui/material';
import React from 'react'
import { useSearchParams } from 'next/navigation'
import BrokerDetails from 'Components/AllBrokers/BrokerDetails';
import BrokerFeedBack from 'Components/AllBrokers/BrokerFeedBack';



const page = () => {

  const searchParams = useSearchParams()
  const name = searchParams.get('name')

  return (
    <>
      <Container maxWidth="evmd" sx={{ mx: 'auto' }}>
        <BrokerDetails name={name} />
        <BrokerFeedBack />
        <BrokerFeedBack />
        <BrokerFeedBack />
      </Container>
    </>
  )
}

export default page
