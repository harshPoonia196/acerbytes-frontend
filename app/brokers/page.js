"use client";

import React from "react";
import { Button, Card, Container, Grid, Typography } from "@mui/material";
import BrokerCard from "Components/BrokersPage/BrokerCard";

function Brokers() {
  const [brokersList, setBrokersList] = React.useState([
    { name: "Anand Gupta", type: "Consultant", stars: 4, clients: 432 },
    { name: "Raghav PAtel", type: "Consultant", stars: 5, clients: 45 },
  ]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h5">
              Connect with our professional real estate consultant
            </Typography>
            <Typography variant="h6">75 Active consultant</Typography>
          </Card>
        </Grid>
        {brokersList?.map((broker) => (
          <Grid item xs={6} key={broker.name}>
            <BrokerCard broker={broker} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Brokers;
