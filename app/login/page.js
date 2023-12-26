"use client";

import {
  Container,
  Card,
  Grid,
  Typography,
  Box,
  Button,
  ToggleButton,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import React, { useState } from "react";
import InputField from "Components/CommonLayouts/InputField";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import colors from "styles/theme/colors";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/navigation";
import NewPhoneInputField from "Components/CommonLayouts/NewPhoneInputField";
import OTPInputLayout from "Components/CommonLayouts/OTPInputLayout";
import NewToggleButtonStructure from "Components/CommonLayouts/NewToggleButtonStructure";
import { listOfPages } from "Components/NavBar/Links";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";

function Login() {
  const router = useRouter();

  const [googleUser, setGoogleUser] = useState(null);

  const [sendOtp, setSendOtp] = useState(false);

  const [otpInput, setOtpInput] = useState();

  const [isVerified, setIsVerified] = useState(false);

  const [roleTypeToggleAlignment, setRoleTypeToggleAlignment] =
    React.useState("");

  const handleChangeRoleTypeToggle = (event, newAlignment) => {
    setRoleTypeToggleAlignment(newAlignment);
  };
  const [showConsultantDetailsPopup, setShowConsultantDetailsPopup] =
    useState(false);
  const handleConsultantDetailsSubmit = () => {
    setShowConsultantDetailsPopup(false);
  };
  const [isEdit, setIsEdit] = useState(true);
  const [businessTypeToggleAlignment, setBusinessTypeToggleAlignment] =
    React.useState("");
  const handleChangeBusinessTypeToggle = (event, newAlignment) => {
    setBusinessTypeToggleAlignment(newAlignment);
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 3 }}>
        <Grid container spacing={2}>
          {googleUser === null && !sendOtp && !isVerified ? (
            <>
              <Grid item xs={12}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Welcome to, <span style={{ color: "gray" }}>Acrebytes</span>
                </Typography>
                <Typography variant="body1">
                  Create account using Google
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "end" }}>
                <Button
                  variant="contained"
                  sx={{ mt: 1 }}
                  startIcon={<GoogleIcon />}
                  onClick={() => {
                    setGoogleUser({ email: "" });
                  }}
                >
                  Sign in with Google
                </Button>
              </Grid>
            </>
          ) : sendOtp && !isVerified ? (
            <>
              <Grid item xs={12}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Mobile verification,
                  <span style={{ color: "gray" }}> enter OTP</span>
                </Typography>
                <Typography variant="body1">
                  This is to ensure we connect with intended Customer only
                </Typography>
              </Grid>

              <Grid item xs={12} sx={{ display: "flex", mt: 1 }}>
                <Box sx={{ flex: 1 }}>
                  <OTPInputLayout
                    otpInput={otpInput}
                    setOtpInput={setOtpInput}
                  />
                </Box>
                <Box sx={{ alignSelf: "center" }}>
                  <Button disabled>Resend OTP</Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  sx={{ textTransform: "uppercase", color: colors.DISABLED }}
                >
                  Received at +99132435353
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  pt: "24px !important",
                }}
              >
                <Button
                  startIcon={<ArrowBackIosIcon />}
                  onClick={() => {
                    setIsVerified(false);
                    setSendOtp(false);
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setIsVerified(true);
                  }}
                >
                  Verify
                </Button>
              </Grid>
            </>
          ) : isVerified ? (
            <>
              <Grid item xs={12}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Hi Anand Gupta,{" "}
                  <span style={{ color: "gray" }}>welcome to Acrebytes</span>
                </Typography>
              </Grid>

              <Grid item xs={12} sx={{ my: 1 }}>
                <NewToggleButtonStructure
                  isEdit={isEdit}
                  label={"Select your role"}
                  value={roleTypeToggleAlignment}
                  handleChange={handleChangeRoleTypeToggle}
                  toggleStyle={{
                    diplay: "flex",
                    flexDirection: "column",
                    mt: 1,
                  }}
                >
                  <ToggleButton
                    fullWidth
                    size="small"
                    value="consultant"
                    sx={{
                      border: `1px solid ${colors.LIGHT_GRAY} !important`,
                      borderRadius: "0 !important",
                    }}
                    onClick={() => setShowConsultantDetailsPopup(true)}
                  >
                    I am a Real estate consultant
                  </ToggleButton>
                  <ToggleButton
                    fullWidth
                    size="small"
                    value="buyer"
                    sx={{
                      border: `1px solid ${colors.LIGHT_GRAY} !important`,
                      borderRadius: "0 !important",
                      ml: "0 !important",
                    }}
                  >
                    I am here to explore / buy a property
                  </ToggleButton>
                </NewToggleButtonStructure>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "end" }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    router.push(listOfPages.home);
                  }}
                >
                  Confirm
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sx={{ mb: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Create your <span style={{ color: "gray" }}>account</span>
                </Typography>
                <Typography variant="body1">
                  Connect with professional property consultants only
                </Typography>
              </Grid>
              <InputField label="First name" halfSm />
              <InputField label="Last name" halfSm />
              <NewPhoneInputField label="Phone number" />
              <Grid item xs={12} sx={{ textAlign: "end" }}>
                <Button
                  sx={{ mt: 1 }}
                  variant="contained"
                  onClick={() => {
                    setSendOtp(true);
                  }}
                >
                  Confirm
                </Button>
              </Grid>
            </>
          )}
        </Grid>
        <Dialog
          open={showConsultantDetailsPopup}
          onClose={() => setShowConsultantDetailsPopup(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Additional Details for Real Estate Consultant
          </DialogTitle>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setShowConsultantDetailsPopup(false)}
              color="primary"
            >
             I'll do it later!
            </Button>
            <Button onClick={handleConsultantDetailsSubmit} color="primary" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Container>
  );
}

export default Login;
