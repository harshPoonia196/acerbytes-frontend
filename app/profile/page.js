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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CallIcon from "@mui/icons-material/Call";
import PropertyTable from "Components/ProfilePage/PropertyTable";
import React from "react";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import NewPhoneInputFieldStructure from "Components/CommonLayouts/NewPhoneInputFieldStructure";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import { useState } from "react";
import colors from "styles/theme/colors";
import NewAutoCompleteInputStructure from "Components/CommonLayouts/NewAutoCompleteInputStructure";
import NewCurrencyInputField from "Components/CommonLayouts/NewCurrencyInputField";
import { useRouter } from "next/navigation";
import NewToggleButtonStructure from "Components/CommonLayouts/NewToggleButtonStructure";

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

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          height: `calc(100vh - 100px)`,
        }}
      >
        <Box sx={{ width: "240px", height: "100%", overflow: "hidden", p: 1 }}>
          <ToggleButtonGroup
            color="primary"
            value={profilePageToggleAlignment}
            exclusive
            fullWidth
            onChange={handleChangePropertyPageToggle}
            aria-label="Platform"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <ToggleButton
              sx={{
                border: "1px solid gainsboro !important",
                borderRadius: "0 !important",
                justifyContent: 'flex-start'
              }}
              fullWidth
              size="small"
              value="userDetails"
            >
              User details
            </ToggleButton>

            <ToggleButton
              sx={{
                border: "1px solid gainsboro !important",
                borderRadius: "0 !important",
                justifyContent: 'flex-start'
              }}
              fullWidth
              size="small"
              value="interestedCities"
            >
              Interested cities
            </ToggleButton>
            <ToggleButton
              sx={{
                border: "1px solid gainsboro !important",
                borderRadius: "0 !important",
                justifyContent: 'flex-start'
              }}
              fullWidth
              size="small"
              value="budget"
            >
              Budget
            </ToggleButton>
            <ToggleButton
              sx={{
                border: "1px solid gainsboro !important",
                borderRadius: "0 !important",
                justifyContent: 'flex-start'
              }}
              fullWidth
              size="small"
              value="enquiries"
            >
              Enquiries
            </ToggleButton>
            <ToggleButton
              sx={{
                border: "1px solid gainsboro !important",
                borderRadius: "0 !important",
                justifyContent: 'flex-start'
              }}
              fullWidth
              size="small"
              value="propertyConsultants"
            >
              Property Consultants
            </ToggleButton>
            <ToggleButton
              sx={{
                border: "1px solid gainsboro !important",
                borderRadius: "0 !important",
                justifyContent: 'flex-start'
              }}
              fullWidth
              size="small"
              value="currentAddress"
            >
              Current address
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Grid container spacing={2} sx={{ flex: 1, overflow: "auto" }}>
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
                    <CallIcon sx={{ alignSelf: "center" }} />
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
          <Grid item xs={12}>
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
          <Grid item xs={12} id="interestedCities">
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
          <Grid item xs={12} id="enquiries">
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
          <Grid item xs={12} id="currentAddress">
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
