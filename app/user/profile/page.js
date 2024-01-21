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
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import React from "react";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import NewPhoneInputFieldStructure from "Components/CommonLayouts/NewPhoneInputFieldStructure";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import { useState } from "react";
import NewAutoCompleteInputStructure from "Components/CommonLayouts/NewAutoCompleteInputStructure";
import NewCurrencyInputField from "Components/CommonLayouts/NewCurrencyInputField";
import { useRouter } from "next/navigation";
import NewToggleButtonStructure from "Components/CommonLayouts/NewToggleButtonStructure";
import NavTabProfilePage from "Components/ProfilePage/NavTabProfilePage";
import { makeStyles } from "@mui/styles";
import throttle from "lodash/throttle";
import {
  FAMILY,
  SERVICE_TYPE,
  ToasterMessages,
  addressType,
  demographic,
  exploringAs,
  interestedForLoan,
  purchase,
  purpose,
} from "Components/Constants";
import {
  getUserProfileByGoogleId,
  updateUserProfile,
} from "api/UserProfile.api";
import { useAuth } from "utills/AuthContext";
import {
  getAccessToken,
  getAllCitiesList,
  getAllCountriesList,
  getAllStateList,
} from "api/Util.api";
import { useSnackbar } from "utills/SnackbarContext";
import { LoadingButton } from "@mui/lab";
import { listOfProfileTab } from "utills/Constants";

const tabHeight = 116;

const SELECT_STATE = "selectState";
const SELECT_CITY = "selectCity";
const SELECT_AREA = "selectArea";

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

