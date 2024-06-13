"use client";

import {
  Container,
  Box,
  Typography,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import React, { useEffect, useState } from "react";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";

import { createUserAPI, sendOtpAPI, signInAPI, signInAuthenticationAPI, verifyOtpAPI } from "api/Auth.api";
import { useSnackbar } from "utills/SnackbarContext";
import { useAuth } from "utills/AuthContext";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { countries } from "utills/Constants";

function JoinNow() {
  const router = useRouter();

  const [step, setStep] = useState(1)
  const { openSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [resendLoading, setResendLoading] = useState(false);
  const [form, setForm] = useState({
    countryCode: countries?.[0]?.value,
    phone: "",
    firstName: "",
    lastName: "",
    googleId: "",
    role: "broker",
    businessType: "INDIVIDUAL",
    reraNo: "",
    company: "",
    companyType: "",
    email: "",
    phoneNumber: "",
    termsAndConditions: false
  });
  const [otpInput, setOtpInput] = useState("");
  const nextStep = () => setStep(prev => prev + 1)
  const previousStep = () => setStep(prev => prev - 1)


  const handleClick = (message, severity) => {
    openSnackbar(message, severity);
  };

  const getSignInUrl = async () => {
    try {
      setLoading(true);

      const data = await signInAPI("consultant");

      if (data?.data?.data?.authUrl) {
        window.location.href = data.data.data.authUrl;
      } else {
        handleClick("Unexpected response format from signInAPI", "error");
      }
    } catch (error) {
      handleClick(
        error?.response?.data?.message ||
        error?.message ||
        "Error fetching sign-in URL",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && searchParams.get("code")) {
      AuthenticateUser(searchParams.get("code"));
    }
  }, []);
  let count = 0

  const AuthenticateUser = async (code) => {
    try {
      if (count === 0) {
        count++
        setLoading(true);
        const res = await signInAuthenticationAPI({ code: code, type: "consultant" });
        const { email, id, name, token, userDetails } = res?.data?.data;
        let formData = {
          email: email,
          googleId: id,
          firstName: name?.split(" ")?.[0] || "",
          lastName: name?.split(" ")?.[name?.split(" ")?.length - 1] || "",
        }

        if (token) {
          if (userDetails?.isBlocked) {
            setLoading(false);
            openSnackbar("You can't access. Contact Acrebytes team", "warning");
            return;
          } else {
            login(userDetails, token);
            router.push("/");
            return;
          }
        }

        setLoading(false);
        openSnackbar("Authentication successful", "success");

        setForm((prev) => ({
          ...prev,
          ...formData
        }));

        nextStep();
      }
    } catch (error) {
      handleClick(
        error?.response?.data?.message ||
        error?.message ||
        "Error fetching sign-in URL",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name, value)=> {
      setForm(prev=> ({
          ...prev,
          [name]: value
      }))
  }

  const sendOtpFun = async (isResend) => {
    try {
      setResendLoading(true);
      let payload = {
        phoneNumber: form.phone,
        countryCode: form.countryCode,
      };
      const res = await sendOtpAPI(payload);
      if (res.status === 200) {
        openSnackbar("Verfication code send successfully", "success");
        if (!isResend) {
          setShowOtp(true)
          setOtpVerified(true)
        }
      }
    } catch (error) {
      handleClick(
        error?.response?.data?.message ||
        error?.message ||
        "Error fetching sign-in URL",
        "error"
      );
    } finally {
      setResendLoading(false);
    }
  };

  const createUserFun = async () => {
    try {
      setLoading(true);
      let payload = {
        name: {
          firstName: form.firstName,
          lastName: form.lastName,
        },
        phone: {
          countryCode: form.countryCode,
          number: form.phone,
        },
        email: form.email,
        role: form.role,
        googleId: form.googleId,
        businessType: form.businessType,
        company: form.company,
        reraNo: form.reraNo,
        companyType: form.companyType
      };
      const res = await createUserAPI(payload);
      if (res.status === 200) {
        const { token, userDetails } = res?.data?.data;
        if (userDetails?.isBlocked) {
          openSnackbar("You can't access. Contact Acrebytes team", "warning");
          return;
        } else {
          login(userDetails, token);
          router.push("/");
        }
      }
    } catch (error) {
      handleClick(
        error?.response?.data?.message ||
        error?.message ||
        "Error fetching sign-in URL",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpFun = async () => {
    try {
      setLoading(true);
      let payload = {
        phoneNumber: form.phone,
        countryCode: form.countryCode,
        otp: otpInput,
      };
      const res = await verifyOtpAPI(payload);
      if (res.status === 200) {
        createUserFun()
      }
    } catch (error) {
      handleClick(
        error?.response?.data?.message ||
        error?.message ||
        "Error fetching sign-in URL",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = (isResend)=> {
    if(otpVerified && !isResend){
      verifyOtpFun()
      return
    }
    sendOtpFun(isResend)
  }

  const getStep = () => {
    switch (step) {
      case 1: {
        return <Step1 getSignInUrl={getSignInUrl} loading={loading} />
      }
      case 2: {
        return <Step2 
        otpInput={otpInput}
        setOtpInput={setOtpInput}
        resendLoading={resendLoading}
        showOtp={showOtp} 
        form={form} 
        handleChange={handleChange} 
        handleSignUp={handleSignUp}/>
      }
      case 3: {
        return <Step3 />
      }
    }
  }

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
              <CustomButton ButtonText={"Share"} startIcon={<WhatsAppIcon />} />
            </Box>
          </Box>
        </Container>
      </Box>
      {
        getStep()
      }
    </>
  );
}

export default JoinNow;
