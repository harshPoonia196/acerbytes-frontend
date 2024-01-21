"use client";

import {
  Container,
  Grid,
  Card,
  Box,
  Typography,
} from "@mui/material";
import PropertyCard from "Components/PropertyList/PropertyCard";
import React from "react";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";

function ShortList() {
  const [alignment, setAlignment] = React.useState("asc");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <>
      <Box sx={{ background: 'white', borderBottom: '1px solid whitesmoke', boxShadow: '1px 2px 2px -2px gainsboro!important' }}>
        <Container maxWidth='lg'>
          <Typography variant='h3' sx={{ my: 2, ml: 2 }}>
            My favourite Properties (45)
          </Typography>
          <Card>
            <CustomSearchInput />
          </Card>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={0.25}>
              <Grid item xs={12} sm={6} md={12}>
                <PropertyCard isShortListPageCard />
              </Grid>
              <Grid item xs={12} sm={6} md={12}>
                <PropertyCard isShortListPageCard />
              </Grid>
              <Grid item xs={12} sm={6} md={12}>
                <PropertyCard isShortListPageCard />
              </Grid>
              <Grid item xs={12} sm={6} md={12}>
                <PropertyCard isShortListPageCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ShortList;
