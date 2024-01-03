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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CallIcon from "@mui/icons-material/Call";
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
import { listOfConsultantProfileTab } from 'Components/CommonLayouts/CommonUtils';

const tabHeight = 116;

const useStyles = makeStyles((theme) => ({
  demo2: {
    backgroundColor: "#fff",
    position: "sticky",
    top: 54,
    left: 0,
    right: 0,
    zIndex: 100,
    [theme.breakpoints?.up('sm')]: {
      top: 64,
    },
    marginBottom: '16px'
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

function Profile() {
  const router = useRouter();

  const [exploringAsToggle, setExploringAsToggle] = useState("");

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

  const [activeState, setActiveState] = React.useState(null);

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

  const classes = useStyles();

  return (
    <>
    <nav className={classes.demo2}>
    <NavTabProfilePage
      value={activeState}
      handleChange={handleClick}
      list={itemsServer}
    />
  </nav>
    <Container maxWidth="lg">
     
      <Grid container spacing={2}>
        <Grid item xs={12} id="userDetails" >
          <Card sx={{ p: 2 }}>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  Anand Gupta
                </Typography>
              </Box>
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
                  <CallIcon fontSize="small" sx={{ alignSelf: "center" }} />
                  <Typography variant="h6" sx={{ alignSelf: "center" }}>
                    +91 8794561234
                  </Typography>
                </a>
              </Box>
            </Box>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Mumbai
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Box sx={{ display: "flex", p: 2, py: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
              >
                User details
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
                isEdit={isEdit}
              />
              <NewInputFieldStructure
                label="Last name"
                variant="outlined"
                isEdit={isEdit}
              />

              <NewPhoneInputFieldStructure
                variant="outlined"
                label="Phone"
                isEdit={isEdit}
              />
              <NewInputFieldStructure
                label="Alternate Email"
                variant="outlined"
                isEdit={isEdit}
              />
              <NewToggleButtonStructure
                isEdit={isEdit}
                label="Business type"
                value={businessTypeToggleAlignment}
                handleChange={handleChangeBusinessTypeToggle}
              >
                <ToggleButton fullWidth size="small" value="individual">
                  Individual
                </ToggleButton>
                <ToggleButton fullWidth size="small" value="company">
                  Company
                </ToggleButton>
              </NewToggleButtonStructure>
              
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} id="serviceDetails" >
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
                isEdit={isEdit}
              />
              <NewInputFieldStructure
                label="Company"
                variant="outlined"
                isEdit={isEdit}
              />
             
              
              <NewInputFieldStructure
                label="RERA number"
                variant="outlined"
                isEdit={isEdit}
              />
              <NewInputFieldStructure
                label="Company email"
                variant="outlined"
                isEdit={isEdit}
              />
              
              <NewPhoneInputFieldStructure
                variant="outlined"
                label="Registerd phone"
                isEdit={isEdit}
              />
         
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} id="targetedCustomers" >
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
                    isEdit={isEdit}
                  />
                  <NewAutoCompleteInputStructure
                    label="Select Area"
                    isEdit={isEdit}
                  />
                </>
              ) : (
                ""
              )}
              <Grid item xs={12} sx={{ mt: 1, display: "flex" }}>
                <Box sx={{ flex: 1, alignSelf: "center", ml: -1, mt: -1 }}>
                  <Chip
                    label="Mumbai"
                    size="small"
                    sx={{ ml: 1, mt: 1 }}
                    onDelete={() => { }}
                  />
                  <Chip
                    label="Mumbai"
                    size="small"
                    sx={{ ml: 1, mt: 1 }}
                    onDelete={() => { }}
                  />
                  <Chip
                    label="Mumbai"
                    size="small"
                    sx={{ ml: 1, mt: 1 }}
                    onDelete={() => { }}
                  />
                  <Chip
                    label="Mumbai"
                    size="small"
                    sx={{ ml: 1, mt: 1 }}
                    onDelete={() => { }}
                  />
                </Box>
                <Box>
                  <Button variant="contained">Add</Button>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} id="budget" >
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
              />
              <NewCurrencyInputField
                label="Maximum"
                variant="outlined"
                isEdit={isEdit}
              />
             
            </Grid>
          </Card>
        </Grid>
       
        <Grid item xs={12} id="currentAddress" >
          <Card>
            <Box sx={{ display: "flex", p: 2, py: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
              >
                Current address
              </Typography>
              <Box>
                <IconButton>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Divider />
            <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
              <NewToggleButtonStructure
                isEdit={isEdit}
                label="Address type"
                value={propertyTypeToggleAlignment}
                handleChange={handleChangePropertyTypeToggle}
              >
                <ToggleButton fullWidth size="small" value="owned">
                  Owned
                </ToggleButton>
                <ToggleButton fullWidth size="small" value="rented">
                  Rented
                </ToggleButton>
              </NewToggleButtonStructure>
              <NewInputFieldStructure
                label="Address line 1"
                variant="outlined"
                isEdit={isEdit}
              />
              <NewInputFieldStructure
                label="Address line 2"
                variant="outlined"
                isEdit={isEdit}
              />
              <NewInputFieldStructure
                label="City"
                variant="outlined"
                isEdit={isEdit}
              />
              <NewInputFieldStructure
                label="State"
                variant="outlined"
                isEdit={isEdit}
              />
              <NewInputFieldStructure
                label="Country"
                variant="outlined"
                isEdit={isEdit}
              />
              <NewInputFieldStructure
                label="Pincode"
                variant="outlined"
                isEdit={isEdit}
              />
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} id="setting" >
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
              <NewToggleButtonStructure
                isEdit={isEdit}
                label="Switch Role Type"
                value={propertyTypeToggleAlignment}
                handleChange={handleChangePropertyTypeToggle}
              >
                <ToggleButton fullWidth size="small" value="consultant">
                  Consultant
                </ToggleButton>
                <ToggleButton fullWidth size="small" value="buyer">
                  Buyer
                </ToggleButton>
              </NewToggleButtonStructure>
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
                  checked={isDndEnabled}
                  onChange={handleDndToggle}
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
                  checked={isPromotionEnabled}
                  onChange={handlePromotionToggle}
                  color="primary"
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

    </Container>
    </>
  );
}

export default Profile;
