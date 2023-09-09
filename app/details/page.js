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
  Box,
  Chip,
  Rating,
} from "@mui/material";
import DetailsTable from "Components/DetailsPage/DetailsTable";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import React from "react";
import BrokerCard from "@/Components/BrokersPage/BrokerCard";

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
    const { children, styles, boxStyles, ...rest } = props;
    return (
      <Grid
        item
        {...rest}
        sx={{
          padding: 1,
          textAlign: "center",
          ...styles,
        }}
      >
        <Box
          sx={{
            backgroundColor: "whitesmoke",
            p: 2,
            borderRadius: "8px",
            ...boxStyles,
          }}
        >
          {children}
        </Box>
      </Grid>
    );
  };

  const GridItemWithCard = (props) => {
    const { children, styles, boxStyles, ...rest } = props;
    return (
      <Grid
        item
        {...rest}
        sx={{
          padding: 1,
          textAlign: "center",
          ...styles,
        }}
      >
        <Box
          sx={{
            backgroundColor: "whitesmoke",
            p: 2,
            borderRadius: "8px",
            boxShadow:
              "0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)",
            ...boxStyles,
          }}
        >
          {children}
        </Box>
      </Grid>
    );
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  const [amenitiesTabs, setAmenitiesTab] = React.useState(0);

  const handleAmenitiesTabChange = (event, newValue) => {
    setAmenitiesTab(newValue);
  };

  const [brokersList, setBrokersList] = React.useState([
    { name: "Anand Gupta", type: "Consultant", stars: 4, clients: 432 },
    { name: "Anand Gupta", type: "Consultant", stars: 5, clients: 45 },
  ]);

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
                <Grid item xs={12}>
                  <Card sx={{ p: 2, display: "flex" }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h3"
                        sx={{ fontWeight: "700 !important" }}
                      >
                        Godrej woods
                      </Typography>
                      <Typography variant="h4" sx={{ alignSelf: "center" }}>
                        ₹ 2.5 Cr – ₹ 5.6 Cr
                      </Typography>
                    </Box>
                    <Box sx={{ alignSelf: "center" }}>
                      <Card sx={{ p: 2, background: "black" }}>
                        <Typography
                          variant="h4"
                          sx={{ fontWeight: 600, color: "white" }}
                        >
                          99
                        </Typography>
                      </Card>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ p: 2, height: "100%" }}>
                    <Typography variant="h5">Sector 43, Noida, UP</Typography>
                    <Typography variant="subtitle1">
                      Block A, Sector 43, Noida, Uttar Pradesh 201303
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
                  <Card sx={{ p: 2, display: "flex" }}>
                    <Box sx={{ display: "flex", flex: 1, alignSelf: "center" }}>
                      <PeopleIcon sx={{ mr: 1 }} />
                      <Typography variant="body1" sx={{}}>
                        88 people enquired for this so far
                      </Typography>
                    </Box>
                    <Chip
                      icon={<WhatsAppIcon />}
                      label="Share on whatsapp"
                      sx={{ mr: 2 }}
                      onClick={() => {}}
                    />
                    <Chip
                      icon={<AssignmentIcon />}
                      label="Enquire now"
                      onClick={() => {}}
                    />
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
                    <Tab label="Detail" />
                    <Tab label="Master plan" />
                    <Tab label="Layout·Price" />
                    <Tab label="Amenities" />
                    <Tab label="Location" />
                    <Tab label="Score" />
                  </Tabs>
                  <CustomTabPanel value={currentTab} index={0}>
                    <Grid container sx={{ p: 1 }}>
                      <GridItem xs={3}>
                        <Typography variant="subtitle1">
                          Project area
                        </Typography>
                        <Typography variant="h6">14 acre</Typography>
                      </GridItem>
                      <GridItem xs={3}>
                        <Typography variant="subtitle1">Type</Typography>
                        <Typography variant="h6">Booking</Typography>
                      </GridItem>
                      <GridItem xs={3}>
                        <Typography variant="subtitle1">
                          No of towers
                        </Typography>
                        <Typography variant="h6">5</Typography>
                      </GridItem>
                      <GridItem xs={3}>
                        <Typography variant="subtitle1">Furnished</Typography>
                        <Typography variant="h6">Yes</Typography>
                      </GridItem>
                    </Grid>
                  </CustomTabPanel>
                  <CustomTabPanel value={currentTab} index={1}>
                    <img
                      height="350"
                      src="https://www.godrejproperties.com/backoffice/data_content/projects/godrej_golf_links_noida/microsite/plan_img/Master-plan.jpg"
                    />
                  </CustomTabPanel>
                  <CustomTabPanel value={currentTab} index={2}>
                    <Grid container sx={{ p: 1 }}>
                      <GridItemWithCard
                        xs={3}
                        boxStyles={{ backgroundColor: "none" }}
                      >
                        <Typography variant="subtitle1">3 BHK</Typography>
                        <img
                          width="100%"
                          src="https://projectcdn.99acres.com/project_data/8d33f2/block1_1927/3D/5309_B1_1F1_3D.jpg"
                        />

                        <Typography variant="h5">1545 Sq ft</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                          ₹ 2.3 Cr
                        </Typography>
                      </GridItemWithCard>
                      <GridItemWithCard
                        xs={3}
                        boxStyles={{ backgroundColor: "none" }}
                      >
                        <Typography variant="subtitle1">4 BHK</Typography>
                        <img
                          width="100%"
                          src="https://projectcdn.99acres.com/project_data/8d33f2/block1_1927/3D/5309_B1_1F1_3D.jpg"
                        />
                        <Typography variant="h5">22 Sq ft</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                          ₹ 2.3 Cr
                        </Typography>
                      </GridItemWithCard>
                      <GridItemWithCard
                        xs={3}
                        boxStyles={{ backgroundColor: "none" }}
                      >
                        <Typography variant="subtitle1">5 BHK</Typography>
                        <img
                          width="100%"
                          src="https://projectcdn.99acres.com/project_data/8d33f2/block1_1927/3D/5309_B1_1F1_3D.jpg"
                        />
                        <Typography variant="h5">22 Sq ft</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                          ₹ 2.3 Cr
                        </Typography>
                      </GridItemWithCard>
                      <GridItemWithCard
                        xs={3}
                        boxStyles={{ backgroundColor: "none" }}
                      >
                        <Typography variant="subtitle1">5 BHK</Typography>
                        <img
                          width="100%"
                          src="https://projectcdn.99acres.com/project_data/8d33f2/block1_1927/3D/5309_B1_1F1_3D.jpg"
                        />
                        <Typography variant="h5">22 Sq ft</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                          ₹ 2.3 Cr
                        </Typography>
                      </GridItemWithCard>
                    </Grid>
                  </CustomTabPanel>
                  <CustomTabPanel value={currentTab} index={3}>
                    <Tabs
                      value={amenitiesTabs}
                      onChange={handleAmenitiesTabChange}
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="scrollable auto tabs example"
                    >
                      <Tab label="All" />
                      <Tab label="Need " />
                      <Tab label="Wants" />
                      <Tab label="Beyond" />
                    </Tabs>
                    <Grid container sx={{ p: 2 }}>
                      <Grid item xs={4}>
                        Maintenance Staff
                      </Grid>
                      <Grid item xs={4}>
                        Need
                      </Grid>
                      <Grid item xs={4}>
                        <Box
                          sx={{
                            width: 200,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Rating
                            name="text-feedback"
                            value={5}
                            readOnly
                            precision={0.5}
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                              />
                            }
                          />
                          <Box sx={{ ml: 2 }}>{labels[5]}</Box>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        Garden
                      </Grid>
                      <Grid item xs={4}>
                        Want
                      </Grid>
                      <Grid item xs={4}>
                        <Box
                          sx={{
                            width: 200,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Rating
                            name="text-feedback"
                            value={5}
                            readOnly
                            precision={0.5}
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                              />
                            }
                          />
                          <Box sx={{ ml: 2 }}>{labels[5]}</Box>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        Club House
                      </Grid>
                      <Grid item xs={4}>
                        Beyond
                      </Grid>
                      <Grid item xs={4}>
                        <Box
                          sx={{
                            width: 200,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Rating
                            name="text-feedback"
                            value={5}
                            readOnly
                            precision={0.5}
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                              />
                            }
                          />
                          <Box sx={{ ml: 2 }}>{labels[5]}</Box>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        Library
                      </Grid>
                      <Grid item xs={4}>
                        Need
                      </Grid>
                      <Grid item xs={4}>
                        <Box
                          sx={{
                            width: 200,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Rating
                            name="text-feedback"
                            value={5}
                            readOnly
                            precision={0.5}
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                              />
                            }
                          />
                          <Box sx={{ ml: 2 }}>{labels[5]}</Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </CustomTabPanel>
                  <CustomTabPanel value={currentTab} index={4}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30144.970768064195!2d72.8535903!3d19.1899016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6ee06ebad2b%3A0x9c288235c433657d!2sInfiniti%20Mall!5e0!3m2!1sen!2sin!4v1694174929476!5m2!1sen!2sin"
                      style={{ border: 0 }}
                      height="100%"
                      width="100%"
                      loading="lazy"
                    />
                  </CustomTabPanel>
                  <CustomTabPanel value={currentTab} index={5}>
                    <Box sx={{ p: 2, textAlign: "center" }}>
                      <Typography variant="body1">
                        Godrej Woods project has scored
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          width: "fit-content",
                          margin: "auto",
                        }}
                      >
                        <Typography variant="h1">99</Typography>
                        <Typography variant="h5" sx={{ alignSelf: "center" }}>
                          /100
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        Our authorized professional consultants help you decide
                        whether to buy as Investor / End user. Contact us now
                      </Typography>
                      <Chip
                        icon={<WhatsAppIcon />}
                        label="Contact us on whatsapp"
                        sx={{ mr: 2 }}
                        onClick={() => {}}
                      />
                      <Chip
                        icon={<AssignmentIcon />}
                        label="Enquire now"
                        onClick={() => {}}
                      />
                    </Box>
                  </CustomTabPanel>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h4">Need help?</Typography>
                  <Typography variant="body2">
                    Contact our consultant
                  </Typography>
                </Box>
              </Grid>

              {brokersList.map((broker) => (
                <Grid item xs={6}>
                  <BrokerCard key={broker?.name} broker={broker} />
                </Grid>
              ))}

              <Grid item xs={12}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Are you a professional real estate consultant, serve 544
                    Clients for Godrej Woods
                  </Typography>
                  <Chip
                    label="Yes"
                    icon={<WhatsAppIcon />}
                    sx={{ mr: 2 }}
                    onClick={() => {}}
                  />
                  <Chip
                    label="Register"
                    icon={<AssignmentIcon />}
                    onClick={() => {}}
                  />
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      {/* <Card>
        <Grid container>
          <Grid item xs={12} sx={{ p: 2 }}>
            <Typography variant="h2">{propertyData.title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sx={{ p: 2 }}>
            <Typography variant="body1">{propertyData.description}</Typography>
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
      </Card> */}
    </Container>
  );
};

export default PropertyDetailsPage;
