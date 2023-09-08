"use client";

import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import DetailsTable from "Components/DetailsPage/DetailsTable";
import React from "react";

const PropertyDetailsPage = () => {
  // Sample property data (replace this with your actual data)
  const propertyData = {
    id: "propertyId",
    title: "Stunning Oceanfront Villa",
    description: "A luxurious villa with breathtaking ocean views.",
    imageUrl:
      "https://www.county107.com/campaign/upload/gallery/BANNER1-desktop.jpg",
    price: "2.5 Cr",
    area: "2500 sqft",
    bedrooms: 4,
    bathrooms: 3,
    location: "Beachside Avenue, Coastal City",
  };

  const GridItem = (props) => {
    const { children, ...rest } = props;
    return (
      <Grid item {...rest} sx={{ padding: 2, textAlign: "center" }}>
        {children}
      </Grid>
    );
  };

  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Container>
      <Card>
        {/* Add a slider here */}
        <CardMedia
          component="img"
          height="300"
          image={propertyData.imageUrl}
          alt={propertyData.title}
        />
        <CardContent sx={{ p: "0 !important" }}>
          <Grid container>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12}>
                  <Card sx={{ p: 2 }}>
                    <Typography variant="h5">Godrej woods</Typography>
                    <Typography variant="subtitle1">Godrej group</Typography>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card sx={{ p: 2 }}>
                    <Typography variant="h5">Sector 43, Noida, UP</Typography>
                    <Typography variant="subtitle1">
                      Block A, Sector 43, Noida, Uttar Pradesh 201303
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ height: "100%" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30144.970768064195!2d72.8535903!3d19.1899016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6ee06ebad2b%3A0x9c288235c433657d!2sInfiniti%20Mall!5e0!3m2!1sen!2sin!4v1694174929476!5m2!1sen!2sin"
                  style={{ border: 0 }}
                  height="100%"
                  width="100%"
                  loading="lazy"
                ></iframe>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ p: 2, height: "100%", display: "flex" }}>
                <Typography variant="h5" sx={{ alignSelf: "center" }}>
                  ₹ 2.5 cr – ₹ 5.6 cr
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ p: 2 }}>
                <Typography variant="h5">Under construction</Typography>
                <Typography variant="subtitle1">
                  Possession by Dec 2026
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="Master plan" />
                <Tab label="Layout" />
                <Tab label="Amenities" />
                <Tab label="Score" />
                <Tab label="Price" />
                <Tab label="Location" />
              </Tabs>
            </Grid>
            <Grid item xs={12} sx={{ p: 2 }}>
              <Typography variant="h2">{propertyData.title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} sx={{ p: 2 }}>
              <Typography variant="body1">
                {propertyData.description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Fresh sale</Typography>
              <Typography variant="h2">22</Typography>
              <Typography variant="h5">₹ 10 Cr - ₹ 20 Cr</Typography>
            </GridItem>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Resale</Typography>
              <Typography variant="h2">22</Typography>
              <Typography variant="h5">₹ 10 L - ₹ 20 L</Typography>
            </GridItem>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Rent</Typography>
              <Typography variant="h2">22</Typography>
              <Typography variant="h5">₹ 10 K - ₹ 20 K</Typography>
            </GridItem>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <DetailsTable />
            </Grid>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Lumex</Typography>
              <Typography variant="h2">1545</Typography>
              <Typography variant="h5">Sqft</Typography>
            </GridItem>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Caspia</Typography>
              <Typography variant="h2">22</Typography>
              <Typography variant="h5">sqft</Typography>
            </GridItem>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Gardenia</Typography>
              <Typography variant="h2">22</Typography>
              <Typography variant="h5">sqft</Typography>
            </GridItem>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Status</Typography>
              <Typography variant="h6">Ats Green</Typography>
            </GridItem>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Status</Typography>
              <Typography variant="h6">Ats Green</Typography>
            </GridItem>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Status</Typography>
              <Typography variant="h6">Ats Green</Typography>
            </GridItem>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Status</Typography>
              <Typography variant="h6">Ats Green</Typography>
            </GridItem>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Status</Typography>
              <Typography variant="h6">Ats Green</Typography>
            </GridItem>
            <GridItem xs={4}>
              <Typography variant="subtitle1">Status</Typography>
              <Typography variant="h6">Ats Green</Typography>
            </GridItem>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PropertyDetailsPage;
