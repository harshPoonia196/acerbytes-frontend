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
  Avatar,
  Button,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Fab from "@mui/material/Fab";
import React, { useState, useEffect } from "react";
import EnquireNow from "Components/DetailsPage/Modal/EnquireNow";
import OtpVerify from "Components/DetailsPage/Modal/OtpVerify";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ReplyIcon from "@mui/icons-material/Reply";
import AlternateSignIn from "Components/DetailsPage/Modal/AlternateSignIn";
import TopMenu from "Components/DetailsPage/TopMenu";
import MarketingSection from "Components/DetailsPage/MarketingSection";
import LocationSection from "Components/DetailsPage/LocationSection";
import LandscapeSection from "Components/DetailsPage/LandscapeSection";
// import FloorPlanSection from "Components/DetailsPage/FloorPlanSection";
import AmenitiesSection from "Components/DetailsPage/AmenitiesSection";
import ClearanceSection from "Components/DetailsPage/ClearanceSection";
import ValueForMoneySection from "Components/DetailsPage/ValueForMoneySection";
// import PricingSection from 'Components/DetailsPage/PricingSection'
// import ResaleSection from "Components/DetailsPage/ResaleSection";
import OverallAssesmentSection from "Components/DetailsPage/OverallAssesmentSection";
import UnitsPlanSection from "Components/DetailsPage/UnitsPlanSection";
// import { useSearchParams } from 'next/navigation'
// import { useRouter } from 'next/router';
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { makeStyles, withStyles } from "@mui/styles";
import throttle from "lodash/throttle";
import {
  listOfPropertyDetailsTab,
  listOfTabsInAddProperty,
} from "utills/Constants";
import { activeAdGet, favPropertyCreate } from "api/Property.api";
import Loader from "Components/CommonLayouts/Loading";
import { useSnackbar } from "utills/SnackbarContext";
import { useAuth } from "utills/AuthContext";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import UserDetailsAd from "Components/DetailsPage/UserDetailsAd";
import { submitEnquiry } from "api/UserProfile.api";

const tabHeight = 200;

const useStyles = makeStyles((theme) => ({
  demo2: {
    backgroundColor: "#fff",
    position: "sticky",
    top: 54,
    left: 0,
    right: 0,
    zIndex: 100,
    [theme.breakpoints?.up("sm")]: {
      top: 64,
    },
  },
}));

const noop = () => { };

function useThrottledOnScroll(callback, delay) {
  const throttledCallback = React.useMemo(
    () => (callback ? throttle(callback, delay) : noop),
    [callback, delay]
  );

  React.useEffect(() => {
    if (throttledCallback === noop) return undefined;

    window.addEventListener("scroll", throttledCallback);
    return () => {
      window.removeEventListener("scroll", throttledCallback);
      throttledCallback.cancel();
    };
  }, [throttledCallback]);
}

