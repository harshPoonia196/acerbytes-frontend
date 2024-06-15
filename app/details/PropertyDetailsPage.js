"use client";

import {
  Container,
  Typography,
  Card,
  Grid,
  Box,
  Chip,
  Toolbar,
  Divider,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import BrokerCard from "Components/BrokersPage/BrokerCard";
import EnquireNow from "Components/DetailsPage/Modal/EnquireNow";
import OtpVerify from "Components/DetailsPage/Modal/OtpVerify";
import GroupIcon from "@mui/icons-material/Group";
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
import DisableActivateAdsPopup from "Components/DetailsPage/Modal/DisableActivateAdsPopup";
import ActivateAdsPopup from "Components/DetailsPage/Modal/ActivateAdsPopup";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  checkEnquiryOnPropertyLink,
  detailsProperty,
  favPropertyCreate,
} from "api/Property.api";
import Loader from "Components/CommonLayouts/Loading";
import { useSnackbar } from "utills/SnackbarContext";
import { useAuth } from "utills/AuthContext";
import ConsultantsViewAll from "Components/DetailsPage/Modal/ConsultantsViewAll";
import { clearItem, getItem } from "utills/utills";
import {
  submitEnquiry,
  submitEnquiryUnauth,
  updateEnquiryVerified,
  updateEnquiryVerifiedByUserId,
} from "api/UserProfile.api";

import BottomFooterConsultant from "Components/DetailsPage/BottomFooterConsultant";
import BottomFooterUser from "Components/DetailsPage/BottomFooterUser";
import MoreSimilarPropertyCard from "Components/Admin/Property/SubComponents/MoreSimilarPropertyCard";
import ConsultantPopup from "Components/DetailsPage/Modal/ConsultantPopup";
import { constructPropertyUrl } from "utills/CommonFunction";

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

