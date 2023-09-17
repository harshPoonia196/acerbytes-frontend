"use client";

import React, { useState } from "react";
import { Button, Container, Grid, Typography, Box } from "@mui/material";
import BrokerCard from "Components/BrokersPage/BrokerCard";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function Brokers() {
  const [brokersList, setBrokersList] = React.useState([
    { name: "Anand Gupta", type: "Consultant", stars: 4, clients: 432 },
    { name: "Raghav Patel", type: "Consultant", stars: 5, clients: 45 },
  ]);

  return (
    <>
      <Box sx={{ backgroundColor: "white" }}>
        <Container sx={{ pb: "0 !important", textAlign: "center" }}>
          <Box sx={{ py: 4 }}>
            <Typography variant="h4">
              Connect with our professional real estate consultant
            </Typography>
            <Typography variant="h6">75 Active consultant</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box>
                <Button variant="contained" sx={{ mt: 2 }}>
                  Join Now
                </Button>
              </Box>
              <Box>
                <Button startIcon={<WhatsAppIcon />}>Share</Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container>
        <Grid container spacing={2}>
          {brokersList?.map((broker) => (
            <Grid item xs={12} sm={6} key={broker.name}>
              <BrokerCard broker={broker} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Brokers;
