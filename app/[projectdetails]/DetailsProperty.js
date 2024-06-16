"use client";

import {
  Container,
  Card,
  Grid,
  Box,
  Toolbar,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Fab from "@mui/material/Fab";
import React, { useState, useEffect, useRef } from "react";
import EnquireNow from "Components/DetailsPage/Modal/EnquireNow";
import OtpVerify from "Components/DetailsPage/Modal/OtpVerify";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ReplyIcon from "@mui/icons-material/Reply";
import AlternateSignIn from "Components/DetailsPage/Modal/AlternateSignIn";
import TopMenu from "Components/DetailsPage/TopMenu";
import MarketingSection from "Components/DetailsPage/MarketingSection";
import LocationSection from "Components/DetailsPage/LocationSection";
import LandscapeSection from "Components/DetailsPage/LandscapeSection";
import AmenitiesSection from "Components/DetailsPage/AmenitiesSection";
import ClearanceSection from "Components/DetailsPage/ClearanceSection";
import ValueForMoneySection from "Components/DetailsPage/ValueForMoneySection";
import OverallAssesmentSection from "Components/DetailsPage/OverallAssesmentSection";
import UnitsPlanSection from "Components/DetailsPage/UnitsPlanSection";
import { useRouter, useSearchParams } from "next/navigation";
import { makeStyles } from "@mui/styles";
import throttle from "lodash/throttle";
import {
  enquiryFormKey,
  enquiryFormOpen,
  listOfPropertyDetailsTab,
  listOfTabsInAddProperty,
  propertyUserVerifiedKey,
  userLeadId,
} from "utills/Constants";
import {
  activeAdGet,
  activedViewCount,
  checkEnquiryOnActiveLink,
  detailsProperty,
  favPropertyCreate,
} from "api/Property.api";
import Loader from "Components/CommonLayouts/Loading";
import { useSnackbar } from "utills/SnackbarContext";
import { useAuth } from "utills/AuthContext";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import UserDetailsAd from "Components/DetailsPage/UserDetailsAd";
import {
  submitEnquiry,
  submitEnquiryUnauth,
  updateEnquiryVerified,
  updateEnquiryVerifiedByUserId,
} from "api/UserProfile.api";
import { clearItem, getItem } from "utills/utills";
import colors from "styles/theme/colors";
import CircularProgressSpinner from "Components/DetailsPage/CircularProgressSpinner";
import { getCountsByProperty } from "api/Broker.api";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Link from "next/link";
import ActivateAdsPopup from "Components/DetailsPage/Modal/ActivateAdsPopup";

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

const noop = () => {};

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
  const { userDetails, isLogged, brokerBalance, setBrokerPoints } = useAuth();
  const router = useRouter();
  const url = new URL(window.location.href);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [isLoading, setLoading] = useState(false);
  const [propertyData, setPropertyData] = useState([]);
  const [leadsCount, setLeadsCount] = useState(0);
  const [contactPermissionToView, setContactPermissionToView] = useState(false);
  const [progressCount, setProgressCount] = useState(6);
  const [leadId, setLeadId] = useState("");
  const expiredModalOpenRef = useRef(false);
  const [brokerContact, setBrokerContact] = React.useState(null);
  let expiredModalTimeout;

  const linkIdData = params.projectdetails;
  const parts = linkIdData.split("-");
  const getId = parts[parts.length - 1];

  const constructPropertyUrl = (propertyDetailsData) => {
    const overview = propertyDetailsData?.propertyData?.overview;
    const location = propertyDetailsData?.propertyData?.location;

    const projectCategory = encodeURIComponent(
      (overview?.projectCategory.trim() ?? "category")
        .replace(/\s+/g, "-")
        .replace(/\//g, "-")
    );
    let projectType;
    if (overview?.projectType?.length > 0) {
      projectType = overview.projectType
        .map((type) =>
          encodeURIComponent(
            type.value.trim().replace(/\s+/g, "-").replace(/\//g, "-")
          )
        )
        .join("-");
    } else {
      projectType = "type";
    }
    const city = encodeURIComponent(
      (location?.city.trim() ?? "city").replace(/\s+/g, "-").replace(/\//g, "-")
    );
    const sector = encodeURIComponent(
      (location?.sector.trim() ?? "sector")
        .replace(/[\s,]+/g, "-")
        .replace(/\//g, "-")
    );
    const area = encodeURIComponent(
      (location?.area.trim() ?? "area")
        .replace(/[\s,]+/g, "-")
        .replace("-#", "")
        .replace(/\//g, "-")
    );
    const projectName = encodeURIComponent(
      (overview?.projectName.trim() ?? "projectName")
        .replace(/\s+/g, "-")
        .replace(/\//g, "-")
    );

    return `${projectCategory}-${projectType}-${city}-${sector}-${area}-${projectName}-${propertyDetailsData?.property_id}`;
  };

  const activeAdGetProperty = async () => {
    try {
      setLoading(true);
      let res;
      if (isLogged && userDetails?._id) {
        let url = `${getId}${`?brokerId=${userDetails?._id}`}`;
        res = await activeAdGet(url);
      } else {
        let url = `${getId}`;
        res = await activeAdGet(url);
      }
      if (res.status === 200) {
        setPropertyData(res.data?.data);
        if (userDetails.role === "broker" && isLogged) {
          const result = await getCountsByProperty(
            res.data?.data?.[0]?.property_id,
            res.data?.data?.[0]?.broker_collection_id
          );
          setLeadsCount(result?.data?.count);
        }
        const expiredAt = new Date(res?.data?.data[0]?.expired_at);
        const now = new Date();
        const brokerData = res.data.data[0]?.brokerData;
        if (
          brokerData &&
          (brokerData?.isBlocked || brokerData.role !== "broker")
        ) {
          router.push(`details/${constructPropertyUrl(res.data?.data[0])}`);
        } else if (
          expiredAt &&
          now > expiredAt &&
          !expiredModalOpenRef.current
        ) {
          expiredModalOpenRef.current = true;
          expiredModalTimeout = setTimeout(() => {
            router.push(`details/${constructPropertyUrl(res.data?.data[0])}`);
          }, 5000);
        }
      }
    } catch (error) {
      showTostMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error fetching state list",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };
  const handleDetailsPageClick = () => {
    router.push(`details/${constructPropertyUrl(propertyData?.[0])}`);
  };

  const checkPropertyIsEnquired = async () => {
    try {
      setLoading(true);
      let url = "";
      if (userDetails?._id) {
        url = `${getId}${`?brokerId=${userDetails?._id}`}`;
      }
      if (userDetails?._id == undefined) {
        url = `${getId}`;
      }
      let res = await checkEnquiryOnActiveLink(url);
      if (res.status === 200) {
        setContactPermissionToView(!!res.data?.data?._id);
      }
    } catch (error) {
      showTostMessages(
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
      showTostMessages(
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
  const showTostMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgressCount((prevProgress) =>
        prevProgress <= 0 ? 6 : prevProgress - 1
      ); // Countdown from 6 to 0
    }, 1000);

    // Clear the timeout when the component unmounts
    return () => {
      clearInterval(timer);
      clearTimeout(expiredModalTimeout);
    };
  }, []);

  const getViewCount = async () => {
    try {
      setLoading(true);
      let response = await activedViewCount(getId);
      if (response.status === 200) {
      }
    } catch (error) {
      showTostMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error fetching state list",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getViewCount();
  }, []);

  useEffect(() => {
    activeAdGetProperty();
    checkPropertyIsEnquired();
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

  const [openEnquiryForm, setOpenEnquiryForm] = React.useState(false);
  const [OverallAssesmentOpenEnquiryForm, setOverallAssesmentOpenEnquiryForm] =
    React.useState(false);

  const handleOpenEnquiryForm = () => {
    setOpenEnquiryForm(true);
  };

  const handleCloseEnquiryForm = () => {
    setOpenEnquiryForm(false);
  };

  const [openOtpPopup, setOpenOtpPopup] = useState(false);

  const handleSubmitEnquiry = async (data) => {
    try {
      const response = await submitEnquiry({
        ...(data || {}),
        propertyId: propertyData[0]?.property_id,
        adId: getId,
        propertyLink: params.projectdetails,
      });
      if (response.status == 200) {
        const { success, message } = response.data;
        if (success) {
          openSnackbar(message, "success");
          setBrokerContact({});
          checkPropertyIsEnquired();
          setLeadId(response.data?.data[0]?._id);
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

  const handleSubmitEnquiryUnauth = async (data) => {
    try {
      const response = await submitEnquiryUnauth({
        ...data,
        propertyId: propertyData[0]?.property_id,
        adId: getId,
        propertyLink: params.projectdetails,
      });
      if (response.status == 200) {
        const { success, message } = response.data;
        if (success) {
          openSnackbar(message, "success");
          // hasEnquired();
          setBrokerContact({});
          setLeadId(response.data?.data[0]?._id);
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

  const updateEnquiryVerfication = async (data) => {
    try {
      if (!leadId) {
        return;
      }
      const response = await updateEnquiryVerified({
        leadId: leadId,
        otp: data.otp,
        phone: {
          countryCode: data.countryCode,
          number: data.number,
        },
      });
      if (response.status == 200) {
        const { success, message } = response.data;
        if (success) {
          openSnackbar(message, "success");
          // hasEnquired();
          setBrokerContact({});
          handleCloseVerifyPopup();
          handleOpenAlternateSignIn();
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

  const updateEnquiryVerficationByUserId = async (leadId) => {
    try {
      const response = await updateEnquiryVerifiedByUserId({
        leadId: leadId,
        userId: userDetails?._id,
        adId: getId,
        propertyId: "",
      });
      if (response.status == 200) {
        const { success, message } = response.data;
        if (success) {
          openSnackbar(message, "success");
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

  useEffect(() => {
    if (getItem(enquiryFormOpen)) {
      handleOpenEnquiryForm(true);
      clearItem(enquiryFormOpen);
    }
  }, [getItem(enquiryFormOpen) == true]);

  useEffect(() => {
    if (getItem(propertyUserVerifiedKey) && userDetails?._id) {
      const leadId = getItem(userLeadId);
      updateEnquiryVerficationByUserId(leadId);
      clearItem(propertyUserVerifiedKey);
      clearItem(userLeadId);
    }
  }, [getItem(propertyUserVerifiedKey) == true]);

  const findActiveIndex = React.useCallback(() => {
    // set default if activeState is null
    if (activeState === null) setActiveState(itemsServer[0].hash);

    // Don't set the active index based on scroll if a link was just clicked

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

  const handleClick = (hash) => {
    // Used to disable findActiveIndex if the  scrolls due to a clickpage

    document.getElementById(hash).scrollIntoView({ behavior: "smooth" });
    setActiveState(hash);
  };

  const [activateAdsPopupState, setActivateAdsPopupState] = useState(false);
  const handleCloseActivateAdsPopup = () => {
    setActivateAdsPopupState(false);
  };

  const userInfo = JSON.parse(localStorage.getItem("userDetails"));

  const token = localStorage.getItem("token");

  const [propertyUrl, setPropertyUrl] = useState("");

  const handleOpenActivateAdsPopup = (ActiveUrl) => {
    setActivateAdsPopupState(true);
    setPropertyUrl(ActiveUrl);
  };

  const shuffle = (a) => {
    for (let i = a?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const detailsGetProperty = async (isNavigate = false) => {
    try {
      setLoading(true);
      let res;
      if (token) {
        res = await detailsProperty(
          `${propertyData[0]?.property_id}?brokerId=${userInfo?._id}`
        );
      } else {
        res = await detailsProperty(propertyData[0]?.property_id);
      }
      if (res.status === 200) {
        const data = {
          ...res.data?.data,
          consultants: shuffle(res.data?.data?.consultants),
        };
        setPropertyData({ ...data });
        if (isNavigate) {
          const url = constructPropertyUrl({ ...data }, userInfo);
          router.push(url);
        } else {
          window.location.reload();
        }
      }
    } catch (error) {
      showTostMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error fetching state list",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <ActivateAdsPopup
        propertyData={propertyData?.[0]}
        detailsGetProperty={detailsGetProperty}
        open={activateAdsPopupState}
        handleClose={handleCloseActivateAdsPopup}
        brokerBalance={brokerBalance}
        propertyUrl={propertyUrl}
        setBrokerPoints={setBrokerPoints}
        isFromUniqueUrl={true}
      />

      {openEnquiryForm && (
        <EnquireNow
          open={openEnquiryForm}
          propertyData={propertyData[0]?.propertyData}
          brokerCollectionId={propertyData[0]?.broker_collection_id}
          handleClose={handleCloseEnquiryForm}
          handleAction={handleOpenVerifyPopup}
          submitEnquiry={handleSubmitEnquiry}
          submitEnquiryUnath={handleSubmitEnquiryUnauth}
        />
      )}
      <OtpVerify
        formData={getItem(enquiryFormKey)}
        open={openOtpPopup}
        handleClose={handleCloseVerifyPopup}
        handleOpen={handleOpenEnquiryForm}
        handleAlternateSignIn={handleOpenAlternateSignIn}
        handleSubmit={updateEnquiryVerfication}
      />
      <AlternateSignIn
        open={openAlternateSignIn}
        handleClose={handleCloseAlternateSignIn}
        leadId={leadId}
      />
      {propertyData.length && (
        <nav className={classes.demo2}>
          <TopMenu
            topMenu={propertyData[0]?.propertyData}
            value={activeState}
            handleChange={handleClick}
            list={itemsServer}
          />
        </nav>
      )}

      <Box>
        <MarketingSection overviewData={propertyData[0]?.propertyData} />
        <Container maxWidth="md" sx={{ pt: "0 !important" }}>
          <Grid container spacing={2}>
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
              handleOpenEnquiryForm={() =>
                setOverallAssesmentOpenEnquiryForm(true)
              }
              open={OverallAssesmentOpenEnquiryForm}
              handleClose={() => setOverallAssesmentOpenEnquiryForm(false)}
              handleAction={handleOpenVerifyPopup}
              submitEnquiryUnath={handleSubmitEnquiryUnauth}
              isUnique={true}
            />
            {/* <MoreSimilarPropertyCard /> */}
          </Grid>

          {/* Dont Touch this */}
          <Toolbar sx={{ display: { xs: "flex" } }} />

          <Card
            sx={{
              p: 2,
              position: "fixed",
              left: 0,
              bottom: 0,
              width: "100%",
              display: { xs: "block", md: "none" },
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
                component="a"
                sx={{ mt: 1, ml: 1 }}
                variant="outlined"
                href={`https://web.whatsapp.com/send?text=${encodeURIComponent(
                  url?.href ? url?.href : ""
                )}`}
                target="_blank"
                data-action="share/whatsapp/share"
                startIcon={<ReplyIcon sx={{ transform: "scaleX(-1)" }} />}
              >
                Share
              </Button>

              {/* <Button
                sx={{ mt: 1, ml: 1 }}
                variant="outlined"
                onClick={handleOpenEnquiryForm}
                startIcon={<WhatsAppIcon />}
              >
                Contact
              </Button> */}
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
            userDetails?.role !== "superAdmin" &&
            userDetails?.role !== "broker" && (
              <Box
                className="detailFab"
                sx={{
                  position: "fixed",
                  right: 16,
                  bottom: 16,
                  display: { xs: "none", md: "flex" },
                  flexDirection: "column",
                }}
              >
                {isLogged ? (
                  <>
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
                    {/* <a href={`https://wa.me/+919725555595`} target="_blank">
                  <Fab
                    variant="extended"
                    sx={{ mb: 1, justifyContent: "flex-start" }}
                  >
                    <WhatsAppIcon sx={{ mr: 1 }} />
                    Contact
                  </Fab>
                </a> */}
                  </>
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
                  component="a"
                  variant="extended"
                  sx={{ mb: 1, justifyContent: "flex-start" }}
                  href={`https://web.whatsapp.com/send?text=${encodeURIComponent(
                    url?.href ? url?.href : ""
                  )}`}
                  target="_blank"
                  data-action="share/whatsapp/share"
                >
                  <ReplyIcon sx={{ mr: 1, transform: "scaleX(-1)" }} />
                  Share
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
            )}
        </Container>
        <UserDetailsAd
          AllPropertyData={propertyData[0]}
          contactPermissionToView={isLogged ? contactPermissionToView : true}
          handleOpenEnquiryForm={handleOpenEnquiryForm}
          isUnique={true}
          handleOpenActivateAdsPopup={handleOpenActivateAdsPopup}
        />
        {expiredModalOpenRef.current && (
          <Dialog open={expiredModalOpenRef.current}>
            <DialogContent
              sx={{ padding: "25px 30px !important", minWidth: "415px" }}
            >
              <Grid sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <CircularProgressSpinner value={progressCount} />
                <DialogContentText>
                  <Typography variant="body2">
                    Link is not available please check details page
                  </Typography>
                </DialogContentText>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                sx={{
                  fontWeight: 600,
                  color: "white",
                  backgroundColor: colors?.BLACK,
                  "&:hover": {
                    backgroundColor: colors?.BLACK,
                    boxShadow: "none",
                  },
                }}
                onClick={handleDetailsPageClick}
              >
                Details Page
              </Button>
              <Button
                variant="contained"
                // sx={{
                //   fontWeight: 600,
                //   color: "white",
                //   backgroundColor: colors?.BLACK,
                //   "&:hover": {
                //     backgroundColor: colors?.BLACK,
                //     boxShadow: "none",
                //   },
                // }}
                onClick={() => {
                  expiredModalOpenRef.current = false;
                }}
                color="primary"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
        <Box
          className="detailFab"
          sx={{
            position: "fixed",
            right: 16,
            bottom: 16,
            display: { xs: "none", evmd: "flex" },
            gap: 2,
            flexDirection: "column",
          }}
        >
          {/* <Fab
                    // size="small"
                    variant="extended"
                    sx={{ justifyContent: "flex-start" }}
                >
                    <AddLinkIcon fontSize='small' sx={{ mr: 1 }} />
                    Activate link
                </Fab> */}
          <Link href="/consultant/my-leads">
            {userDetails.role === "broker" && (
              <Fab
                // size="small"
                variant="extended"
                sx={{ justifyContent: "flex-start" }}
              >
                <FormatListBulletedIcon fontSize="small" sx={{ mr: 1 }} />
                {leadsCount} Enquiries received
              </Fab>
            )}
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default PropertyDetails;
