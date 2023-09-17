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

  const [expandOther, setExpandOther] = React.useState(false);
  const toggleAcordionOther = () => {
    setExpandOther((prev) => !prev);
  };

  const [expandInterested, setExpandInterested] = React.useState(false);
  const toggleAcordionInterested = () => {
    setExpandInterested((prev) => !prev);
  };

  const [expandAddress, setExpandAddress] = React.useState(false);
  const toggleAcordionAddress = () => {
    setExpandAddress((prev) => !prev);
  };

  const [expandProperty, setExpandProperty] = React.useState(true);
  const toggleAcordionProperty = () => {
    setExpandProperty((prev) => !prev);
  };

  const [expandExploring, setExpandExploring] = React.useState(false);
  const toggleAcordionExploring = () => {
    setExpandExploring((prev) => !prev);
  };

  const [expandPurpose, setExpandPurpose] = React.useState(false);
  const toggleAcordionPurpose = () => {
    setExpandPurpose((prev) => !prev);
  };

  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12}>
          <Accordion expanded={expandProfile}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon onClick={toggleAcordionProfile} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body1" sx={{ flex: 1, alignSelf: "center" }}>
                Profile
              </Typography>
              <Button>Edit</Button>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <InputField label="First name" variant="outlined" halfSm />
                <InputField label="Last name" variant="outlined" halfSm />
                <PhoneInputField halfSm />
                <InputField label="Email 1" variant="outlined" halfSm />
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion expanded={expandOther}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon onClick={toggleAcordionOther} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body1" sx={{ flex: 1, alignSelf: "center" }}>
                Other details
              </Typography>
              <Button>Edit</Button>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <SelectTextFields label="Service type" value="No data" />
                </Grid>
                <InputField label="Company" variant="outlined" halfSm />
                <InputField label="Salary" variant="outlined" halfSm />
                <Grid item xs={12} sm={6}>
                  <SelectTextFields label="Family" />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion expanded={expandInterested}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon onClick={toggleAcordionInterested} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body1" sx={{ flex: 1, alignSelf: "center" }}>
                Interested cities
              </Typography>
              <Button>Edit</Button>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <SelectTextFields label="Select City" />
                </Grid>
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
          <Accordion expanded={expandAddress}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon onClick={toggleAcordionAddress} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body1" sx={{ flex: 1, alignSelf: "center" }}>
                Current address
              </Typography>
              <Button>Edit</Button>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
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
                <InputField label="Address line 1" variant="outlined" halfSm />
                <InputField label="Address line 2" variant="outlined" halfSm />
                <InputField label="City" variant="outlined" halfSm />
                <InputField label="State" variant="outlined" halfSm />
                <InputField label="Country" variant="outlined" halfSm />
                <InputField label="Pincode" variant="outlined" halfSm />
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Accordion expanded={expandProperty}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon onClick={toggleAcordionProperty} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body1" sx={{ flex: 1, alignSelf: "center" }}>
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
          <Accordion expanded={expandExploring}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon onClick={toggleAcordionExploring} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body1" sx={{ flex: 1, alignSelf: "center" }}>
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
          <Accordion expanded={expandPurpose}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon onClick={toggleAcordionPurpose} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body1" sx={{ flex: 1, alignSelf: "center" }}>
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
