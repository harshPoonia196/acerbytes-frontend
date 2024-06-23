"use client";

import {
  Container,
  Card,
  Typography,
  Grid,
  Box,
  ToggleButton,
  Chip,
  Divider,
  Fab,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import SaveIcon from "@mui/icons-material/Save";
import React from "react";
import { useEffect } from "react";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import { useState } from "react";
import NewAutoCompleteInputStructure from "Components/CommonLayouts/NewAutoCompleteInputStructure";
import NewCurrencyInputField from "Components/CommonLayouts/NewCurrencyInputField";
import NewToggleButtonStructure from "Components/CommonLayouts/NewToggleButtonStructure";
import NavTabProfilePage from "Components/ProfilePage/NavTabProfilePage";
import { makeStyles } from "@mui/styles";
import throttle from "lodash/throttle";
import { ProfilePic } from "Components/CommonLayouts/profilepic";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress } from "@mui/material";

import {
  getUserProfileByGoogleId,
  updateUserProfile,
} from "api/UserProfile.api";
import { useAuth } from "utills/AuthContext";
import { updateProfileImage, uploadImage } from "api/Util.api";
import { useSnackbar } from "utills/SnackbarContext";
import {
  FILE_TYPES,
  listOfProfileTab,
  exploringAs,
  purpose,
  purchase,
  demographic,
  interestedForLoan,
  addressType,
  ToasterMessages,
} from "utills/Constants";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import { validateEmail } from "utills/utills";
import { currencies, COUNTRY_NAME, countries } from "utills/Constants";
import colors from "styles/theme/colors";
import Loader from "Components/CommonLayouts/Loading";
import { capitalLizeName } from "utills/CommonFunction";
import { getAllOptions, getCities } from "api/Property.api";

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

