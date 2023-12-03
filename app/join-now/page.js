"use client";

import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  Grid,
  Divider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InputField from "Components/CommonLayouts/InputField";
import PhoneInputField from "Components/CommonLayouts/PhoneInputField";
import React from "react";

function JoinNow() {
  const [brokerType, setBrokerType] = React.useState("individual");

  const handleChangeBrokerType = (event, newAlignment) => {
    setBrokerType(newAlignment);
  };

  return (
    <>
      <Box sx={{ backgroundColor: "white" }}>
        <Container sx={{ pb: "0 !important", textAlign: "center" }}>
          <Box sx={{ py: 4 }}>
            <Typography variant="h4">
              Connect with our professional real estate consultant
            </Typography>
            <Typography variant="h6">75 Active consultant</Typography>
            <Box>
              <Button startIcon={<WhatsAppIcon />}>Share</Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="evmd">
        <Card sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">
                Sign up as Real estate Consultant
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Divider />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                borderRight: { xs: "none", sm: "1px solid gainsboro" },
                pt: "0 !important",
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Get active and verified leads
                  </Typography>
                  <Typography variant="caption">
                    Ensure high quality leads are converted for better returns
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Get access to each property research
                  </Typography>
                  <Typography variant="caption">
                    Helps for better consulting and building strong relation
                    with clients
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Get panel to manage your clients and status
                  </Typography>
                  <Typography variant="caption">
                    Get organized to plan meetings and leads status
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Get your profile linked with each propetry
                  </Typography>
                  <Typography variant="caption">
                    Customers will likely to get in touch with you
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: { xs: "block", sm: "none" } }}>
              <Divider />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ pt: { xs: "16px !important", sm: "0 !important" } }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Enter your details
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <ToggleButtonGroup
                    color="primary"
                    value={brokerType}
                    exclusive
                    onChange={handleChangeBrokerType}
                    aria-label="Platform"
                    size="small"
                    fullWidth
                  >
                    <ToggleButton value="individual">Individual</ToggleButton>
                    <ToggleButton value="company">Company</ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
                <InputField label="First name" variant="outlined" halfSm />
                <InputField label="Last name" variant="outlined" halfSm />
                {brokerType === "company" && (
                  <InputField label="Company name" variant="outlined" />
                )}
                <InputField label="Email" variant="outlined" />
                {/* #ptwon# add a verify button */}
                <PhoneInputField label="Phone number" variant="outlined" />
                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked size="small" />}
                      label="I agree with terms and condition"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" fullWidth>
                    Sign up
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Container>
      <Container maxWidth="evmd">
        <Card sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Thanks</Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Divider />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                borderRight: { xs: "none", sm: "1px solid gainsboro" },
                pt: "0 !important",
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Get active and verified leads
                  </Typography>
                  <Typography variant="caption">
                    Ensure high quality leads are converted for better returns
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Get access to each property research
                  </Typography>
                  <Typography variant="caption">
                    Helps for better consulting and building strong relation
                    with clients
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Get panel to manage your clients and status
                  </Typography>
                  <Typography variant="caption">
                    Get organized to plan meetings and leads status
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Get your profile linked with each propetry
                  </Typography>
                  <Typography variant="caption">
                    Customers will likely to get in touch with you
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: { xs: "block", sm: "none" } }}>
              <Divider />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ pt: { xs: "16px !important", sm: "0 !important" } }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Details submitted successfully
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      backgroundColor: "whitesmoke",
                      p: 2,
                      borderRadius: "4px",
                    }}
                  >
                    <Typography variant="body2">
                      Thanks for your interest to join us as Real estate
                      consultant for our clients. We are reviewing your details
                      to get in touch with you shortly.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}

export default JoinNow;
