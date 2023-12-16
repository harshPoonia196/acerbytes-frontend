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
  Toolbar,
  Avatar, Button, IconButton, Tooltip
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
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

import ReplyIcon from "@mui/icons-material/Reply";
import PriceChart from "Components/DetailsPage/PriceChart";
import Link from "next/link";
import colors from "styles/theme/colors";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import AlternateSignIn from "Components/DetailsPage/Modal/AlternateSignIn";
import TopMenu from "Components/DetailsPage/TopMenu";
import { useCallback } from "react";
import { listOfTabsInAddProperty } from "Components/CommonLayouts/CommonUtils";
import MarketingSection from "Components/DetailsPage/MarketingSection";
import NewKeyValuePairStructure from "Components/CommonLayouts/NewKeyValuePairStructure";
import LocationSection from "Components/DetailsPage/LocationSection";
import LandscapeSection from "Components/DetailsPage/LandscapeSection";
import FloorPlanSection from "Components/DetailsPage/FloorPlanSection";
import CallIcon from '@mui/icons-material/Call';
import AmenitiesSection from "Components/DetailsPage/AmenitiesSection";
import ClearanceSection from "Components/DetailsPage/ClearanceSection";
import ValueForMoneySection from "Components/DetailsPage/ValueForMoneySection";
import PricingSection from 'Components/DetailsPage/PricingSection'
import ResaleSection from "Components/DetailsPage/ResaleSection";
import OverallAssesmentSection from "Components/DetailsPage/OverallAssesmentSection";
import LayoutSection from "Components/DetailsPage/LayoutSection";
import { Close } from "@mui/icons-material";
import DisableActivateAdsPopup from "Components/DetailsPage/Modal/DisableActivateAdsPopup";
import ActivateAdsPopup from "Components/DetailsPage/Modal/ActivateAdsPopup";
import { useSearchParams } from 'next/navigation'


const PropertyDetailsPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams()
  const name = searchParams.get('name')

  const { isDrawerOpen } = useSelector((state) => state);

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

  const [openOtpPopup, setOpenOtpPopup] = useState(false);

  const handleOpenVerifyPopup = () => {
    setOpenOtpPopup(true);
  };

  const handleCloseVerifyPopup = () => {
    setOpenOtpPopup(false);
  };

  const [openAlternateSignIn, setOpenAlternateSignIn] = useState(false);

  const handleOpenAlternateSignIn = () => {
    setOpenAlternateSignIn(true);
  };

  const handleCloseAlternateSignIn = () => {
    setOpenAlternateSignIn(false);
  };

  const sectionRef = useRef([])

  const [alignment, setAlignment] = React.useState(listOfTabsInAddProperty[0].value);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAlignment(entry.target.getAttribute('id'))
          console.log(alignment)
        }
      })

      console.log(entries)
    }, {
      root: null,
      rootMargin: "0px",
      threshold: 0.75,
    })

    sectionRef.current.forEach(section => {
      observer.observe(section)
    })

  }, [])

  const refCallback = useCallback((element) => {
    if (element) {
      sectionRef.current.push(element)
    }
  })

  const myDivRef = useRef(null)

  const [height, setHeight] = useState()

  useEffect(() => {
    if (myDivRef.current) {
      const myDiv = myDivRef.current;
      const heightCalc = myDiv.offsetHeight;
      setHeight(heightCalc)
      console.log('Width of the div:', heightCalc, 'pixels');
      console.log(myDiv)
    }
  }, []);

  const [disablePersonalizeAds, setDisablePersonalizeAds] = useState(false)

  const handleOpenPersonalizeAds = () => {
    setDisablePersonalizeAds(true)
  }

  const handleClosePersonalizeAds = () => {
    setDisablePersonalizeAds(false)
  }

  const [activateAdsPopupState, setActivateAdsPopupState] = useState(false)

  const handleOpenActivateAdsPopup = () => {
    setActivateAdsPopupState(true)
  }

  const handleCloseActivateAdsPopup = () => {
    setActivateAdsPopupState(false)
  }

  return (
    <>
      <ActivateAdsPopup open={activateAdsPopupState} handleClose={handleCloseActivateAdsPopup} />
      <DisableActivateAdsPopup open={disablePersonalizeAds} handleOpen={handleOpenPersonalizeAds} handleClose={handleClosePersonalizeAds} />
      <Box ref={myDivRef} >
        <Card sx={{ m: 2, mx: 8, mb: 2, position: 'relative' }}>
          <Box sx={{ borderBottom: '1px solid whitesmoke', background: 'whitesmoke' }}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex', p: 2, py: 1, flex: 1 }}>
                <Typography variant='h6' sx={{ mr: 1 }}>Contact Anand Gupta</Typography>
                <Rating
                  name="text-feedback"
                  value={4}
                  readOnly
                  precision={0.5}
                  sx={{ fontSize: '1rem', alignSelf: 'center' }}
                  emptyIcon={
                    <StarIcon
                      style={{ opacity: 0.55 }}
                      fontSize="inherit"
                    />
                  }
                />
                <Typography variant="h6" sx={{ alignSelf: 'center', ml: 1 }}>4.7 - for Godrej forest - Sector - 132 - Noida</Typography>
              </Box>
              <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <Tooltip title="Don't show me again">
                  {/* <IconButton> */}
                  <Close fontSize="1rem" sx={{ cursor: 'pointer' }} onClick={handleOpenPersonalizeAds} />
                  {/* </IconButton> */}
                </Tooltip>
              </Box>
            </Box>

            <Divider sx={{ borderColor: 'gainsboro' }} />
            <Box sx={{ alignSelf: 'center', p: 2, py: 1, display: 'flex' }}>
              <Typography variant='body2' sx={{ flex: 1 }}>https://abcd.com/aaad</Typography>
              <Typography variant='body2' className='urlStyling' style={{ color: colors.BLUE, cursor: 'pointer' }}>Copy link</Typography>
            </Box>
            <Divider sx={{ borderColor: 'gainsboro' }} />
            <Typography variant='body2' noWrap sx={{ p: 2, py: 1 }}>Our commitment to addressing escalating environmental issues led us to develop a sustainability strategy which creates long-term value for all our stakeholders, including the planet we live on</Typography>
            {/* <Divider sx={{ borderColor: 'gainsboro' }} /> */}
          </Box>
          <Box sx={{ p: 2, py: 1, display: 'flex' }}>
            <Typography variant='body2' sx={{ alignSelf: 'center' }}>
              <i>
                {
                  name?  'Your Link will expiry in 20 days' :
                  'Get your personalized URL to receive potential buyers queries directly in your leadsbox' 
                 
                }
              </i>
            </Typography>
            <Box sx={{ flex: 1, textAlign: 'end' }}>
              <Button variant='outlined' size='small' sx={{ fontSize: '0.875rem' }} onClick={handleOpenActivateAdsPopup} >{name? 'Extend' : `Activate link`}</Button>
            </Box>
          </Box>
        </Card>

        {/* <Box sx={{ display: 'flex' }}>
            <a
              href="tel:8794561234"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Button startIcon={<CallIcon fontSize="small" />} variant='outlined' size="small">932333366</Button>
            </a>

          </Box> */}

        <TopMenu value={alignment} handleChange={handleChange} />
      </Box >
      <Box sx={{
        height: `calc(100vh - ${height}px - 64px )`,
        overflow: 'auto'
      }}>
        <MarketingSection refCallback={refCallback} />

        <Container maxWidth="evmd">
          <EnquireNow
            open={openEnquiryForm}
            handleClose={handleCloseEnquiryForm}
            handleAction={handleOpenVerifyPopup}
            handleOpen={handleOpenEnquiryForm}
          />
          <OtpVerify
            open={openOtpPopup}
            handleClose={handleCloseVerifyPopup}
            handleOpen={handleOpenEnquiryForm}
            handleAlternateSignIn={handleOpenAlternateSignIn}
          />
          <AlternateSignIn
            open={openAlternateSignIn}
            handleClose={handleCloseAlternateSignIn}
          />

          <Grid container spacing={2} id='section-list'>
            <LandscapeSection refCallback={refCallback} />
            <AmenitiesSection refCallback={refCallback} />
            <ClearanceSection refCallback={refCallback} />
            <PricingSection refCallback={refCallback} />
            <ValueForMoneySection refCallback={refCallback} />
            <ResaleSection refCallback={refCallback} />
            <LayoutSection refCallback={refCallback} />
            <FloorPlanSection refCallback={refCallback} />
            <LocationSection refCallback={refCallback} />
            <Grid item xs={12}>
              <Card>
                <CardContent sx={{ p: "0 !important" }}>
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Link
                        href="https://maps.app.goo.gl/rjVABonJgjjRjfdT9"
                        target="_blank"
                        style={{ textDecoration: "none" }}
                      >
                        <Card sx={{ p: 2, height: "100%" }}>
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
                      </Link>
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
                          onClick={() => { }}
                        />
                        <Chip
                          icon={<AssignmentIcon />}
                          label="Enquire now"
                          onClick={() => { }}
                        />
                      </Card>
                    </Grid>
                    <Grid item xs={12}>
                      <Card
                        sx={{
                          p: 2,
                          display: "flex",
                          overflowX: "auto",
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
                            onClick={() => { }}
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
                            onClick={() => { }}
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
                        scrollButtons
                        allowScrollButtonsMobile
                        aria-label="scrollable auto tabs example"
                      >
                        <Tab label="Detail" />
                        <Tab label="More" />
                        <Tab label="Layout·Price" />
                        <Tab label="Amenities" />
                        <Tab label="Location" />
                        <Tab label="Assesment" />
                      </Tabs>
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
                          scrollButtons
                          allowScrollButtonsMobile
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
                                size="small"
                                emptyIcon={
                                  <StarIcon
                                    style={{ opacity: 0.55 }}
                                    fontSize="inherit"
                                  />
                                }
                              />
                              <Box sx={{ ml: { xs: 0, sm: 2 } }}>{labels[5]}</Box>
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
                                size="small"
                                emptyIcon={
                                  <StarIcon
                                    style={{ opacity: 0.55 }}
                                    fontSize="inherit"
                                  />
                                }
                              />
                              <Box sx={{ ml: { xs: 0, sm: 2 } }}>{labels[5]}</Box>
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
                                size="small"
                                emptyIcon={
                                  <StarIcon
                                    style={{ opacity: 0.55 }}
                                    fontSize="inherit"
                                  />
                                }
                              />
                              <Box sx={{ ml: { xs: 0, sm: 2 } }}>{labels[5]}</Box>
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
                                size="small"
                                emptyIcon={
                                  <StarIcon
                                    style={{ opacity: 0.55 }}
                                    fontSize="inherit"
                                  />
                                }
                              />
                              <Box sx={{ ml: { xs: 0, sm: 2 } }}>{labels[5]}</Box>
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
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={{ display: 'flex' }}>
                    <Box sx={{ flex: 1, alignSelf: 'center' }}>
                      <Typography variant="h4">Contact verified consultants</Typography>
                    </Box>
                    <Box>
                      <Chip
                        label="Register as a consultant"
                        icon={<AssignmentIcon fontSize="small" />}
                        size="small"
                        onClick={() => { }}
                        sx={{ fontSize: '0.875rem !important' }}
                      />
                    </Box>
                  </Grid>

                  {brokersList.map((broker) => (
                    <Grid item xs={12} sm={6} key={broker?.name}>
                      <BrokerCard broker={broker} noReview />
                    </Grid>
                  ))}

                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex' }}>
                      <Typography variant="body2" sx={{ flex: 1, alignSelf: 'center' }}>
                        Are you a professional real estate consultant, serve 544
                        Clients for Godrej Woods
                      </Typography>
                      <Chip
                        label="Yes"
                        icon={<WhatsAppIcon fontSize="small" />}
                        size="small"
                        sx={{ fontSize: "0.875rem" }}
                        onClick={() => { }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <OverallAssesmentSection refCallback={refCallback} />
          </Grid>

          {/* Dont Touch this */}
          <Toolbar sx={{ display: { xs: "flex", evmd: "none" } }} />

          <Card
            sx={{
              p: 2,
              position: "fixed",
              left: 0,
              bottom: 0,
              width: "100%",
              display: { xs: "flex", evmd: "none" },
              justifyContent: "space-between",
            }}
          >
            <Chip
              icon={<ThumbUpOffAltIcon fontSize="small" />}
              label="Like"
              onClick={handleOpenEnquiryForm}
            />
            <Chip
              icon={<ReplyIcon fontSize="small" sx={{ transform: "scaleX(-1)" }} />}
              label="Share"
              onClick={handleOpenEnquiryForm}
            />
            <Chip
              icon={<AssignmentIcon fontSize="small" />}
              label="Enquire"
              onClick={handleOpenEnquiryForm}
            />
            <Chip
              icon={<WhatsAppIcon fontSize="small" />}
              label="Contact"
              onClick={handleOpenEnquiryForm}
            />
          </Card>

          <Box
            sx={{
              position: "fixed",
              right: 16,
              bottom: 16,
              display: { xs: "none", evmd: "flex" },
              flexDirection: "column",
            }}
          >
            <Fab variant="extended" sx={{ mb: 2, justifyContent: "flex-start" }}>
              <ThumbUpOffAltIcon sx={{ mr: 1 }} />
              Like
            </Fab>
            <Fab variant="extended" sx={{ mb: 2, justifyContent: "flex-start" }}>
              <ReplyIcon sx={{ mr: 1, transform: "scaleX(-1)" }} />
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
      </Box>
    </>
  );
};

export default PropertyDetailsPage;