function Profile({ id, isAdminUpdate }) {
  const { userDetails, isLogged } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [interestedStatesList, setInterestedStatesList] = useState([]);
  const [allStateAndCityInfo, setAllStateAndCityInfo] = useState({});
  const [allDropdownOptions, setAllDropdownOptions] = useState([]);
  const [interestedCitiesList, setInterestedCitiesList] = useState([]);
  const [selectInterestedState, setInterestedState] = useState("");
  const [selectInterestedCity, setInterestedCity] = useState("");
  const [selectInterestedArea, setInterestedArea] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [invalidAge, setInvalidAge] = useState(false);
  const [isEdit, setIsEdit] = useState(true);

  const [profileInfo, setProfileInfo] = useState({
    name: {
      firstName: "",
      lastName: "",
    },
    phone: {
      countryCode: countries[0]?.value,
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
        unit: currencies[0]?.value,
        value: "",
      },
      maximumBudget: {
        unit: currencies[0]?.value,
        value: "",
      },
      exploringAs: "",
      purpose: "",
      purchase: "",
      demographic: "",
      interestedForLoan: "",
      paymentStatus: "",
    },
    settings: {
      dnd: false,
      rwp: false,
    },
    currentAddress: {
      addressType: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: COUNTRY_NAME,
      pinCode: "",
    },
  });

  const [activeState, setActiveState] = React.useState("userDetails");
  const [isUploading, setUploading] = React.useState(false);

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

  React.useEffect(
    () => () => {
      clearTimeout(unsetClickedRef.current);
    },
    []
  );

  const { openSnackbar } = useSnackbar();

  const showTostMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  React.useEffect(() => {
    getDropdownOptions();
  }, []);

  React.useEffect(() => {
    // if (isLogged) {
    getUserProfile();
    // }
  }, [isLogged && userDetails?._id]);

  const getUserProfile = async () => {
    if (isLogged && userDetails?._id) {
      try {
        setLoading(true);
        const userId = isAdminUpdate ? id : userDetails?.googleID;
        const res = await getUserProfileByGoogleId(userId);
        if (res.status === 200) {
          const dataPlayload = res?.data?.data;
          setProfileInfo({
            ...profileInfo,
            budget: {
              ...dataPlayload?.budget,
              minimumBudget: {
                value: dataPlayload?.budget?.minimumBudget?.value,
                unit:
                  dataPlayload?.budget?.minimumBudget?.unit ||
                  currencies[0]?.value,
              },
              maximumBudget: {
                value: dataPlayload?.budget?.maximumBudget?.value,
                unit:
                  dataPlayload?.budget?.maximumBudget?.unit ||
                  currencies[0]?.value,
              },
            },
            currentAddress: {
              ...dataPlayload?.currentAddress,
              country: COUNTRY_NAME,
            },
            interestedCities: dataPlayload?.interestedCities || [],
            name: dataPlayload?.name,
            phone: dataPlayload?.phone,
            serviceDetails: dataPlayload?.serviceDetails,
            settings: dataPlayload?.settings,
            alternateEmail: dataPlayload?.alternateEmail,
            age: dataPlayload?.age,

            // extra info
            role: dataPlayload?.role,
            _id: dataPlayload?._id,
            googleID: dataPlayload?.googleID,
            email: dataPlayload?.email,
          });
        }
      } catch (error) {
        showTostMessages(
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

  const getDropdownOptions = async () => {
    try {
      const response = await getCities();
      if (response?.data?.data?.[0]) {
        setAllStateAndCityInfo(response?.data?.data?.[0]);
        setInterestedStatesList(
          Object.keys(response?.data?.data?.[0])
            ?.filter((rs) => rs !== "_id")
            ?.map((stateDetail) => {
              return {
                label: stateDetail || "",
                value: stateDetail || "",
              };
            }) || []
        );
      }

      const allOptionsResponse = await getAllOptions();
      if (allOptionsResponse?.data?.data?.length > 0) {
        setAllDropdownOptions(allOptionsResponse?.data?.data);
      }
    } catch (error) {
      showTostMessages(
        error?.response?.data?.message ||
        error?.message ||
        "Error fetching state of india list",
        "error"
      );
    }
  };

  const getInterestedCities = async (stateName) => {
    try {
      if (stateName) {
        const stateInfo = allStateAndCityInfo[stateName];
        setInterestedCitiesList(
          stateInfo?.map((cityDetails) => ({
            label: cityDetails || "",
            value: cityDetails || "",
          })) || []
        );
      }
    } catch (error) {
      showTostMessages(
        error?.response?.data?.message ||
        error?.message ||
        "Error fetching state of india list",
        "error"
      );
    }
  };

  const classes = useStyles();

  const handleChange = async (e, firstKeyName, secondKeyName, thirdKeyName) => {
    var value = thirdKeyName === "checked" ? e.target.checked : e.target.value;
    if (
      secondKeyName === "firstName" ||
      secondKeyName === "lastName" ||
      secondKeyName === "company"
    ) {
      value = capitalLizeName(value);
    }
    if (secondKeyName === "pinCode") {
      value = value.replace(/\D/g, "");

      value = value.slice(0, 6);
    }

    if (firstKeyName === "age") {
      const age = Number(value);
      if (age > 100 || age < 0) {
        setInvalidAge(true);
        showTostMessages("Please Enter Correct Age", "error");
      } else {
        setInvalidAge(false);
      }
    }

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
      if (
        profileInfo?.alternateEmail &&
        !validateEmail(profileInfo?.alternateEmail)
      ) {
        setEmailInvalid(true);
        return;
      } else {
        setEmailInvalid(false);
      }

      if (invalidAge) {
        return;
      }

      setLoading(true);
      if (profileInfo?.googleID) {
        const response = await updateUserProfile(
          profileInfo.googleID,
          profileInfo
        );
        if (response.status == 200) {
          if (!isAdminUpdate) {
            updateDetailsonLocalStorage(profileInfo);
          }
          showTostMessages(ToasterMessages.PROFILE_UPDATE_SUCCESS, "success");
        }
      }
    } catch (error) {
      showTostMessages(
        error?.response?.data?.message ||
        error?.message ||
        "Error user profile updating",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateDetailsonLocalStorage = (info) => {
    let userInfo = JSON.parse(localStorage.getItem("userDetails"));
    userInfo = {
      ...userInfo,
      name: {
        ...userInfo.name,
        firstName: profileInfo?.name?.firstName,
        lastName: profileInfo?.name?.lastName,
      },
      phone: {
        ...userInfo.phone,
        number: info?.phone?.number,
        countryCode: info?.phone?.countryCode,
      },
    };
    localStorage.setItem("userDetails", JSON.stringify(userInfo));
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    // No API call or asynchronous behavior, just setting data to a mock value
    // setData('Mocked data');
    setLoading(false);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type && FILE_TYPES.includes(file.type)) {
      hanldeFileUploading(file);
    }
  };

  const hanldeFileUploading = async (selectedFile) => {
    if (!selectedFile) {
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", selectedFile);
      const response = await uploadImage(formData);
      if (response.data.status == 200) {
        const userId = isAdminUpdate ? id : userDetails.googleID;
        const imageResponse = await updateProfileImage(
          userId,
          response.data.data.Location
        );
        if (imageResponse?.data?.status == 200) {
          updateOnLocalStorage(response.data.data.Location);
          openSnackbar(response.data.message, "success");
        }
      }
    } catch (error) {
      console.log("error: ", error);
      openSnackbar(
        error?.response?.data?.message ||
        error?.message ||
        "Error fetching state of india list",
        "error"
      );
    } finally {
      setUploading(false);
    }
  };

  const updateOnLocalStorage = (imageUrl) => {
    let userInfo = JSON.parse(localStorage.getItem("userDetails"));
    userInfo = {
      ...userInfo,
      googleDetails: {
        ...userInfo.googleDetails,
        profilePicture: imageUrl,
      },
    };
    localStorage.setItem("userDetails", JSON.stringify(userInfo));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      {isLoading && <Loader />}

      <nav className={classes.demo2} sx={{ boxShadow: "-1px 8px 6px -6px gainsboro!important"}}>
        <NavTabProfilePage
          value={activeState}
          handleChange={handleClick}
          list={itemsServer}
        />
      </nav>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {/* <Grid item xs={12} sx={{ textAlign: "end" }}>
            <LoadingButton
              onClick={handleSave}
              loading={isLoading}
              disabled={!checkMandatoryFields()}
              loadingPosition="start"
              variant="contained"
            >
              Save
            </LoadingButton>
          </Grid> */}
          {!isAdminUpdate && (
            <Grid item xs={12} id="userDetails">
              <Card sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 1,
                  }}
                >
                  <Box sx={{ flex: 1, display: "flex", gap: 2 }}>
                    <Box>
                      {/* <UploadMarketingImage
                      open={isUploadPopupOpen}
                      image={image}
                      setImage={setImage}
                      onClose={handleCloseUploadPopup}
                      changeImage={handleImageSelect}
                      removeImage={handleImageRemove}
                    /> */}
                      {/* Avatar and file input */}
                      <label
                        htmlFor="avatar-input"
                        style={{ cursor: "pointer" }}
                      >
                        <ProfilePic
                          style={{
                            minWidth: "3rem",
                            maxWidth: "3rem",
                            height: "3rem",
                          }}
                        >
                          {isUploading ? (
                            <div className="profilepic__loader">
                              <CircularProgress size={24} />
                            </div>
                          ) : (
                            <>
                              <Avatar
                                sx={{
                                  width: "3rem",
                                  position: "static",
                                  height: "3rem",
                                  cursor: "pointer",
                                }}
                                src={
                                  userDetails?.googleDetails?.profilePicture
                                    ? userDetails.googleDetails.profilePicture
                                    : null
                                }
                                className="profilepic__image"
                                onClick={(e) => {
                                  // Trigger the file input click when Avatar is clicked
                                  document
                                    .getElementById("avatar-input")
                                    .click();
                                }}
                              >
                                {/* {getFirstLetter(user?.first_name) + getFirstLetter(user?.last_name)} */}
                              </Avatar>
                              <div className="profilepic__content">
                                <EditIcon fontSize="small" />
                                <p className="profilepic__text">Edit</p>
                              </div>
                            </>
                          )}
                        </ProfilePic>
                      </label>
                      <input
                        id="avatar-input"
                        type="file"
                        disabled={isUploading}
                        // onChange={handleImageSelect}
                        onChange={handleFileChange}
                        accept="image/x-png,image/gif,image/jpeg"
                        hidden
                      />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 900 }}>
                        {userDetails?.name?.firstName}{" "}
                        {userDetails?.name?.lastName}
                      </Typography>
                      <Typography variant="body2">
                        {userDetails?.email}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ alignSelf: { xs: "end", sm: "start" } }}>
                    <a
                      href={`tel:${profileInfo?.phone?.countryCode}${profileInfo?.phone?.number}`}
                      style={{
                        display: "flex",
                        alignSelf: "center",
                        textDecoration: "none",
                        color: colors.BLUE,
                      }}
                    >
                      <CallIcon fontSize="small" sx={{ alignSelf: "center" }} />
                      <Typography
                        variant="h6"
                        sx={{ alignSelf: "center", color: colors.BLUE }}
                      >
                        +{profileInfo?.phone?.countryCode}{" "}
                        {profileInfo?.phone?.number}
                      </Typography>
                    </a>
                  </Box>
                </Box>

                {/* <Typography variant="body1" sx={{ mt: 1 }}>
                Mumbai
              </Typography> */}
              </Card>
            </Grid>
          )}
          <Grid item xs={12} id="userDetails">
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
                  isRequired={true}
                  label="First name"
                  variant="outlined"
                  isEdit={isEdit}
                  disabled={isAdminUpdate}
                  // handleChange={handleChangeName}
                  handleChange={(e) => handleChange(e, "name", "firstName")}
                  name={"firstName"}
                  value={profileInfo?.name?.firstName}
                />
                <NewInputFieldStructure
                  label="Last name"
                  variant="outlined"
                  isEdit={isEdit}
                  disabled={isAdminUpdate}
                  isRequired={true}
                  handleChange={(e) => handleChange(e, "name", "lastName")}
                  name={"lastName"}
                  value={profileInfo?.name?.lastName}
                />
                {/* <NewPhoneInputFieldStructure
                  variant="outlined"
                  label="Phone"
                  isRequired={true}
                  isEdit={isEdit}
                  handleChange={(e) => handleChange(e, "phone", "number")}
                  handleSelect={(e) =>
                    handleChange(e, "phone", "countryCode")
                  }
                  name1={"countryCode"}
                  name2={"number"}
                  value1={profileInfo?.phone?.countryCode}
                  value2={profileInfo?.phone?.number}
                /> */}
                <NewInputFieldStructure
                  label="Alternate Email"
                  variant="outlined"
                  isEdit={isEdit}
                  disabled={isAdminUpdate}
                  handleChange={(e) => handleChange(e, "alternateEmail")}
                  name={"alternateEmail"}
                  value={profileInfo?.alternateEmail}
                  error={emailInvalid}
                />

                <NewInputFieldStructure
                  label="Age"
                  type="number"
                  variant="outlined"
                  isEdit={isEdit}
                  handleChange={(e) => handleChange(e, "age")}
                  name={"age"}
                  error={invalidAge}
                  value={profileInfo?.age}
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
                  list={
                    allDropdownOptions?.find((rs) => rs.name == "Service Type")
                      ?.childSub || []
                  }
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
                  list={
                    allDropdownOptions?.find((rs) => rs.name == "Family")
                      ?.childSub || []
                  }
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
                  value={{
                    label: selectInterestedState,
                    value: selectInterestedState,
                  }}
                  list={interestedStatesList}
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
                      value={{
                        label: selectInterestedCity,
                        value: selectInterestedCity,
                      }}
                      list={interestedCitiesList}
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
                    <CustomButton
                      disabled={
                        !(
                          selectInterestedArea &&
                          selectInterestedCity &&
                          selectInterestedState
                        )
                      }
                      variant="contained"
                      onClick={handleAddInterestedCities}
                      ButtonText={"Add"}
                    />
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
                  // currentOptions={allDropdownOptions?.find(rs => rs.name == "currency code")?.childSub || []}
                  value1={profileInfo?.budget?.minimumBudget?.unit || "₹INR"}
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
                  value1={profileInfo?.budget?.maximumBudget?.unit || "₹INR"}
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
                <NewSelectTextFieldStructure
                  label="Payment status"
                  isEdit={isEdit}
                  handleChange={(e) =>
                    handleChange(e, "budget", "paymentStatus")
                  }
                  name={"paymentStatus"}
                  // list={allDropdownOptions?.find(rs => rs.name == "Service Type")?.childSub || []}
                  value={profileInfo?.budget?.paymentStatus}
                />
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
                  disabled={true}
                  value={profileInfo?.currentAddress?.country}
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
                  list={interestedStatesList}
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
                  type={"number"}
                  value={profileInfo?.currentAddress?.pinCode}
                  isEdit={isEdit}
                  handleChange={(e) =>
                    handleChange(e, "currentAddress", "pinCode")
                  }
                  id={"pinCode"}
                  name={"pinCode"}
                  maxlength={6}
                />
              </Grid>
            </Card>
          </Grid>
          {/* <Grid item xs={12} id="setting">
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
              <Box sx={{ p: 2 }}>
                <Grid container rowSpacing={1} columnSpacing={2}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Switch
                      checked={profileInfo?.settings?.dnd}
                      name={"dnd"}
                      onChange={handleChangeSettings}
                      color="primary"
                    />
                    <Typography variant="body1">
                      Do not disturb (DND) mode
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Switch
                      checked={profileInfo?.settings?.rwp}
                      name={"rwp"}
                      onChange={handleChangeSettings}
                      color="primary"
                    />
                    <Typography variant="body1">
                      Don't send WhatsApp promotions
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid> */}
        </Grid>
      </Container>
      <Box
        sx={{
          position: "fixed",
          right: 16,
          bottom: 16,
          // display: { xs: "none", evmd: "flex" },
        }}
      >
        <Fab
          variant="extended"
          sx={{ justifyContent: "flex-start" }}
          onClick={handleSave}
          disabled={!checkMandatoryFields()}
        >
          <SaveIcon fontSize="small" sx={{ mr: 1 }} />
          Save
        </Fab>
      </Box>
    </>
  );
}

export default Profile;