const PropertyDetails = ({ params }) => {
  const { userDetails, isLogged } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const linkIdData = params.projectdetails;
  const parts = linkIdData.split("-");
  const getId = parts[parts.length - 1];

  const [isLoading, setLoading] = useState(false);
  const [propertyData, setPropertyData] = useState([]);

  const activeAdGetProperty = async () => {
    try {
      setLoading(true);
      let res = await activeAdGet(
        `${getId}${userDetails?._id ? `?brokerId=${userDetails?._id}` : ""}`
      );
      if (res.status === 200) {
        setPropertyData(res.data?.data);
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error fetching state list",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlefavClick = async () => {
    const adData = {
      propertyId: propertyData[0]?.property_id,
    };
    try {
      const response = await favPropertyCreate(adData);
      if (response.status == 200) {
        activeAdGetProperty();
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error generating fav Property",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const { openSnackbar } = useSnackbar();
  const showToaterMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  useEffect(() => {
    activeAdGetProperty();
  }, [userDetails]);

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
  const param = useParams();
  const [brokerContact, setBrokerContact] = React.useState(null);
  const handleAmenitiesTabChange = (event, newValue) => {
    setAmenitiesTab(newValue);
  };


  const [openEnquiryForm, setOpenEnquiryForm] = React.useState(false);
  const [OverallAssesmentOpenEnquiryForm, setOverallAssesmentOpenEnquiryForm] = React.useState(false);

  const handleOpenEnquiryForm = () => {
    setOpenEnquiryForm(true);
  };

  const handleCloseEnquiryForm = () => {
    setOpenEnquiryForm(false);
  };

  const [openOtpPopup, setOpenOtpPopup] = useState(false);

  const handleSubmitEnquiry = async (data) => {
    try {
      const response = await submitEnquiry(data);
      if (response.status == 200) {
        const { success, message } = response.data;
        if (success) {
          openSnackbar(message, "success");
          setBrokerContact({});
        } else {
          openSnackbar(message, "error");
        }
      }
    } catch (error) {
      openSnackbar(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong!",
        "error"
      );
      return error;
    }
  };

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

  const classes = useStyles();

  //All codes about scrolling

  const [alignment, setAlignment] = React.useState(
    listOfTabsInAddProperty[0].value
  );

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [activeState, setActiveState] = React.useState(null);

  let itemsServer = listOfPropertyDetailsTab.map((tab) => {
    const hash = tab.value;
    return {
      text: tab.label,
      hash: hash,
      node: document.getElementById(hash),
    };
  });

  const itemsClientRef = React.useRef([]);
  useEffect(() => {
    itemsClientRef.current = itemsServer;
  }, [itemsServer]);

  const clickedRef = React.useRef(false);
  const unsetClickedRef = React.useRef(null);

  const findActiveIndex = React.useCallback(() => {
    // set default if activeState is null
    if (activeState === null) setActiveState(itemsServer[0].hash);

    // Don't set the active index based on scroll if a link was just clicked
    if (clickedRef.current) return;

    let active;
    for (let i = itemsClientRef.current.length - 1; i >= 0; i -= 1) {
      // No hash if we're near the top of the page
      if (document.documentElement.scrollTop < 0) {
        active = { hash: null };
        break;
      }

      const item = itemsClientRef.current[i];

      if (
        item.node &&
        item.node.offsetTop <
          document.documentElement.scrollTop +
            document.documentElement.clientHeight / 8 +
            tabHeight
      ) {
        active = item;
        break;
      }
    }

    if (active && activeState !== active.hash) {
      setActiveState(active.hash);
    }
  }, [activeState, itemsServer]);

  // Corresponds to 10 frames at 60 Hz
  useThrottledOnScroll(itemsServer.length > 0 ? findActiveIndex : null, 166);

  const handleClick = (hash) => () => {
    // Used to disable findActiveIndex if the  scrolls due to a clickpage
    clickedRef.current = true;
    unsetClickedRef.current = setTimeout(() => {
      clickedRef.current = false;
    }, 1000);

    if (activeState !== hash) {
      setActiveState(hash);

      if (window)
        window.scrollTo({
          top:
            document.getElementById(hash)?.getBoundingClientRect().top +
            window.pageYOffset -
            tabHeight,
          behavior: "smooth",
        });
    }
  };

  React.useEffect(
    () => () => {
      clearTimeout(unsetClickedRef.current);
    },
    []
  );


  return (
    <>
      {isLoading && <Loader />}
        <UserDetailsAd  AllPropertyData={propertyData[0]}/>
      <nav className={classes.demo2}>
        <TopMenu
          topMenu={propertyData[0]?.propertyData}
          value={activeState}
          handleChange={handleClick}
          list={itemsServer}
        />
      </nav>
      <Box>
        <MarketingSection overviewData={propertyData[0]?.propertyData} />
        <Container maxWidth="evmd">
          {openEnquiryForm && <EnquireNow
            open={openEnquiryForm}
            handleClose={handleCloseEnquiryForm}
            handleAction={handleOpenVerifyPopup}
            submitEnquiry={handleSubmitEnquiry}
          />}
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

          <Grid container spacing={2} id="section-list">
            <ClearanceSection
              regulatoryClearanceData={
                propertyData[0]?.propertyData?.regulatoryClearance
              }
            />
            <LandscapeSection
              layoutData={propertyData[0]?.propertyData?.layout}
            />
            <UnitsPlanSection
              unitsPlan={propertyData[0]?.propertyData?.unitsPlan}
            />
            <AmenitiesSection
              amenitiesData={propertyData[0]?.propertyData?.amenitiesData}
            />
            <LocationSection
              locationData={propertyData[0]?.propertyData?.location}
            />
            {/* <PricingSection /> */}
            {/* <ResaleSection /> */}
            <ValueForMoneySection
              valueForMoneyData={propertyData[0]?.propertyData?.valueForMoney}
            />
            {/* <FloorPlanSection /> */}
            <OverallAssesmentSection
              overallAssessment={
                propertyData[0]?.propertyData?.overallAssessment
              }
              AllPropertyData={propertyData[0]?.propertyData}
              handleSubmitEnquiry={handleSubmitEnquiry}
              handleOpenEnquiryForm={()=> setOverallAssesmentOpenEnquiryForm(true)}
              open={OverallAssesmentOpenEnquiryForm}
              handleClose={()=> setOverallAssesmentOpenEnquiryForm(false)}
              handleAction={handleOpenVerifyPopup}
            />
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
              display: { xs: "block", evmd: "none" },
              background: "whitesmoke",
              boxShadow: "-1px -2px 6px 2px gainsboro !important",
            }}
          >
            <Box sx={{ mt: -1, ml: -1, display: "flex", flexWrap: "wrap" }}>
              <Button
                sx={{ mt: 1, ml: 1 }}
                variant="outlined"
                onClick={handleOpenEnquiryForm}
                startIcon={<ThumbUpOffAltIcon />}
              >
                Like
              </Button>
              <Button
                sx={{ mt: 1, ml: 1 }}
                variant="outlined"
                onClick={handleOpenEnquiryForm}
                startIcon={<ReplyIcon sx={{ transform: "scaleX(-1)" }} />}
              >
                Share
              </Button>

              <Button
                sx={{ mt: 1, ml: 1 }}
                variant="outlined"
                onClick={handleOpenEnquiryForm}
                startIcon={<WhatsAppIcon />}
              >
                Contact
              </Button>
              <Button
                sx={{ mt: 1, ml: 1 }}
                variant="outlined"
                onClick={handleOpenEnquiryForm}
                startIcon={<AssignmentIcon />}
              >
                Enquire
              </Button>
            </Box>
          </Card>
          {userDetails?.role !== "admin" &&
            userDetails?.role !== "superAdmin" && userDetails?.role !== "broker"  &&(
              <Box
                sx={{
                  position: "fixed",
                  right: 16,
                  bottom: 16,
                  display: { xs: "none", evmd: "flex" },
                  flexDirection: "column",
                }}
              >
                {isLogged ? (
                  <Fab
                    variant="extended"
                    sx={{ mb: 1, justifyContent: "flex-start" }}
                    onClick={handlefavClick}
                  >
                    {propertyData[0]?.isFav ? (
                      <ThumbUpIcon sx={{ color: "#276ef1", mr: 1 }} />
                    ) : (
                      <ThumbUpOffAltIcon sx={{ mr: 1 }} />
                    )}
                    Like
                  </Fab>
                ) : (
                  <Fab
                    variant="extended"
                    sx={{ mb: 1, justifyContent: "flex-start" }}
                    onClick={() => router.push("/login")}
                  >
                    <ThumbUpOffAltIcon sx={{ mr: 1 }} />
                    Like
                  </Fab>
                )}
                <Fab
                  variant="extended"
                  sx={{ mb: 1, justifyContent: "flex-start" }}
                >
                  <ReplyIcon sx={{ mr: 1, transform: "scaleX(-1)" }} />
                  Share
                </Fab>
                <a href={`https://wa.me/+919725555595`}>
                  <Fab
                    variant="extended"
                    sx={{ mb: 1, justifyContent: "flex-start" }}
                  >
                    <WhatsAppIcon sx={{ mr: 1 }} />
                    Contact
                  </Fab>
                </a>

                <Fab
                  variant="extended"
                  sx={{ justifyContent: "flex-start" }}
                  onClick={handleOpenEnquiryForm}
                >
                  <AssignmentIcon sx={{ mr: 1 }} />
                  Enquire
                </Fab>
              </Box>
            )}
        </Container>
      </Box>
    </>
  );
};

export default PropertyDetails;
