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
import CustomSearchInput from "Components/CommonLayouts/SearchInput";

function Brokers() {
  const router = useRouter();

  const [brokersList, setBrokersList] = React.useState([
    { name: "Anand Gupta", type: "Consultant", stars: 4, clients: 432 },
    { name: "Raghav Patel", type: "Consultant", stars: 5, clients: 45 },
  ]);

  return (
    <>
      <Box sx={{ background: 'white', borderBottom: '1px solid whitesmoke', boxShadow: '1px 2px 2px -2px gainsboro!important' }}>
        <Container>
          <Typography variant='h3' sx={{ my: 2, ml: 2 }}>
            75 consultant may be interested to work with you
          </Typography>
          <Card>
            <CustomSearchInput />
          </Card>
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
            <Grid item xs={12} key={broker.name}>
              <BrokerCard broker={broker} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Brokers;
