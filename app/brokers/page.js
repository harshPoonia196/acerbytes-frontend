"use client";

import React from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  Box,
  Card,
  InputBase,
  IconButton,
} from "@mui/material";
import BrokerCard from "Components/BrokersPage/BrokerCard";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

function Brokers() {
  const router = useRouter();

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
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => router.push("/join-now")}
                >
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
          <Grid item xs={12}>
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
          </Grid>
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
