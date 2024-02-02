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
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import NewMultiSelectAutoCompleteInputStructure from "Components/CommonLayouts/NewMultiSelectAutoCompleteInputStructure";

function PropertyList() {
  const [alignment, setAlignment] = React.useState("asc");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <Container maxWidth="lg">
      <Card sx={{ mb: 2 }}>
        <Grid container sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                p: 2,
                height: "100%",
                boxShadow: "none",
              }}
            >
              <Typography variant="h2">Noida</Typography>
              <Typography variant="caption">
                Noida's strategic location, robust infrastructure, and
                flourishing business environment have contributed to its status
                as a vibrant and attractive real estate destination in the NCR
                region.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Card>

      <Grid container spacing={2} columns={36}>
        {/* commercial,residential */} {/*please delete this after done and same for all below*/}
        <NewMultiSelectAutoCompleteInputStructure label="Category" />
        {/* Flat,shop */}
        <NewMultiSelectAutoCompleteInputStructure label="Property type" />
        {/* 1BHK, 2BHK */}
        <NewMultiSelectAutoCompleteInputStructure label="Unit type" />
        {/* Noida,gurgoan */}
        <NewMultiSelectAutoCompleteInputStructure label="City" />
        {/* Sector/area */}
        <NewMultiSelectAutoCompleteInputStructure label="Location" />
        <NewMultiSelectAutoCompleteInputStructure label="Status" />
        <Grid item xs={18} sx={{ alignSelf: "center" }}>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            sx={{ display: "flex" }}
            size="small"
          >
            <ToggleButton value="score" sx={{ flex: 1 }}>
              Score
            </ToggleButton>
            <ToggleButton value="price" sx={{ flex: 1 }}>
              Price
            </ToggleButton>
            <ToggleButton value="area" sx={{ flex: 1 }}>
              Area
            </ToggleButton>
            <ToggleButton value="completion" sx={{ flex: 1 }}>
              Completion
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={18} sx={{ alignSelf: "center" }}>
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
              <ArrowUpwardIcon fontSize="small" />
              Low to high
            </ToggleButton>
            <ToggleButton value="dec" sx={{ flex: 1 }}>
              <ArrowDownwardIcon fontSize="small" />
              High to low
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={36}>
          <Card>
            <CustomSearchInput />
          </Card>
        </Grid>
        <Grid item xs={36}>
          <Grid container spacing={0.25}>
            <Grid item xs={12}>
              <PropertyCard isShortListPageCard />
            </Grid>
            <Grid item xs={12}>
              <PropertyCard />
            </Grid>
            <Grid item xs={12}>
              <PropertyCard />
            </Grid>
            <Grid item xs={12}>
              <PropertyCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PropertyList;