function Profile() {
  const { userDetails, isLogged } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [allStateList, setAllStatesList] = useState([]);
  const [interestedStatesList, setInterestedStatesList] = useState([]);
  const [interestedCitiesList, setInterestedCitiesList] = useState([]);
  const [selectInterestedState, setInterestedState] = useState("");
  const [selectInterestedCity, setInterestedCity] = useState("");
  const [selectInterestedArea, setInterestedArea] = useState("");

  const [profileInfo, setProfileInfo] = useState({
    name: {
      firstName: "",
      lastName: "",
    },
    phone: {
      countryCode: "",
      number: "",
    },
    email: "",
    alternateEmail: "",
    interestedCities: [],
    serviceDetails: {
      serviceType: "",
      company: "",
      family: "",
    },
    budget: {
      minimumBudget: {
        unit: "",
        value: "",
      },
      maximumBudget: {
        unit: "",
        value: "",
      },
      exploringAs: "",
      purpose: "",
      purchase: "",
      demographic: "",
      interestedForLoan: "",
    },
    settings: {
      dnd: false,
      rwp: true,
    },
    currentAddress: {
      addressType: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
    },
  });

  const [isEdit, setIsEdit] = useState(true);

  const [activeState, setActiveState] = React.useState(null);

  let itemsServer = listOfProfileTab.map((tab) => {
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

  const { openSnackbar } = useSnackbar();

  const showToaterMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  React.useEffect(
    () => () => {
      clearTimeout(unsetClickedRef.current);
    },
    []
  );

  React.useEffect(() => {
    getAllStateOfIndia();
    getAllCountryList();
  }, []);

  React.useEffect(() => {
    if (isLogged) {
      getUserProfile();
    }
  }, [isLogged]);

  const getUserProfile = async () => {
    if (isLogged && userDetails?._id) {
      try {
        setLoading(true);
        const res = await getUserProfileByGoogleId(userDetails?.googleID);
        if (res.status === 200) {
          const dataPlayload = res?.data?.data;
          setProfileInfo({
            ...profileInfo,
            budget: dataPlayload?.budget,
            currentAddress: dataPlayload?.currentAddress,
            interestedCities: dataPlayload?.interestedCities || [],
            name: dataPlayload?.name,
            phone: dataPlayload?.phone,
            serviceDetails: dataPlayload?.serviceDetails,
            settings: dataPlayload?.settings,
            alternateEmail: dataPlayload?.alternateEmail,

            // extra info
            role: dataPlayload?.role,
            _id: dataPlayload?._id,
            googleID: dataPlayload?.googleID,
            email: dataPlayload?.email,
          });
        }
      } catch (error) {
        showToaterMessages(
          error?.response?.data?.message ||
            error?.message ||
            "Error fetching user profile",
          "error"
        );
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const getAllCountryList = async () => {
    try {
      const res = await getAccessToken();
      if (res.auth_token) {
        const response = await getAllCountriesList(res.auth_token);
        if (response) {
          setCountryList(response);
        }
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error fetching country list",
        "error"
      );
    }
  };

  const getStatListByName = async (stateName) => {
    try {
      const res = await getAccessToken();
      if (res.auth_token) {
        const response = await getAllStateList(res.auth_token, stateName);
        if (response) {
          setAllStatesList(response);
        }
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error fetching state list",
        "error"
      );
    }
  };

  const getAllStateOfIndia = async () => {
    try {
      const res = await getAccessToken();
      if (res.auth_token) {
        const response = await getAllStateList(res.auth_token, "India");
        if (response) {
          setInterestedStatesList(response);
        }
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error fetching state of india list",
        "error"
      );
    }
  };

  const getInterestedCities = async (stateName) => {
    try {
      const res = await getAccessToken();
      if (res.auth_token) {
        const response = await getAllCitiesList(res.auth_token, stateName);
        if (response) {
          setInterestedCitiesList(response);
        }
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error fetching state of india list",
        "error"
      );
    }
  };

  const classes = useStyles();

  const handleChange = async (e, firstKeyName, secondKeyName, thirdKeyName) => {
    let value = thirdKeyName === "checked" ? e.target.checked : e.target.value;
    await setProfileInfo((prev) => ({
      ...prev,
      [firstKeyName]: !secondKeyName
        ? value
        : {
            ...prev?.[firstKeyName],
            [secondKeyName]: !thirdKeyName
              ? value
              : {
                  ...prev?.[firstKeyName]?.[secondKeyName],
                  [thirdKeyName]: value,
                },
          },
    }));
  };

  const handleChangeBudgetToggles = (event, newAlignment) => {
    setProfileInfo({
      ...profileInfo,
      budget: {
        ...profileInfo.budget,
        [event.target.name]: newAlignment,
      },
    });
  };

  const handleChangeSettings = (event) => {
    setProfileInfo({
      ...profileInfo,
      settings: {
        ...profileInfo.settings,
        [event.target.name]: !profileInfo.settings[event.target.name],
      },
    });
  };

  const handleChangeCurrentAddress = (event, newAlignment) => {
    let value = "";
    if (event.target.name == "addressType") {
      value = newAlignment;
    }

    setProfileInfo({
      ...profileInfo,
      currentAddress: {
        ...profileInfo.currentAddress,
        state:
          event.target.name === "country"
            ? ""
            : profileInfo.currentAddress.state,
        [event.target.name]: value || event.target.value,
      },
    });

    if (event.target.name == "country") {
      getStatListByName(event.target.value);
    }
  };

  const handleChangeInteresetCitiesDetails = (key, value) => {
    if (key == SELECT_STATE) {
      setInterestedState(value);
      setInterestedCity("");
    } else if (key == SELECT_CITY) {
      setInterestedCity(value);
    } else if (key == SELECT_AREA) {
      setInterestedArea(value);
    }

    if (key == SELECT_STATE) {
      getInterestedCities(value);
    }
  };

  const handleAddInterestedCities = () => {
    if (selectInterestedArea && selectInterestedCity && selectInterestedState) {
      setProfileInfo({
        ...profileInfo,
        interestedCities: [
          ...profileInfo.interestedCities,
          {
            selectState: selectInterestedState,
            selectCity: selectInterestedCity,
            selectArea: selectInterestedArea,
          },
        ],
      });
      setInterestedState("");
      setInterestedCity("");
      setInterestedArea("");
    }
  };

  const removeInterestedCity = (cityIndex) => {
    setProfileInfo({
      ...profileInfo,
      interestedCities: profileInfo.interestedCities.filter(
        (city, index) => index !== cityIndex
      ),
    });
  };

  const checkMandatoryFields = () => {
    // Validate name
    if (!profileInfo?.name?.firstName || !profileInfo?.name?.lastName) {
      return false;
    }

    // Validate phone
    if (!profileInfo?.phone?.countryCode || !profileInfo?.phone?.number) {
      return false;
    }

    // Validate email
    if (!profileInfo?.email) {
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      if (profileInfo?.googleID) {
        const response = await updateUserProfile(
          profileInfo.googleID,
          profileInfo
        );
        if (response.status == 200) {
          showToaterMessages(ToasterMessages.PROFILE_UPDATE_SUCCESS, "success");
        }
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error user profile updating",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

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
          <Grid item xs={12} sx={{ textAlign: "end" }}>
            <LoadingButton
              onClick={handleSave}
              loading={isLoading}
              disabled={!checkMandatoryFields()}
              loadingPosition="start"
              variant="contained"
            >
              Save
            </LoadingButton>
          </Grid>
          <Grid item xs={12} id="userDetails">
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
              </Box>
              <Divider />
              <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                <NewInputFieldStructure
                  label="First name"
                  variant="outlined"
                  isEdit={isEdit}
                  // handleChange={handleChangeName}
                  handleChange={(e) => handleChange(e, "name", "firstName")}
                  name={"firstName"}
                  value={profileInfo?.name?.firstName}
                />
                <NewInputFieldStructure
                  label="Last name"
                  variant="outlined"
                  isEdit={isEdit}
                  handleChange={(e) => handleChange(e, "name", "lastName")}
                  name={"lastName"}
                  value={profileInfo?.name?.lastName}
                />
                <NewPhoneInputFieldStructure
                  variant="outlined"
                  label="Phone"
                  isEdit={isEdit}
                  handleChange={(e) => handleChange(e, "phone", "number")}
                  handleSelect={(e) => handleChange(e, "phone", "countryCode")}
                  name1={"countryCode"}
                  name2={"number"}
                  value1={profileInfo?.phone?.countryCode}
                  value2={profileInfo?.phone?.number}
                />
                <NewInputFieldStructure
                  label="Alternate Email"
                  variant="outlined"
                  isEdit={isEdit}
                  handleChange={(e) => handleChange(e, "alternateEmail")}
                  name={"alternateEmail"}
                  value={profileInfo?.alternateEmail}
                />
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
              </Box>
              <Divider />
              <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                <NewSelectTextFieldStructure
                  label="Service type"
                  isEdit={isEdit}
                  handleChange={(e) =>
                    handleChange(e, "serviceDetails", "serviceType")
                  }
                  name={"serviceType"}
                  list={SERVICE_TYPE}
                  value={profileInfo?.serviceDetails?.serviceType}
                />
                <NewInputFieldStructure
                  label="Company"
                  variant="outlined"
                  isEdit={isEdit}
                  handleChange={(e) =>
                    handleChange(e, "serviceDetails", "company")
                  }
                  name={"company"}
                  value={profileInfo?.serviceDetails?.company}
                />
                <NewSelectTextFieldStructure
                  label="Family"
                  isEdit={isEdit}
                  handleChange={(e) =>
                    handleChange(e, "serviceDetails", "family")
                  }
                  name={"family"}
                  value={profileInfo?.serviceDetails?.family}
                  list={FAMILY}
                />
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} id="interestedCities">
            <Card>
              <Box sx={{ display: "flex", p: 2, py: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                >
                  Interested cities
                </Typography>
              </Box>
              <Divider />
              <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                <NewAutoCompleteInputStructure
                  label="Select State"
                  handleChange={(e, newValue) =>
                    handleChangeInteresetCitiesDetails(
                      SELECT_STATE,
                      newValue.value
                    )
                  }
                  value={selectInterestedState}
                  list={interestedStatesList?.map((rs) => {
                    return {
                      label: rs.state_name,
                      value: rs.state_name,
                    };
                  })}
                />

                {isEdit ? (
                  <>
                    <NewAutoCompleteInputStructure
                      label="Select City"
                      handleChange={(e, newValue) =>
                        handleChangeInteresetCitiesDetails(
                          SELECT_CITY,
                          newValue.value
                        )
                      }
                      value={selectInterestedCity}
                      list={interestedCitiesList?.map((rs) => {
                        return {
                          label: rs.city_name,
                          value: rs.city_name,
                        };
                      })}
                    />
                    <NewInputFieldStructure
                      label="Area"
                      variant="outlined"
                      value={selectInterestedArea}
                      handleChange={(e) =>
                        handleChangeInteresetCitiesDetails(
                          SELECT_AREA,
                          e.target.value
                        )
                      }
                      name={SELECT_AREA}
                    />
                  </>
                ) : (
                  ""
                )}
                <Grid item xs={12} sx={{ mt: 1, display: "flex" }}>
                  <Box sx={{ flex: 1, alignSelf: "center", ml: -1, mt: -1 }}>
                    {profileInfo?.interestedCities?.map((cityInfo, index) => {
                      return (
                        <Chip
                          key={index}
                          label={`${cityInfo?.selectArea}, ${cityInfo?.selectCity}`}
                          size="small"
                          sx={{ ml: 1, mt: 1 }}
                          onDelete={() => removeInterestedCity(index)}
                        />
                      );
                    })}
                  </Box>
                  <Box>
                    <Button
                      disabled={
                        !(
                          selectInterestedArea &&
                          selectInterestedCity &&
                          selectInterestedState
                        )
                      }
                      variant="contained"
                      onClick={handleAddInterestedCities}
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
              </Box>
              <Divider />
              <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                <NewCurrencyInputField
                  label="Minimum"
                  variant="outlined"
                  isEdit={isEdit}
                  name1={"unit"}
                  name2={"value"}
                  value1={profileInfo?.budget?.minimumBudget?.unit}
                  value2={profileInfo?.budget?.minimumBudget?.value}
                  handleChange={(e) =>
                    handleChange(e, "budget", "minimumBudget", "value")
                  }
                  handleSelect={(e) =>
                    handleChange(e, "budget", "minimumBudget", "unit")
                  }
                />
                <NewCurrencyInputField
                  label="Maximum"
                  variant="outlined"
                  isEdit={isEdit}
                  value1={profileInfo?.budget?.maximumBudget?.unit}
                  value2={profileInfo?.budget?.maximumBudget?.value}
                  handleChange={(e) =>
                    handleChange(e, "budget", "maximumBudget", "value")
                  }
                  handleSelect={(e) =>
                    handleChange(e, "budget", "maximumBudget", "unit")
                  }
                  name1={"unit"}
                  name2={"value"}
                />
                <NewToggleButtonStructure
                  label="Exploring as"
                  isEdit={isEdit}
                  handleChange={handleChangeBudgetToggles}
                  name={"exploringAs"}
                  value={profileInfo?.budget?.exploringAs}
                >
                  {exploringAs?.map((rs, i) => {
                    return (
                      <ToggleButton
                        fullWidth
                        key={i}
                        size="small"
                        name={"exploringAs"}
                        value={rs.value}
                      >
                        {rs.label}
                      </ToggleButton>
                    );
                  })}
                </NewToggleButtonStructure>
                <NewToggleButtonStructure
                  label="Purpose"
                  isEdit={isEdit}
                  value={profileInfo?.budget?.purpose}
                  handleChange={handleChangeBudgetToggles}
                  name={"purpose"}
                >
                  {purpose?.map((rs, i) => {
                    return (
                      <ToggleButton
                        fullWidth
                        key={i}
                        size="small"
                        value={rs.value}
                        name={"purpose"}
                      >
                        {rs.label}
                      </ToggleButton>
                    );
                  })}
                </NewToggleButtonStructure>
                <NewToggleButtonStructure
                  label="Purchase"
                  isEdit={isEdit}
                  value={profileInfo?.budget?.purchase}
                  handleChange={handleChangeBudgetToggles}
                  name={"purchase"}
                >
                  {purchase?.map((rs, i) => {
                    return (
                      <ToggleButton
                        fullWidth
                        key={i}
                        size="small"
                        value={rs.value}
                        name={"purchase"}
                      >
                        {rs.label}
                      </ToggleButton>
                    );
                  })}
                </NewToggleButtonStructure>
                <NewToggleButtonStructure
                  label="Demographic"
                  isEdit={isEdit}
                  value={profileInfo?.budget?.demographic}
                  handleChange={handleChangeBudgetToggles}
                  name={"demographic"}
                >
                  {demographic?.map((rs, i) => {
                    return (
                      <ToggleButton
                        key={i}
                        fullWidth
                        size="small"
                        value={rs.value}
                        name={"demographic"}
                      >
                        {rs.label}
                      </ToggleButton>
                    );
                  })}
                </NewToggleButtonStructure>
                <NewToggleButtonStructure
                  label="Interested for loan"
                  isEdit={isEdit}
                  value={profileInfo?.budget?.interestedForLoan}
                  handleChange={handleChangeBudgetToggles}
                  name={"interestedForLoan"}
                >
                  {interestedForLoan?.map((rs, i) => {
                    return (
                      <ToggleButton
                        fullWidth
                        key={i}
                        size="small"
                        value={rs.value}
                        name={"interestedForLoan"}
                      >
                        {rs.label}
                      </ToggleButton>
                    );
                  })}
                </NewToggleButtonStructure>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} id="currentAddress">
            <Card>
              <Box sx={{ display: "flex", p: 2, py: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                >
                  Current address
                </Typography>
              </Box>
              <Divider />
              <Grid container rowSpacing={1} columnSpacing={2} sx={{ p: 2 }}>
                <NewToggleButtonStructure
                  isEdit={isEdit}
                  label="Address type"
                  value={profileInfo?.currentAddress?.addressType}
                  handleChange={handleChangeCurrentAddress}
                  name="addressType"
                >
                  {addressType?.map((rs, i) => {
                    return (
                      <ToggleButton
                        fullWidth
                        key={i}
                        size="small"
                        value={rs.value}
                        name="addressType"
                      >
                        {rs.label}
                      </ToggleButton>
                    );
                  })}
                </NewToggleButtonStructure>
                <NewInputFieldStructure
                  label="Address line 1"
                  variant="outlined"
                  isEdit={isEdit}
                  value={profileInfo?.currentAddress?.addressLine1}
                  handleChange={(e) =>
                    handleChange(e, "currentAddress", "addressLine1")
                  }
                  name="addressLine1"
                />
                <NewInputFieldStructure
                  label="Address line 2"
                  variant="outlined"
                  isEdit={isEdit}
                  value={profileInfo?.currentAddress?.addressLine2}
                  handleChange={(e) =>
                    handleChange(e, "currentAddress", "addressLine2")
                  }
                  name="addressLine2"
                />
                <NewAutoCompleteInputStructure
                  label="Country"
                  value={profileInfo?.currentAddress?.country}
                  handleChange={(e, newValue) =>
                    handleChangeCurrentAddress({
                      target: {
                        name: "country",
                        value: newValue.value,
                      },
                    })
                  }
                  list={countryList?.map((rs) => {
                    return {
                      label: rs.country_name,
                      value: rs.country_name,
                    };
                  })}
                />
                <NewAutoCompleteInputStructure
                  label="State"
                  value={profileInfo?.currentAddress?.state}
                  handleChange={(e, newValue) =>
                    handleChangeCurrentAddress({
                      target: {
                        name: "state",
                        value: newValue.value,
                      },
                    })
                  }
                  list={allStateList?.map((rs) => {
                    return {
                      label: rs.state_name,
                      value: rs.state_name,
                    };
                  })}
                />

                <NewInputFieldStructure
                  label="City"
                  variant="outlined"
                  isEdit={isEdit}
                  value={profileInfo?.currentAddress?.city}
                  handleChange={(e) =>
                    handleChange(e, "currentAddress", "city")
                  }
                  name="city"
                />

                <NewInputFieldStructure
                  label="Pincode"
                  variant="outlined"
                  value={profileInfo?.currentAddress?.pinCode}
                  isEdit={isEdit}
                  handleChange={(e) =>
                    handleChange(e, "currentAddress", "pinCode")
                  }
                  name="pinCode"
                />
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
                    checked={profileInfo?.settings?.dnd}
                    name={"dnd"}
                    onChange={handleChangeSettings}
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
                    checked={profileInfo?.settings?.rwp}
                    name={"rwp"}
                    onChange={handleChangeSettings}
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
