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
import AssignmentIcon from "@mui/icons-material/Assignment";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import Fab from "@mui/material/Fab";
import React, { useState, useEffect, useRef } from "react";
import BrokerCard from "Components/BrokersPage/BrokerCard";
import EnquireNow from "Components/DetailsPage/Modal/EnquireNow";
import OtpVerify from "Components/DetailsPage/Modal/OtpVerify";
import ImageCarousel from "Components/DetailsPage/ImageCarousel";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PriceChart from "Components/DetailsPage/PriceChart";

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
    { name: "Raghav Patel", type: "Consultant", stars: 5, clients: 45 },
  ]);

  const [openEnquiryForm, setOpenEnquiryForm] = React.useState(false);

  const handleOpenEnquiryForm = () => {
    setOpenEnquiryForm(true);
  };

  const handleCloseEnquiryForm = () => {
    setOpenEnquiryForm(false);
  };

  const [openOtpPopup, setOpenOtpPopup] = useState();

  const handleOpenVerifyPopup = () => {
    setOpenOtpPopup(true);
  };

  const handleCloseVerifyPopup = () => {
    setOpenOtpPopup(false);
  };

  return (
    <Container maxWidth="md">
      <EnquireNow
        open={openEnquiryForm}
        handleClose={handleCloseEnquiryForm}
        handleAction={handleOpenVerifyPopup}
      />
      <OtpVerify open={openOtpPopup} handleClose={handleCloseVerifyPopup} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <ImageCarousel />
            <CardContent sx={{ p: "0 !important" }}>
              <Grid container>
                <Grid item xs={12}>
                  <Card
                    sx={{
                      p: 2,
                      display: "flex",
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: "700 !important" }}
                      >
                        Godrej woods
                      </Typography>
                      <Typography variant="h5" sx={{ alignSelf: "center" }}>
                        ₹ 2.5 Cr – ₹ 5.6 Cr
                      </Typography>
                    </Box>
                    <Box sx={{ alignSelf: "center" }}>
                      <Card sx={{ p: 2, background: "black" }}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, color: "white" }}
                        >
                          99
                        </Typography>
                      </Card>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card sx={{ p: 2, height: "100%", cursor: "pointer" }}>
                    <Box sx={{ display: "flex" }}>
                      <Typography variant="h5" sx={{ flex: 1 }}>
                        Sector 43, Noida, UP
                      </Typography>
                      <KeyboardArrowRightIcon />
                    </Box>
                    <Typography variant="caption">
                      Block A, Sector 43, Noida, Uttar Pradesh 201303
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card sx={{ p: 2, height: "100%" }}>
                    <Typography variant="h5">Under construction</Typography>
                    <Typography variant="caption">
                      Possession by Dec 2026
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flex: 1,
                        alignSelf: "center",
                        mb: { xs: 2, sm: 0 },
                      }}
                    >
                      <PeopleIcon sx={{ mr: 1 }} />
                      <Typography variant="body1" sx={{ alignSelf: "center" }}>
                        88 people enquired for this so far
                      </Typography>
                    </Box>
                    <Chip
                      icon={<WhatsAppIcon />}
                      label="Share on whatsapp"
                      sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 } }}
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
                  <Card
                    sx={{
                      p: 2,
                      display: "flex",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        ml: -2,
                        mt: -2,
                      }}
                    >
                      <Chip
                        icon={<CurrencyRupeeIcon fontSize="1rem" />}
                        label="1.2 Cr · 2.5 BHK · 1582 sqft"
                        sx={{
                          ml: 2,
                          mt: 2,
                          "& .MuiChip-label": {
                            pl: "4px",
                          },
                        }}
                        onClick={() => {}}
                      />
                      <Chip
                        icon={<CurrencyRupeeIcon fontSize="1rem" />}
                        label="1.2 Cr · 2.5 BHK · 1582 sqft"
                        sx={{
                          ml: 2,
                          mt: 2,
                          "& .MuiChip-label": {
                            pl: "4px",
                          },
                        }}
                        onClick={() => {}}
                      />
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card>
                    <Box sx={{ mx: -6 }}>
                      <PriceChart />
                    </Box>
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
                    <Tab label="More" />
                    <Tab label="Layout·Price" />
                    <Tab label="Amenities" />
                    <Tab label="Location" />
                    <Tab label="Assesment" />
                  </Tabs>
                  <CustomTabPanel value={currentTab} index={0}>
                    <Grid container sx={{ p: 1 }}>
                      <GridItem xs={6} sm={2}>
                        <Typography variant="caption">Project area</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          14 acre
                        </Typography>
                      </GridItem>
                      <GridItem xs={6} sm={2}>
                        <Typography variant="caption">Type</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Booking
                        </Typography>
                      </GridItem>
                      <GridItem xs={6} sm={2}>
                        <Typography variant="caption">No of towers</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          5
                        </Typography>
                      </GridItem>
                      <GridItem xs={6} sm={2}>
                        <Typography variant="caption">Furnished</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Yes
                        </Typography>
                      </GridItem>
                      <GridItem xs={6} sm={2}>
                        <Typography variant="caption">No of towers</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          5
                        </Typography>
                      </GridItem>
                      <GridItem xs={6} sm={2}>
                        <Typography variant="caption">Furnished</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Yes
                        </Typography>
                      </GridItem>
                      <GridItem xs={6} sm={2}>
                        <Typography variant="caption">Project area</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          14 acre
                        </Typography>
                      </GridItem>
                      <GridItem xs={6} sm={2}>
                        <Typography variant="caption">Type</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Booking
                        </Typography>
                      </GridItem>
                      <GridItem xs={6} sm={2}>
                        <Typography variant="caption">No of towers</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          5
                        </Typography>
                      </GridItem>
                      <GridItem xs={6} sm={2}>
                        <Typography variant="caption">Furnished</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Yes
                        </Typography>
                      </GridItem>
                      <GridItem xs={6} sm={2}>
                        <Typography variant="caption">No of towers</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          5
                        </Typography>
                      </GridItem>
                      <GridItem xs={6} sm={2}>
                        <Typography variant="caption">Furnished</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Yes
                        </Typography>
                      </GridItem>
                    </Grid>
                  </CustomTabPanel>
                  <CustomTabPanel value={currentTab} index={1}></CustomTabPanel>
                  <CustomTabPanel value={currentTab} index={2}>
                    <Grid container sx={{ p: 1 }}>
                      <GridItemWithCard
                        xs={6}
                        sm={3}
                        boxStyles={{ backgroundColor: "none" }}
                      >
                        <Typography variant="subtitle1">3 BHK</Typography>
                        <img
                          width="100%"
                          alt=""
                          src="https://projectcdn.99acres.com/project_data/8d33f2/block1_1927/3D/5309_B1_1F1_3D.jpg"
                        />

                        <Typography variant="h5">1545 Sq ft</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                          ₹ 2.3 Cr
                        </Typography>
                      </GridItemWithCard>
                      <GridItemWithCard
                        xs={6}
                        sm={3}
                        boxStyles={{ backgroundColor: "none" }}
                      >
                        <Typography variant="subtitle1">4 BHK</Typography>
                        <img
                          width="100%"
                          alt=""
                          src="https://projectcdn.99acres.com/project_data/8d33f2/block1_1927/3D/5309_B1_1F1_3D.jpg"
                        />
                        <Typography variant="h5">22 Sq ft</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                          ₹ 2.3 Cr
                        </Typography>
                      </GridItemWithCard>
                      <GridItemWithCard
                        xs={6}
                        sm={3}
                        boxStyles={{ backgroundColor: "none" }}
                      >
                        <Typography variant="subtitle1">5 BHK</Typography>
                        <img
                          width="100%"
                          alt=""
                          src="https://projectcdn.99acres.com/project_data/8d33f2/block1_1927/3D/5309_B1_1F1_3D.jpg"
                        />
                        <Typography variant="h5">22 Sq ft</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                          ₹ 2.3 Cr
                        </Typography>
                      </GridItemWithCard>
                      <GridItemWithCard
                        xs={6}
                        sm={3}
                        boxStyles={{ backgroundColor: "none" }}
                      >
                        <Typography variant="subtitle1">5 BHK</Typography>
                        <img
                          width="100%"
                          alt=""
                          src="https://projectcdn.99acres.com/project_data/8d33f2/block1_1927/3D/5309_B1_1F1_3D.jpg"
                        />
                        <Typography variant="h5">22 Sq ft</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                          ₹ 2.3 Cr
                        </Typography>
                      </GridItemWithCard>
                      <Grid item xs={12}>
                        <img
                          height="350"
                          alt=""
                          src="https://www.godrejproperties.com/backoffice/data_content/projects/godrej_golf_links_noida/microsite/plan_img/Master-plan.jpg"
                        />
                      </Grid>
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
                    <Grid container spacing={1} sx={{ p: 2 }}>
                      <Grid item xs={6} sm={4}>
                        <Typography variant="body1">
                          Maintenance Staff
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ display: { xs: "flex", sm: "none" } }}
                        >
                          (Need)
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        sx={{ display: { xs: "none", sm: "flex" } }}
                        sm={2}
                      >
                        <Typography variant="body1">Need</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: { xs: "column", sm: "row" },
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
                      <Grid item xs={6} sm={4}>
                        <Typography variant="body1">Garden</Typography>
                        <Typography
                          variant="body1"
                          sx={{ display: { xs: "flex", sm: "none" } }}
                        >
                          (Want)
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        sx={{ display: { xs: "none", sm: "flex" } }}
                        sm={2}
                      >
                        <Typography variant="body1">Want</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: { xs: "column", sm: "row" },
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
                      <Grid item xs={6} sm={4}>
                        <Typography variant="body1">Club House</Typography>
                        <Typography
                          variant="body1"
                          sx={{ display: { xs: "flex", sm: "none" } }}
                        >
                          (Beyond)
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        sx={{ display: { xs: "none", sm: "flex" } }}
                        sm={2}
                      >
                        <Typography variant="body1">Beyond</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: { xs: "column", sm: "row" },
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
                      <Grid item xs={6} sm={4}>
                        <Typography variant="body1">Library</Typography>
                        <Typography
                          variant="body1"
                          sx={{ display: { xs: "flex", sm: "none" } }}
                        >
                          (Need)
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        sx={{ display: { xs: "none", sm: "flex" } }}
                        sm={2}
                      >
                        <Typography variant="body1">Need</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: { xs: "column", sm: "row" },
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
                <Grid item xs={12} sm={6} key={broker?.name}>
                  <BrokerCard broker={broker} />
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

      <Box
        sx={{
          position: "fixed",
          right: 16,
          bottom: 16,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Fab variant="extended" sx={{ mb: 2, justifyContent: "flex-start" }}>
          <WhatsAppIcon sx={{ mr: 1 }} />
          Share
        </Fab>
        <Fab variant="extended" sx={{ mb: 2, justifyContent: "flex-start" }}>
          <WhatsAppIcon sx={{ mr: 1 }} />
          Contact
        </Fab>
        <Fab
          variant="extended"
          sx={{ justifyContent: "flex-start" }}
          onClick={handleOpenEnquiryForm}
        >
          <AssignmentIcon sx={{ mr: 1 }} />
          Enquire
        </Fab>
      </Box>
    </Container>
  );
};

export default PropertyDetailsPage;
