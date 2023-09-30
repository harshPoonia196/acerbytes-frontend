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

function PropertyList() {
  const [alignment, setAlignment] = React.useState("asc");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <>
      <Box sx={{ p: 2, py: 6, backgroundColor: "white", textAlign: "center" }}>
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Research.Consult.Decide
        </Typography>
        <Typography variant="h6">Research. Consult. Decide</Typography>
      </Box>
      <Card>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={6}>
              <Card
                sx={{
                  p: 2,
                  height: "100%",
                  boxShadow: "none",
                }}
              >
                <Typography variant="h3">Noida</Typography>
                <Typography variant="caption">
                  Noida's strategic location, robust infrastructure, and
                  flourishing business environment have contributed to its
                  status as a vibrant and attractive real estate destination in
                  the NCR region.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ boxShadow: "none" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30144.970768064195!2d72.8535903!3d19.1899016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6ee06ebad2b%3A0x9c288235c433657d!2sInfiniti%20Mall!5e0!3m2!1sen!2sin!4v1694174929476!5m2!1sen!2sin"
                  style={{ border: 0 }}
                  height="100%"
                  width="100%"
                  loading="lazy"
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Card>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
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
          <Grid item xs={6} sm={3}>
            <SelectTextFields label="Sort by" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <SelectTextFields label="Filter by" />
          </Grid>
          <Grid item xs={6} sm={3} sx={{ alignSelf: "center" }}>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              sx={{ display: "flex" }}
              size="small"
            >
              <ToggleButton value="asc" sx={{ flex: 1 }}>
                <ArrowUpwardIcon />
              </ToggleButton>
              <ToggleButton value="dec" sx={{ flex: 1 }}>
                <ArrowDownwardIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={0.25}>
              <Grid item xs={12} sm={6} md={12}>
                <PropertyCard />
              </Grid>
              <Grid item xs={12} sm={6} md={12}>
                <PropertyCard />
              </Grid>
              <Grid item xs={12} sm={6} md={12}>
                <PropertyCard />
              </Grid>
              <Grid item xs={12} sm={6} md={12}>
                <PropertyCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default PropertyList;
