"use client";

import { Container, Card, Grid, Typography, Box, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import React, { useState } from "react";
import InputField from "Components/CommonLayouts/InputField";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import colors from "styles/theme/colors";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/navigation";
import NewPhoneInputField from "Components/CommonLayouts/NewPhoneInputField";
import OTPInputLayout from "Components/CommonLayouts/OTPInputLayout";

function Login() {
  const router = useRouter();

  const [googleUser, setGoogleUser] = useState(null);

  const [sendOtp, setSendOtp] = useState(false);

  const [otpInput, setOtpInput] = useState();

  const [isVerified, setIsVerified] = useState(false);

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {googleUser === null && !sendOtp && !isVerified ? (
            <Grid item xs={12}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Welcome to, <span style={{ color: "gray" }}>Acresbyte</span>
              </Typography>
              <Typography variant="body1">
                Create account using Google
              </Typography>
              <Grid item xs={12} sx={{ textAlign: "end" }}>
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  startIcon={<GoogleIcon />}
                  onClick={() => {
                    setGoogleUser({ email: "" });
                  }}
                >
                  Sign in with Google
                </Button>
              </Grid>
            </Grid>
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

              <Grid item xs={12} sx={{ display: "flex" }}>
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
                sx={{ display: "flex", justifyContent: "space-between" }}
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
                  <span style={{ color: "gray" }}>welcome to Acresbyte</span>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  You have been successfully verified
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "end" }}>
                <Button
                  variant="contained"
                  startIcon={<HomeIcon />}
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Go to home
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12}>
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
      </Card>
    </Container>
  );
}

export default Login;
