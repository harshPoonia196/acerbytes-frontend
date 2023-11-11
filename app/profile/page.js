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
import NewPhoneInputFieldStructure from "../../Components/CommonLayouts/NewPhoneInputFieldStructure";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import { useState } from "react";
import colors from "styles/theme/colors";
import NewAutoCompleteInputStructure from "Components/CommonLayouts/NewAutoCompleteInputStructure";
import NewCurrencyInputField from "Components/CommonLayouts/NewCurrencyInputField";

function Profile() {
  const [propertyTypeToggleAlignment, setPropertyTypeToggleAlignment] =
    React.useState("web");

  const handleChangePropertyTypeToggle = (event, newAlignment) => {
    setPropertyTypeToggleAlignment(newAlignment);
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
            value={propertyTypeToggleAlignment}
            exclusive
            fullWidth
            onChange={handleChangePropertyTypeToggle}
            aria-label="Platform"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <ToggleButton
              sx={{
                border: "1px solid gainsboro !important",
                borderRadius: "0 !important",
              }}
              fullWidth
              size="small"
              value="owned"
            >
              User details
            </ToggleButton>

            <ToggleButton
              sx={{
                border: "1px solid gainsboro !important",
                borderRadius: "0 !important",
              }}
              fullWidth
              size="small"
              value="rented"
            >
              Interested cities
            </ToggleButton>
            <ToggleButton
              sx={{
                border: "1px solid gainsboro !important",
                borderRadius: "0 !important",
              }}
              fullWidth
              size="small"
              value="rented"
            >
              Budget
            </ToggleButton>
            <ToggleButton
              sx={{
                border: "1px solid gainsboro !important",
                borderRadius: "0 !important",
              }}
              fullWidth
              size="small"
              value="rented"
            >
              Enquiries
            </ToggleButton>
            <ToggleButton
              sx={{
                border: "1px solid gainsboro !important",
                borderRadius: "0 !important",
              }}
              fullWidth
              size="small"
              value="rented"
            >
              Property Consultants
            </ToggleButton>
            <ToggleButton
              sx={{
                border: "1px solid gainsboro !important",
                borderRadius: "0 !important",
              }}
              fullWidth
              size="small"
              value="owned"
            >
              Current address
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Grid container spacing={2} sx={{ flex: 1, overflow: "auto" }}>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
                      onDelete={() => {}}
                    />
                    <Chip
                      label="Mumbai"
                      size="small"
                      sx={{ ml: 1, mt: 1 }}
                      onDelete={() => {}}
                    />
                    <Chip
                      label="Mumbai"
                      size="small"
                      sx={{ ml: 1, mt: 1 }}
                      onDelete={() => {}}
                    />
                    <Chip
                      label="Mumbai"
                      size="small"
                      sx={{ ml: 1, mt: 1 }}
                      onDelete={() => {}}
                    />
                  </Box>
                  <Box>
                    <Button variant="contained">Add</Button>
                  </Box>
                </Grid>
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
          <Grid item xs={12}>
            <Card>
              <Box sx={{ display: "flex", p: 2, py: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                >
                  Enquiried for
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
          <Grid item xs={12}>
            <Card>
              <Box sx={{ display: "flex", p: 2, py: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                >
                  Exploring as
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
                  <ToggleButtonGroup
                    color="primary"
                    value={propertyTypeToggleAlignment}
                    exclusive
                    fullWidth
                    onChange={handleChangePropertyTypeToggle}
                    aria-label="Platform"
                  >
                    <ToggleButton fullWidth size="small" value="owned">
                      Active
                    </ToggleButton>
                    <ToggleButton fullWidth size="small" value="rented">
                      Passive
                    </ToggleButton>
                    <ToggleButton fullWidth size="small" value="rented">
                      Urgent
                    </ToggleButton>
                    <ToggleButton fullWidth size="small" value="rented">
                      NA
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
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
                  Purpose
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
                  <ToggleButtonGroup
                    color="primary"
                    value={propertyTypeToggleAlignment}
                    exclusive
                    fullWidth
                    onChange={handleChangePropertyTypeToggle}
                    aria-label="Platform"
                  >
                    <ToggleButton fullWidth size="small" value="owned">
                      Buyer
                    </ToggleButton>
                    <ToggleButton fullWidth size="small" value="rented">
                      Investor
                    </ToggleButton>
                    <ToggleButton fullWidth size="small" value="rented">
                      Both
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
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
                <Grid item xs={12} sm={isEdit ? 12 : 6}>
                  <Typography
                    variant="subtitle2"
                    sx={{ alignSelf: "center", color: colors.GRAY }}
                  >
                    Address type
                  </Typography>
                  {isEdit ? (
                    <ToggleButtonGroup
                      color="primary"
                      value={propertyTypeToggleAlignment}
                      exclusive
                      fullWidth
                      onChange={handleChangePropertyTypeToggle}
                      aria-label="Platform"
                    >
                      <ToggleButton fullWidth size="small" value="owned">
                        Owned
                      </ToggleButton>
                      <ToggleButton fullWidth size="small" value="rented">
                        Rented
                      </ToggleButton>
                    </ToggleButtonGroup>
                  ) : (
                    <Typography variant="subtitle1">Value</Typography>
                  )}
                </Grid>
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
