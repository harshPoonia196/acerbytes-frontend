"use client";

import {
  Container,
  Card,
  Switch,
  Typography,
  Grid,
  Box,
  ToggleButton,
  Chip,
  Button,
  Divider,
  IconButton,
  Fab,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CallIcon from "@mui/icons-material/Call";
import SaveIcon from "@mui/icons-material/Save";
import PropertyTable from "Components/ProfilePage/PropertyTable";
import React, { useCallback, useEffect, useRef } from "react";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import NewPhoneInputFieldStructure from "Components/CommonLayouts/NewPhoneInputFieldStructure";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import { useState } from "react";
import colors from "styles/theme/colors";
import NewAutoCompleteInputStructure from "Components/CommonLayouts/NewAutoCompleteInputStructure";
import NewCurrencyInputField from "Components/CommonLayouts/NewCurrencyInputField";
import { useRouter } from "next/navigation";
import NewToggleButtonStructure from "Components/CommonLayouts/NewToggleButtonStructure";
import NavTabProfilePage from "Components/ProfilePage/NavTabProfilePage";
import { makeStyles, withStyles } from "@mui/styles";
import throttle from "lodash/throttle";
import CustomConsultantBreadScrumbs from "Components/CommonLayouts/CustomConsultantBreadScrumbs";
import { listOfConsultantProfileTab, reactQueryKey } from "utills/Constants";
import { getBrokerProfile, updateBrokerProfile } from "api/BrokerProfile.api";
import { useSnackbar } from "utills/SnackbarContext";
import { getGoogleId } from "utills/utills";
import { useMutate, useQueries } from "utills/ReactQueryContext";
import PageLoader from "Components/Loader/PageLoader";
import MarketingCard from "Components/Admin/Property/SubComponents/MarketingCard";

const tabHeight = 116;

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
    marginBottom: "16px",
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

function ConsultantProfile() {
  const router = useRouter();

  const { openSnackbar } = useSnackbar();

  const { data, isLoading, error } = useQueries(
    [reactQueryKey.broker.profile(getGoogleId())],
    async () => {
      try {
        const response = await getBrokerProfile();
        if (response.status == 200) {
          const { success, data, message } = response.data;
          if (success) {
            return data;
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
    }
  );

  const onSuccess = (res) => {
    openSnackbar(res?.data?.message || "Success!", "success");
  };

  const onError = (err) => {
    openSnackbar(err?.response?.data?.message || "Error", "error");
  };

  const mutate = useMutate(updateBrokerProfile, onSuccess, onError);

  const [exploringAsToggle, setExploringAsToggle] = useState("");

  const cityOptions = [
    { label: "Mumbai", value: "Mumbai" },
    { label: "Delhi", value: "Delhi" },
    { label: "Bangalore", value: "Bangalore" },
  ];

  const areaOptions = [
    { label: "Subarban Mumbai", value: "Subarban Mumbai" },
    { label: "New Delhi", value: "New Delhi" },
    { label: "Old Bangalore", value: "Old Bangalore" },
  ];

  const handleTargetCustomer = (e, newValue, firstKeyName) => {
    if (e?.persist) {
      e.persist();
    }
    let value = newValue.value;
    setTargetCustomer((prev) => ({ ...prev, [firstKeyName]: value }));
  };

  const handleChange = (e, firstKeyName, secondKeyName, thirdKeyName) => {
    if (e?.persist) {
      e.persist();
    }
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (e.target.type == "number") {
      value = Number(value);
    }
    setBrokerProfileInfo((prev) => ({
      ...(prev || {}),
      [firstKeyName]: !secondKeyName
        ? value
        : {
            ...(prev?.[firstKeyName] || {}),
            [secondKeyName]: !thirdKeyName
              ? value
              : {
                  ...(prev?.[firstKeyName]?.[secondKeyName] || {}),
                  [thirdKeyName]: value,
                },
          },
    }));
  };
  const handleAddTargetCustomer = () => {
    if (targetCustomer?.selectArea || targetCustomer?.selectCity) {
      let value = targetCustomer;
      setBrokerProfileInfo((prev) => ({
        ...prev,
        targetCustomers: [...prev?.targetCustomers, value],
      }));
      setTargetCustomer(initTargetCustomerValue);
    }
  };

  const handleRemoveTargetCustomer = (index) => {
    setBrokerProfileInfo((prev) => {
      let targetArr = prev?.targetCustomers || [];
      targetArr.splice(index, 1);
      return {
        ...prev,
        targetCustomers: [...targetArr],
      };
    });
  };

  const handleChangeExploringAsToggle = (event, newAlignment) => {
    if (newAlignment != null) setExploringAsToggle(newAlignment);
  };

  const [purposeToggle, setPurposeToggle] = useState("");

  const handleChangePurposeToggle = (event, newAlignment) => {
    if (newAlignment != null) setPurposeToggle(newAlignment);
  };

  const [purchaseToggle, setPurchaseToggle] = useState("");

  const handleChangePurchaseToggle = (event, newAlignment) => {
    if (newAlignment != null) setPurchaseToggle(newAlignment);
  };

  const [demographicToggle, setDemographicToggle] = useState("");

  const handleChangeDemographicToggle = (event, newAlignment) => {
    if (newAlignment != null) setDemographicToggle(newAlignment);
  };

  const [interestedForLoanToggle, setInterestedForLoanToggle] = useState("");

  const handleChangeInterestedForLoanToggle = (event, newAlignment) => {
    if (newAlignment != null) setInterestedForLoanToggle(newAlignment);
  };

  const [propertyTypeToggleAlignment, setPropertyTypeToggleAlignment] =
    React.useState("");

  const handleChangePropertyTypeToggle = (event, newAlignment) => {
    setPropertyTypeToggleAlignment(newAlignment);
  };
  const [businessTypeToggleAlignment, setBusinessTypeToggleAlignment] =
    React.useState("");
  const handleChangeBusinessTypeToggle = (event, newAlignment) => {
    setBusinessTypeToggleAlignment(newAlignment);
  };

  const [isDndEnabled, setIsDndEnabled] = useState(false);
  const [isPromotionEnabled, setIsPromotionEnabled] = useState(true);

  const handleDndToggle = () => {
    setIsDndEnabled((prev) => !prev);
  };

  const handlePromotionToggle = () => {
    setIsPromotionEnabled((prev) => !prev);
  };

  const [isEdit, setIsEdit] = useState(true);

  const [activeState, setActiveState] = React.useState("userDetails");

  const [brokerProfileInfo, setBrokerProfileInfo] = React.useState({});

  const initTargetCustomerValue = { selectCity: "", selectArea: "" };
  const [targetCustomer, setTargetCustomer] = useState(initTargetCustomerValue);

  let itemsServer = listOfConsultantProfileTab.map((tab) => {
    const hash = tab.value;
    return {
      text: tab.label,
      hash: hash,
      node: document.getElementById(hash),
    };
  });

  const itemsClientRef = React.useRef([]);
  React.useEffect(() => {
    itemsClientRef.current = itemsServer;
  }, [itemsServer]);

  React.useEffect(() => {
    setBrokerProfileInfo(data || {});
  }, [data]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      name: brokerProfileInfo?.name,
      alternateEmail: brokerProfileInfo?.alternateEmail,
      budget: brokerProfileInfo?.budget,
      businessType: brokerProfileInfo?.businessType,
      currentAddress: brokerProfileInfo?.currentAddress,
      dnd: brokerProfileInfo?.dnd,
      email: brokerProfileInfo?.email,
      phone: brokerProfileInfo?.phone,
      receiveWhatsappPromotion: brokerProfileInfo?.receiveWhatsappPromotion,
      serviceDetails: brokerProfileInfo?.serviceDetails,
      targetCustomers: brokerProfileInfo?.targetCustomers,
    };
    mutate.mutate(requestBody);
  };

  const classes = useStyles();
  return (
    <>
      <PageLoader isLoading={isLoading || mutate.isPending} />
      <nav className={classes.demo2}>
        <NavTabProfilePage
          value={activeState}
          handleChange={handleClick}
          list={itemsServer}
        />
      </nav>

      <CustomConsultantBreadScrumbs text="Profile" />

      <Container maxWidth="lg">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sx={{ textAlign: 'end' }}>
            <Button variant='contained'>Save</Button>
          </Grid> */}
            <Grid item xs={12} id="userDetails">
              <Card sx={{ p: 2 }}>
                <Box sx={{ display: "flex" }}>
                  {brokerProfileInfo?.name ? (
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 900 }}>
                        {`${brokerProfileInfo?.name?.firstName} ${brokerProfileInfo?.name?.lastName}`}
                      </Typography>
                    </Box>
                  ) : null}
                  {brokerProfileInfo?.phone?.number ? (
                    <Box>
                      <a
                        href="tel:8794561234"
                        style={{
                          display: "flex",
                          alignSelf: "center",
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        <CallIcon
                          fontSize="small"
                          sx={{ alignSelf: "center" }}
                        />
                        <Typography variant="h6" sx={{ alignSelf: "center" }}>
                          {`${brokerProfileInfo?.phone?.countryCode || ""} ${
                            brokerProfileInfo?.phone?.number
                          }`}
                        </Typography>
                      </a>
                    </Box>
                  ) : null}
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                  >
                    Consultant details
                  </Typography>
                  <Box>
                    <IconButton>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                  <NewInputFieldStructure
                    label="First name"
                    variant="outlined"
                    value={brokerProfileInfo?.name?.firstName || ""}
                    handleChange={(e) => handleChange(e, "name", "firstName")}
                    isEdit={isEdit}
                  />
                  <NewInputFieldStructure
                    label="Last name"
                    variant="outlined"
                    value={brokerProfileInfo?.name?.lastName || ""}
                    handleChange={(e) => handleChange(e, "name", "lastName")}
                    isEdit={isEdit}
                  />

                  <NewPhoneInputFieldStructure
                    variant="outlined"
                    label="Phone"
                    value1={brokerProfileInfo?.phone?.countryCode || ""}
                    value2={brokerProfileInfo?.phone?.number || ""}
                    handleSelect={(e) =>
                      handleChange(e, "phone", "countryCode")
                    }
                    handleChange={(e) => handleChange(e, "phone", "number")}
                    isEdit={isEdit}
                  />
                  <NewInputFieldStructure
                    label="Alternate Email"
                    variant="outlined"
                    value={brokerProfileInfo?.alternateEmail || ""}
                    handleChange={(e) => handleChange(e, "alternateEmail")}
                    isEdit={isEdit}
                  />
                  <NewToggleButtonStructure
                    isEdit={isEdit}
                    label="Business type"
                    value={brokerProfileInfo?.businessType || ""}
                    // handleChange={handleChangeBusinessTypeToggle}
                    handleChange={(e) => handleChange(e, "businessType")}
                  >
                    <ToggleButton fullWidth size="small" value="INDIVIDUAL">
                      Individual
                    </ToggleButton>
                    <ToggleButton fullWidth size="small" value="COMPANY">
                      Company
                    </ToggleButton>
                  </NewToggleButtonStructure>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} id="serviceDetails">
              <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                  >
                    Service details
                  </Typography>
                  <Box>
                    <IconButton>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                  <NewSelectTextFieldStructure
                    label="Service type"
                    value={brokerProfileInfo?.serviceDetails?.serviceType || ""}
                    isEdit={isEdit}
                    list={[
                      { label: "Type1", value: "type1" },
                      { label: "Type2", value: "type2" },
                    ]}
                    handleChange={(e) =>
                      handleChange(e, "serviceDetails", "serviceType")
                    }
                  />
                  <NewInputFieldStructure
                    label="Company"
                    value={brokerProfileInfo?.serviceDetails?.company || ""}
                    variant="outlined"
                    isEdit={isEdit}
                    handleChange={(e) =>
                      handleChange(e, "serviceDetails", "company")
                    }
                  />

                  <NewInputFieldStructure
                    label="RERA number"
                    value={brokerProfileInfo?.serviceDetails?.reraNumber || ""}
                    variant="outlined"
                    isEdit={isEdit}
                    handleChange={(e) =>
                      handleChange(e, "serviceDetails", "reraNumber")
                    }
                  />
                  <NewInputFieldStructure
                    label="Company email"
                    value={
                      brokerProfileInfo?.serviceDetails?.companyEmail || ""
                    }
                    variant="outlined"
                    isEdit={isEdit}
                    handleChange={(e) =>
                      handleChange(e, "serviceDetails", "companyEmail")
                    }
                  />
                  <NewPhoneInputFieldStructure
                    variant="outlined"
                    label="Registerd phone"
                    value1={
                      brokerProfileInfo?.serviceDetails?.registeredPhone
                        ?.countryCode || ""
                    }
                    value2={
                      brokerProfileInfo?.serviceDetails?.registeredPhone
                        ?.number || ""
                    }
                    isEdit={isEdit}
                    handleChange={(e) =>
                      handleChange(
                        e,
                        "serviceDetails",
                        "registeredPhone",
                        "number"
                      )
                    }
                    handleSelect={(e) =>
                      handleChange(
                        e,
                        "serviceDetails",
                        "registeredPhone",
                        "countryCode"
                      )
                    }
                  />
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} id="targetedCustomers">
              <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                  >
                    Target Customers
                  </Typography>
                  <Box>
                    <IconButton>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                  {isEdit ? (
                    <>
                      <NewAutoCompleteInputStructure
                        label="Select City"
                        list={cityOptions}
                        isEdit={isEdit}
                        value={targetCustomer.selectCity}
                        handleChange={(e, newValue) =>
                          handleTargetCustomer(e, newValue, "selectCity")
                        }
                      />
                      <NewAutoCompleteInputStructure
                        label="Select Area"
                        isEdit={isEdit}
                        list={areaOptions}
                        value={targetCustomer.selectArea}
                        handleChange={(e, newValue) =>
                          handleTargetCustomer(e, newValue, "selectArea")
                        }
                      />
                    </>
                  ) : (
                    ""
                  )}
                  <Grid item xs={12} sx={{ mt: 1, display: "flex" }}>
                    <Box sx={{ flex: 1, alignSelf: "center", ml: -1, mt: -1 }}>
                      {brokerProfileInfo?.targetCustomers?.map(
                        (targetArea, index) => {
                          let label = "";
                          if (targetArea.selectCity) {
                            label = targetArea.selectCity;
                          }
                          if (targetArea.selectArea) {
                            if (label) {
                              label += "/";
                            }
                            label += targetArea.selectArea;
                          }
                          return (
                            <Chip
                              key={`${targetArea.selectCity || ""}-${
                                targetArea.selectArea || ""
                              }-${index}`}
                              label={label}
                              size="small"
                              sx={{ ml: 1, mt: 1 }}
                              onDelete={() => {
                                handleRemoveTargetCustomer(index);
                              }}
                            />
                          );
                        }
                      )}
                    </Box>
                    <Box>
                      <Button
                        variant="contained"
                        disabled={
                          targetCustomer?.selectArea == "" &&
                          targetCustomer?.selectCity == ""
                        }
                        onClick={handleAddTargetCustomer}
                      >
                        Add
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} id="budget">
              <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                  >
                    Budget
                  </Typography>
                  <Box>
                    <IconButton>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                  <NewCurrencyInputField
                    label="Minimum"
                    variant="outlined"
                    isEdit={isEdit}
                    value1={
                      brokerProfileInfo?.budget?.minimumBudget?.unit || ""
                    }
                    value2={
                      brokerProfileInfo?.budget?.minimumBudget?.value || ""
                    }
                    handleSelect={(e) =>
                      handleChange(e, "budget", "minimumBudget", "unit")
                    }
                    handleChange={(e) =>
                      handleChange(e, "budget", "minimumBudget", "value")
                    }
                  />
                  <NewCurrencyInputField
                    label="Maximum"
                    variant="outlined"
                    isEdit={isEdit}
                    value1={
                      brokerProfileInfo?.budget?.maximumBudget?.unit || ""
                    }
                    value2={
                      brokerProfileInfo?.budget?.maximumBudget?.value || ""
                    }
                    handleSelect={(e) =>
                      handleChange(e, "budget", "maximumBudget", "unit")
                    }
                    handleChange={(e) =>
                      handleChange(e, "budget", "maximumBudget", "value")
                    }
                  />
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} id="budget">
              <Card>
               
                <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                  
                  <MarketingCard />
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} id="setting">
              <Card>
                <Box sx={{ display: "flex", p: 2, py: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                  >
                    Setting
                  </Typography>
                  <Box>
                    <IconButton>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Divider />
                <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                  <Grid
                    container
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body1">
                      Do Not Disturb (DND) Mode
                    </Typography>
                    <Switch
                      checked={brokerProfileInfo?.dnd}
                      onChange={(e) => handleChange(e, "dnd")}
                      color="primary"
                    />
                  </Grid>

                  <Grid
                    container
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body1">
                      Receive WhatsApp Promotions
                    </Typography>
                    <Switch
                      checked={brokerProfileInfo?.receiveWhatsappPromotion}
                      onChange={(e) =>
                        handleChange(e, "receiveWhatsappPromotion")
                      }
                      color="primary"
                    />
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
              display: { xs: "none", evmd: "flex" },
              flexDirection: "column",
            }}
          >
            <Fab
              variant="extended"
              sx={{ justifyContent: "flex-start" }}
              type="submit"
            >
              <SaveIcon fontSize="small" sx={{ mr: 1 }} />
              Save
            </Fab>
          </Box>
        </form>
      </Container>
    </>
  );
}

export default ConsultantProfile;
