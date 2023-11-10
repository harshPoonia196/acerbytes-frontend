"use client";

import {
  Container,
  Card,
  Typography,
  Grid,
  Divider,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import InputField from "Components/CommonLayouts/InputField";
import PhoneInputField from "Components/CommonLayouts/PhoneInputField";
import SelectTextFields from "Components/CommonLayouts/SelectTextFields";
import PropertyTable from "Components/ProfilePage/PropertyTable";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import NewPhoneInputFieldStructure from "../../Components/CommonLayouts/NewPhoneInputFieldStructure";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";

function Profile() {
  const [propertyTypeToggleAlignment, setPropertyTypeToggleAlignment] =
    React.useState("web");

  const handleChangePropertyTypeToggle = (event, newAlignment) => {
    setPropertyTypeToggleAlignment(newAlignment);
  };

  const [expandProfile, setExpandProfile] = React.useState(true);
  const toggleAcordionProfile = () => {
    setExpandProfile((prev) => !prev);
  };

  const [expandOther, setExpandOther] = React.useState(true);
  const toggleAcordionOther = () => {
    setExpandOther((prev) => !prev);
  };

  const [expandInterested, setExpandInterested] = React.useState(true);
  const toggleAcordionInterested = () => {
    setExpandInterested((prev) => !prev);
  };

  const [expandAddress, setExpandAddress] = React.useState(true);
  const toggleAcordionAddress = () => {
    setExpandAddress((prev) => !prev);
  };

  const [expandProperty, setExpandProperty] = React.useState(true);
  const toggleAcordionProperty = () => {
    setExpandProperty((prev) => !prev);
  };

  const [expandExploring, setExpandExploring] = React.useState(true);
  const toggleAcordionExploring = () => {
    setExpandExploring((prev) => !prev);
  };

  const [expandPurpose, setExpandPurpose] = React.useState(true);
  const toggleAcordionPurpose = () => {
    setExpandPurpose((prev) => !prev);
  };

  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Card sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography>Anand Gupta</Typography>
              <Typography>Mumbai</Typography>
            </Box>
            <Typography>+91 8794561234</Typography>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Accordion sx={{ boxShadow: "none" }} expanded={expandProfile}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon onClick={toggleAcordionProfile} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant="subtitle2"
                sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                onClick={toggleAcordionProfile}
              >
                Profile
              </Typography>
              <Button>Edit</Button>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <NewInputFieldStructure label="First name" variant="outlined" />
                <NewInputFieldStructure
                  label="Last name"
                  variant="outlined"
                  halfSm
                />
                <NewPhoneInputFieldStructure variant="outlined" label="Phone" />
                <NewInputFieldStructure
                  label="Email 1"
                  variant="outlined"
                  halfSm
                />
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion sx={{ boxShadow: "none" }} expanded={expandOther}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon onClick={toggleAcordionOther} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant="subtitle2"
                sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                onClick={toggleAcordionOther}
              >
                Other details
              </Typography>
              <Button>Edit</Button>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <NewSelectTextFieldStructure label="Service type" />
                <NewInputFieldStructure label="Company" variant="outlined" />
                <NewInputFieldStructure label="Salary" variant="outlined" />

                <NewSelectTextFieldStructure label="Family" />
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion sx={{ boxShadow: "none" }} expanded={expandInterested}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon onClick={toggleAcordionInterested} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant="subtitle2"
                sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                onClick={toggleAcordionInterested}
              >
                Interested cities
              </Typography>
              <Button>Edit</Button>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <NewSelectTextFieldStructure label="Select City" />
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ textAlign: { xs: "end", sm: "start" } }}
                >
                  <Button variant="contained">Add</Button>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Chip
                      label="Mumbai"
                      size="small"
                      sx={{ mr: 1 }}
                      onDelete={() => {}}
                    />
                    <Chip
                      label="Mumbai"
                      size="small"
                      sx={{ mr: 1 }}
                      onDelete={() => {}}
                    />
                    <Chip
                      label="Mumbai"
                      size="small"
                      sx={{ mr: 1 }}
                      onDelete={() => {}}
                    />
                    <Chip
                      label="Mumbai"
                      size="small"
                      sx={{ mr: 1 }}
                      onDelete={() => {}}
                    />
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion sx={{ boxShadow: "none" }} expanded={expandAddress}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon onClick={toggleAcordionAddress} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant="subtitle2"
                sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                onClick={toggleAcordionAddress}
              >
                Current address
              </Typography>
              <Button>Edit</Button>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={6} sx={{ display: "flex" }}>
                  <Typography variant="subtitle1" sx={{ alignSelf: "center" }}>
                    Address type
                  </Typography>
                </Grid>
                <Grid item xs={6}>
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
                </Grid>
                <NewInputFieldStructure
                  label="Address line 1"
                  variant="outlined"
                />
                <NewInputFieldStructure
                  label="Address line 2"
                  variant="outlined"
                />
                <NewInputFieldStructure label="City" variant="outlined" />
                <NewInputFieldStructure label="State" variant="outlined" />
                <NewInputFieldStructure label="Country" variant="outlined" />
                <NewInputFieldStructure label="Pincode" variant="outlined" />
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion sx={{ boxShadow: "none" }} expanded={expandProperty}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon onClick={toggleAcordionProperty} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant="subtitle2"
                sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                onClick={toggleAcordionProperty}
              >
                Enquiried for
              </Typography>
              <Button>Edit</Button>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <PropertyTable />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion sx={{ boxShadow: "none" }} expanded={expandExploring}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon onClick={toggleAcordionExploring} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant="subtitle2"
                sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                onClick={toggleAcordionExploring}
              >
                Exploring as
              </Typography>
              <Button>Edit</Button>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
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
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion sx={{ boxShadow: "none" }} expanded={expandPurpose}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon onClick={toggleAcordionPurpose} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant="subtitle2"
                sx={{ flex: 1, alignSelf: "center", fontWeight: "bold" }}
                onClick={toggleAcordionPurpose}
              >
                Purpose
              </Typography>
              <Button>Edit</Button>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
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
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