const PropertyDetailsPage = ({ params }) => {
  const searchParams = useSearchParams();
  const url = new URL(window.location.href);
  const { isLogged, userDetails, brokerBalance, setBrokerPoints } = useAuth();
  const router = useRouter();

  // Split the id string into an array of parts based on the hyphen delimiter
  const parts = params.id.split("-");
  const paramsId = parts[parts.length - 1];
  const detailsPropertyId = paramsId;

  const [isLoading, setLoading] = useState(false);
  const [propertyData, setPropertyData] = useState({});
  const [leadId, setLeadId] = useState("");
  const [enquiredInfo, setEnquiredInfo] = useState([]);
  const [consultantsDialog, setConsultantsDialog] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userDetails"));
  const token = localStorage.getItem("token");

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
          `${detailsPropertyId}?brokerId=${userInfo?._id}`
        );
      } else {
        res = await detailsProperty(detailsPropertyId);
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
        }
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

  const handleCloseConsultantDetails = () => {
    setConsultantsDialog(false);
  };

  const handlefavClick = async () => {
    const adData = {
      propertyId: detailsPropertyId,
    };
    try {
      const response = await favPropertyCreate(adData);
      if (response.status == 200) {
        detailsGetProperty();
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
    detailsGetProperty();
  }, []);

  useEffect(() => {
    checkPropertyIsEnquired();
  }, [userDetails._id]);

  const checkPropertyIsEnquired = async () => {
    try {
      setLoading(true);
      if (userDetails?._id) {
        let res = await checkEnquiryOnPropertyLink(
          `${detailsPropertyId}${
            userDetails?._id ? `?userId=${userDetails?._id}` : ""
          }`
        );
        if (res.status === 200) {
          if (res.data?.data) {
            setEnquiredInfo(res.data?.data);
          }
        }
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

  const [brokerContact, setBrokerContact] = React.useState(null);
  const [openEnquiryForm, setOpenEnquiryForm] = React.useState(false);
  const [enquireWithBrokerId, setEnquireWithBrokerId] = useState("");
  const [
    OverallAssessmentOpenEnquiryForm,
    setOverallAssessmentOpenEnquiryForm,
  ] = React.useState(false);

  const handleOpenEnquiryForm = () => {
    setOpenEnquiryForm(true);
  };

  const handleCloseEnquiryForm = () => {
    setOpenEnquiryForm(false);
  };

  const [openOtpPopup, setOpenOtpPopup] = useState(false);

  const updateEnquiryVerficationByUserId = async (leadId) => {
    try {
      const response = await updateEnquiryVerifiedByUserId({
        leadId: leadId,
        userId: userDetails?._id,
        adId: "",
        propertyId: detailsPropertyId,
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

  const handleSubmitEnquiry = async (data) => {
    try {
      const response = await submitEnquiry({
        ...data,
        propertyId: detailsPropertyId,
        propertyLink: `details/${params.id}`,
        brokerId: enquireWithBrokerId ? enquireWithBrokerId : undefined,
      });
      if (response.status == 200) {
        const { success, message } = response.data;
        if (success) {
          openSnackbar(message, "success");
          // hasEnquired();
          setBrokerContact({});
          setLeadId(response.data?.data[0]?._id);
          checkPropertyIsEnquired();
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
        propertyId: detailsPropertyId,
        propertyLink: `details/${params.id}`,
        brokerId: enquireWithBrokerId ? enquireWithBrokerId : undefined,
      });

      if (enquireWithBrokerId) {
        setEnquireWithBrokerId("");
      }
      if (response.status == 200) {
        const { success, message } = response.data;
        if (success) {
          openSnackbar(message, "success");
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

  const [disablePersonalizeAds, setDisablePersonalizeAds] = useState(false);

  const handleOpenPersonalizeAds = () => {
    setDisablePersonalizeAds(true);
  };

  const handleClosePersonalizeAds = () => {
    setDisablePersonalizeAds(false);
  };

  const [activateAdsPopupState, setActivateAdsPopupState] = useState(false);
  const [propertyUrl, setPropertyUrl] = useState("");

  const handleOpenActivateAdsPopup = (ActiveUrl) => {
    setActivateAdsPopupState(true);
    setPropertyUrl(ActiveUrl);
  };

  const handleCloseActivateAdsPopup = () => {
    setActivateAdsPopupState(false);
  };

  const [consultantsViewAll, setConsultantsViewAll] = useState(false);

  const handleOpenConsultantsViewAll = () => {
    setConsultantsViewAll(true);
  };

  const handleCloseConsultantsViewAll = () => {
    setConsultantsViewAll(false);
  };

  const handleEnquireWithBroker = (brokerId) => {
    handleOpenEnquiryForm();
    setEnquireWithBrokerId(brokerId);
  };

  const classes = useStyles();

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
    if (activeState === null) setActiveState(itemsServer[0].hash);
    if (clickedRef.current) return;

    let active;
    for (let i = itemsClientRef.current.length - 1; i >= 0; i -= 1) {
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

  const divRef = useRef(null);
  const [heightOfFooter, setHeightOfFooter] = useState(0);

  useEffect(() => {
    // Access the div element and get its height
    if (divRef.current) {
      const divHeight = divRef.current.clientHeight;
      setHeightOfFooter(divHeight);
    }
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <ActivateAdsPopup
        propertyData={propertyData}
        detailsGetProperty={detailsGetProperty}
        open={activateAdsPopupState}
        handleClose={handleCloseActivateAdsPopup}
        brokerBalance={brokerBalance}
        propertyUrl={propertyUrl}
        setBrokerPoints={setBrokerPoints}
      />
      <DisableActivateAdsPopup
        open={disablePersonalizeAds}
        handleOpen={handleOpenPersonalizeAds}
        handleClose={handleClosePersonalizeAds}
      />
      {/* {userDetails?.role === "broker" &&
      (!propertyData.isActiveAd || propertyData?.status === "Expired") ? (
        <AdsSection
          handleOpenPersonalizeAds={handleOpenPersonalizeAds}
          handleOpenActivateAdsPopup={handleOpenActivateAdsPopup}
          isConsultant
          propertyData={propertyData}
        />
      ) : null}  */}
      {/* {userDetails?.role !== "admin" &&
        userDetails?.role !== "superAdmin" &&
        propertyData.isActiveAd ? (
        <AdsSection
          SinglePropertyId={propertyData?.propertyBroker[0]}
          propertyData={propertyData}
          id={propertyData?.propertyBroker?.[0]?._id}
          handleOpenPersonalizeAds={handleOpenPersonalizeAds}
          handleOpenActivateAdsPopup={handleOpenActivateAdsPopup}
        />
      ) : null} */}

      <nav className={classes.demo2}>
        <TopMenu
          topMenu={propertyData}
          value={activeState}
          handleChange={handleClick}
          list={itemsServer}
        />
      </nav>
      <Box>
        <MarketingSection
          overviewData={propertyData}
          activeState={activeState}
        />
        <Container maxWidth="md" sx={{ pt: "0 !important" }}>
          {openEnquiryForm && (
            <EnquireNow
              propertyData={propertyData}
              open={openEnquiryForm}
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
            leadId={leadId}
            handleClose={handleCloseAlternateSignIn}
          />

          <Grid container spacing={2} id="section-list">
            <ClearanceSection
              regulatoryClearanceData={propertyData?.regulatoryClearance}
            />
            <LandscapeSection
              layoutData={propertyData?.layout}
              overviewData={propertyData?.overview}
            />
            <UnitsPlanSection unitsPlan={propertyData?.unitsPlan} />
            <AmenitiesSection amenitiesData={propertyData?.amenitiesData} />
            <LocationSection locationData={propertyData?.location} />
            {/* <PricingSection /> */}
            {/* <ResaleSection /> */}
            <ValueForMoneySection
              valueForMoneyData={propertyData?.valueForMoney}
            />
            {/* <FloorPlanSection /> */}
            {propertyData?.consultants?.length > 0 && (
              <Grid item xs={12} id="propertyConsultants">
                <Card>
                  <Box sx={{ display: "flex", p: 2 }}>
                    <Box sx={{ flex: 1, alignSelf: "center" }}>
                      <Typography variant="h4">
                        Contact verified consultants
                      </Typography>
                    </Box>
                    <Box>
                      <ConsultantsViewAll
                        open={consultantsViewAll}
                        enquiredInfo={enquiredInfo}
                        handleClose={handleCloseConsultantsViewAll}
                        handleEnquireWithBroker={handleEnquireWithBroker}
                        propertyData={propertyData?.consultants}
                      />
                      <Chip
                        label="View all"
                        icon={<GroupIcon fontSize="small" />}
                        size="small"
                        onClick={handleOpenConsultantsViewAll}
                        sx={{ fontSize: "0.875rem !important", padding: "5px" }}
                      />
                    </Box>
                  </Box>
                  <Divider />
                  <Box sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                      {propertyData?.consultants?.length > 0 &&
                        propertyData?.consultants?.slice(0, 2).map((broker) => (
                          <Grid item xs={12} sm={6} key={broker?.id}>
                            <BrokerCard
                              broker={broker}
                              noReview
                              enquiredInfo={enquiredInfo}
                              handleEnquireWithBroker={handleEnquireWithBroker}
                            />
                          </Grid>
                        ))}
                    </Grid>
                  </Box>
                  <Divider />
                  {userDetails?.role === "broker" && (
                    <Box
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 1,
                      }}
                    >
                      <Box sx={{ flex: 1, alignSelf: "center" }}>
                        <Typography variant="body2" sx={{ flex: 1 }}>
                          Are you a{" "}
                          <span style={{ fontWeight: 700 }}>
                            Property Consultant?
                          </span>{" "}
                          let Customers reach you
                        </Typography>
                      </Box>
                      {propertyData?.isConsultant === false && (
                        <Box sx={{ alignSelf: { xs: "end" } }}>
                          <Chip
                            label="Yes, show me here !"
                            icon={<PersonAddIcon fontSize="small" />}
                            size="small"
                            sx={{ fontSize: "0.875rem" }}
                            onClick={() => {
                              setConsultantsDialog(true);
                            }}
                          />
                        </Box>
                      )}
                    </Box>
                  )}
                </Card>
              </Grid>
            )}

            {consultantsDialog && (
              <ConsultantPopup
                open={consultantsDialog}
                handleClose={handleCloseConsultantDetails}
                detailsPropertyId={detailsPropertyId}
                detailsGetProperty={detailsGetProperty}
              />
            )}

            <OverallAssesmentSection
              overallAssessment={propertyData?.overallAssessment}
              AllPropertyData={propertyData}
              handleOpenEnquiryForm={() =>
                setOverallAssessmentOpenEnquiryForm(true)
              }
              handleSubmitEnquiry={handleSubmitEnquiry}
              open={OverallAssessmentOpenEnquiryForm}
              handleClose={() => setOverallAssessmentOpenEnquiryForm(false)}
              handleAction={handleOpenVerifyPopup}
              submitEnquiryUnath={handleSubmitEnquiryUnauth}
            />
            <MoreSimilarPropertyCard propertyData={propertyData} />
          </Grid>

          {/* Dont Touch this */}
          {userDetails?.role !== "admin" &&
            userDetails?.role !== "superAdmin" &&
            userDetails?.role !== "broker" && (
              <Toolbar
                sx={{
                  display: { xs: "flex", evmd: "none" },
                  height: heightOfFooter,
                }}
              />
            )}
          {userDetails?.role !== "admin" &&
            userDetails?.role !== "superAdmin" &&
            userDetails?.role !== "broker" && (
              <>
                <BottomFooterUser
                  isLogged={isLogged}
                  propertyData={propertyData}
                  url={url}
                  divRef={divRef}
                  handlefavClick={handlefavClick}
                  handleOpenEnquiryForm={handleOpenEnquiryForm}
                />
                {/* <Card
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
                  ref={divRef}
                >
                  <Box
                    sx={{ mt: -1, ml: -1, display: "flex", flexWrap: "wrap" }}
                  >
                    {isLogged ? (
                      <Button
                        size="small"
                        sx={{ mt: 1, ml: 1 }}
                        variant="outlined"
                        onClick={handlefavClick}
                        startIcon={
                          propertyData?.isFav ? (
                            <ThumbUpIcon sx={{ color: colors.BLUE }} />
                          ) : (
                            <ThumbUpOffAltIcon />
                          )
                        }
                      >
                        Like
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        sx={{ mt: 1, ml: 1 }}
                        variant="outlined"
                        onClick={() => router.push(listOfPages.login)}
                        startIcon={<ThumbUpOffAltIcon />}
                      >
                        Like
                      </Button>
                    )}

                    <Button
                      size="small"
                      sx={{ mt: 1, ml: 1 }}
                      variant="outlined"
                      onClick={handleOpenEnquiryForm}
                      startIcon={<ReplyIcon sx={{ transform: "scaleX(-1)" }} />}
                    >
                      Share
                    </Button>
                    <Button
                      size="small"
                      sx={{ mt: 1, ml: 1 }}
                      variant="outlined"
                      onClick={handleOpenEnquiryForm}
                      startIcon={<WhatsAppIcon />}
                    >
                      Contact
                    </Button>
                    <Button
                      size="small"
                      sx={{ mt: 1, ml: 1 }}
                      variant="outlined"
                      onClick={handleOpenEnquiryForm}
                      startIcon={<AssignmentIcon />}
                    >
                      Enquire
                    </Button>
                  </Box>
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
                  {isLogged ? (
                    <Fab
                      variant="extended"
                      sx={{ mb: 1, justifyContent: "flex-start" }}
                      onClick={handlefavClick}
                    >
                      {propertyData?.isFav ? (
                        <ThumbUpIcon sx={{ color: colors.BLUE, mr: 1 }} />
                      ) : (
                        <ThumbUpOffAltIcon sx={{ mr: 1 }} />
                      )}
                      Like
                    </Fab>
                  ) : (
                    <Fab
                      variant="extended"
                      sx={{ mb: 1, justifyContent: "flex-start" }}
                      onClick={() => router.push(listOfPages.login)}
                    >
                      <ThumbUpOffAltIcon sx={{ mr: 1 }} />
                      Like
                    </Fab>
                  )}
                  <a
                    href={`https://web.whatsapp.com/send?text=${url?.href ? url.href : ""
                      }`}
                    target="_blank"
                    data-action="share/whatsapp/share"
                  >
                    <Fab
                      variant="extended"
                      sx={{
                        mb: 1,
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <ReplyIcon sx={{ mr: 1, transform: "scaleX(-1)" }} />
                      Share
                    </Fab>
                  </a>
                  <a href={`https://wa.me/+919323996997`}>
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
                </Box> */}
              </>
            )}
          {!isLoading && userDetails?.role === "broker" && (
            <>
              <Toolbar
                sx={{
                  display: { xs: "flex", evmd: "none" },
                }}
              />
              <BottomFooterConsultant
                SinglePropertyId={
                  propertyData?.propertyBroker
                    ? propertyData?.propertyBroker[0]
                    : ""
                }
                handleOpenActivateAdsPopup={handleOpenActivateAdsPopup}
                propertyData={propertyData}
              />
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

export default PropertyDetailsPage;
