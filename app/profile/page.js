"use client";

import {
  Container,
  Card,
  Typography,
  Grid,
  ListItemButton,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  Divider,
  ListItem,
  IconButton,
  Tabs,
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

function Profile() {

  const router = useRouter()

  const [exploringAsToggle, setExploringAsToggle] = useState('')

  const handleChangeExploringAsToggle = (event, newAlignment) => {
    if (newAlignment != null)
      setExploringAsToggle(newAlignment);
  }

  const [purposeToggle, setPurposeToggle] = useState('')

  const handleChangePurposeToggle = (event, newAlignment) => {
    if (newAlignment != null)
      setPurposeToggle(newAlignment);
  }

  const [purchaseToggle, setPurchaseToggle] = useState('')

  const handleChangePurchaseToggle = (event, newAlignment) => {
    if (newAlignment != null)
      setPurchaseToggle(newAlignment);
  }

  const [demographicToggle, setDemographicToggle] = useState('')

  const handleChangeDemographicToggle = (event, newAlignment) => {
    if (newAlignment != null)
      setDemographicToggle(newAlignment);
  }

  const [interestedForLoanToggle, setInterestedForLoanToggle] = useState('')

  const handleChangeInterestedForLoanToggle = (event, newAlignment) => {
    if (newAlignment != null)
      setInterestedForLoanToggle(newAlignment);
  }

  const [propertyTypeToggleAlignment, setPropertyTypeToggleAlignment] =
    React.useState("");

  const handleChangePropertyTypeToggle = (event, newAlignment) => {
    setPropertyTypeToggleAlignment(newAlignment);
  };

  const [profilePageToggleAlignment, setProfilePageToggleAlignment] = React.useState("userDetails");

  const handleChangePropertyPageToggle = (event, newAlignment) => {
    if (newAlignment != null) {
      setProfilePageToggleAlignment(newAlignment);
      router.push(`#${newAlignment}`)
    }
  };

  const [isEdit, setIsEdit] = useState(true);


  const sectionRef = useRef([])

  useEffect(() => {

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const newAlignment = entry.target.getAttribute('id');
          setProfilePageToggleAlignment(newAlignment);
        }
      })

      console.log(entries)
    }, {
      root: null, // Set root to null to use the viewport as the root
      rootMargin: "0px", // Set rootMargin to "0px" to trigger when the top of the section approaches the top of the viewport
      threshold: 1.0, // Set threshold to 1.0 to trigger when the section is fully visible
    })

    sectionRef.current.forEach(section => {
      observer.observe(section)
    })

    return () => {
      // Cleanup observer when component is unmounted
      observer.disconnect();
    };

  }, [])

  const refCallback = useCallback((element) => {
    if (element) {
      sectionRef.current.push(element)
    }
  })

  return (
    <Container maxWidth="md">
      <NavTabProfilePage value={profilePageToggleAlignment}
        handleChange={handleChangePropertyPageToggle}
      />
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          height: `calc(100vh - 160px)`,
          mt: '1rem'
        }}
      >
        <Grid container spacing={2} sx={{ flex: 1, overflow: "auto" }}>
          <Grid item xs={12} id="userDetails" ref={refCallback}>
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
                  label="Email 1"
                  variant="outlined"
                  isEdit={isEdit}
                />
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} id="serviceDetails" ref={refCallback}>
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
                  label="Salary"
                  variant="outlined"
                  isEdit={isEdit}
                />
                <NewSelectTextFieldStructure label="Family" isEdit={isEdit} />
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} id="interestedCities" ref={refCallback}>
            <Card>
              <Box sx={{ display: "flex", p: 2, py: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                >
                  Interested cities
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
          <Grid item xs={12} id="budget" ref={refCallback}>
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
                <NewToggleButtonStructure label="Exploring as" isEdit={isEdit} value={exploringAsToggle} handleChange={handleChangeExploringAsToggle}>
                  <ToggleButton fullWidth size="small" value="active">
                    Active
                  </ToggleButton>
                  <ToggleButton fullWidth size="small" value="passive">
                    Passive
                  </ToggleButton>
                  <ToggleButton fullWidth size="small" value="urgent">
                    Urgent
                  </ToggleButton>
                  <ToggleButton fullWidth size="small" value="na">
                    NA
                  </ToggleButton>
                </NewToggleButtonStructure>
                <NewToggleButtonStructure label="Purpose" isEdit={isEdit} value={purposeToggle} handleChange={handleChangePurposeToggle}>
                  <ToggleButton fullWidth size="small" value="buyer">
                    Buyer
                  </ToggleButton>
                  <ToggleButton fullWidth size="small" value="investor">
                    Investor
                  </ToggleButton>
                  <ToggleButton fullWidth size="small" value="both">
                    Both
                  </ToggleButton>
                </NewToggleButtonStructure>
                <NewToggleButtonStructure label="Purchase" isEdit={isEdit} value={purchaseToggle} handleChange={handleChangePurchaseToggle}>
                  <ToggleButton fullWidth size="small" value="first">
                    First
                  </ToggleButton>
                  <ToggleButton fullWidth size="small" value="second">
                    Second
                  </ToggleButton>
                  <ToggleButton fullWidth size="small" value="third">
                    Third
                  </ToggleButton>
                </NewToggleButtonStructure>
                <NewToggleButtonStructure label="Demographic" isEdit={isEdit} value={demographicToggle} handleChange={handleChangeDemographicToggle}>
                  <ToggleButton fullWidth size="small" value="family">
                    Family
                  </ToggleButton>
                  <ToggleButton fullWidth size="small" value="single">
                    Single
                  </ToggleButton>
                </NewToggleButtonStructure>
                <NewToggleButtonStructure label="Interested for loan" isEdit={isEdit} value={interestedForLoanToggle} handleChange={handleChangeInterestedForLoanToggle}>
                  <ToggleButton fullWidth size="small" value="yes">
                    Yes
                  </ToggleButton>
                  <ToggleButton fullWidth size="small" value="no">
                    No
                  </ToggleButton>
                </NewToggleButtonStructure>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} id="enquiries" ref={refCallback}>
            <Card>
              <Box sx={{ display: "flex", p: 2, py: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                >
                  User action
                </Typography>
                <Box>
                  <IconButton>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              <Divider />
              <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={12}>
                  <PropertyTable />
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} id="currentAddress" ref={refCallback}>
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
                <NewToggleButtonStructure isEdit={isEdit} label="Address type" value={propertyTypeToggleAlignment} handleChange={handleChangePropertyTypeToggle}>
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
        </Grid>
      </Box>
    </Container>
  );
}

export default Profile;
