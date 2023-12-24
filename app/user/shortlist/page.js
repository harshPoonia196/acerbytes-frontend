"use client";

import {
  Container,
  Grid,
  Card,
  InputBase,
  Box,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import PropertyCard from "Components/PropertyList/PropertyCard";
import SearchIcon from "@mui/icons-material/Search";
import SelectTextFields from "Components/CommonLayouts/SelectTextFields";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import React from "react";

function ShortList() {
  const [alignment, setAlignment] = React.useState("asc");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <>
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
