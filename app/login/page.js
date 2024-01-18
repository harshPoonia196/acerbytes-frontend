"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Container,
  Card,
  Box,
} from "@mui/material";
import {
  createUserAPI,
  sendOtpAPI,
  signInAPI,
  signInAuthenticationAPI,
  verifyOtpAPI,
} from "api/Auth.api";
import SendOtp from "Components/Login/SendOtp";
import Welcome from "Components/Login/Welcome";
import VerifyOtp from "Components/Login/VerifyOtp";
import GoogleSignIn from "Components/Login/GoogleSignIn";
import { useRouter } from "next/navigation";
import { useSnackbar } from "utills/SnackbarContext";
import ConsultantDialog from "Components/Login/ConsultantDialog";
import { useAuth } from "utills/AuthContext";

function Login() {
  const { login } = useAuth();

  const router = useRouter();
  const [showConsultantDetailsPopup, setShowConsultantDetailsPopup] =
    useState(false);

  const [activeStep, setActiveStep] = useState(1);
  const [otpInput, setOtpInput] = useState("");
  const [form, setForm] = useState({
    countryCode: "+91",
    phone: "",
    firstName: "",
    lastName: "",
    googleId: "",
    role: "",
    businessType: "INDIVIDUAL",
    reraNo: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const { openSnackbar } = useSnackbar();

  const handleClick = (message, severity) => {
    openSnackbar(message, severity);
  };

  const handleChange = async (name, value) => {
    await setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  const getSignInUrl = async () => {
    try {
      setLoading(true);

      const data = await signInAPI();

      if (data?.data?.data?.authUrl) {
        window.location.href = data.data.data.authUrl;
      } else {
        handleClick("Unexpected response format from signInAPI", "error");
      }
    } catch (error) {
      console.log(error)
      handleClick(error?.response?.data?.message || error?.message || "Error fetching sign-in URL", "error");
    } finally {
      setLoading(false);
    }
  };

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("code")) {
      AuthenticateUser(searchParams.get("code"));
    }
  }, []);

  const AuthenticateUser = async (code) => {
    try {
      setLoading(true);

      const res = await signInAuthenticationAPI({ code: code });
      const { email, id, name, token, userDetails } = res?.data?.data;

      if (token) {
        login(userDetails, token)
        router.push("/");
        return
      }

      setLoading(false);
      openSnackbar("Authentication successful", "success");

      setForm((prev) => ({
        ...prev,
        email: email,
        googleId: id,
        firstName: name?.split(" ")?.[0] || "",
        lastName: name?.split(" ")?.[name?.split(" ")?.length - 1] || "",
      }));

      nextStep();
    } catch (error) {
      handleClick(error?.response?.data?.message || error?.message || "Error fetching sign-in URL", "error");
    }
    finally {
      setLoading(false);
    }
  };

  const sendOtpFun = async (isResend) => {
    try {
      setResendLoading(true);
      let payload = {
        phoneNumber: form.phone,
        countryCode: form.countryCode,
      };
      const res = await sendOtpAPI(payload);
      if (res.status === 200) {
        if (!isResend) nextStep();
      }
    }
    catch (error) {
      handleClick(error?.response?.data?.message || error?.message || "Error fetching sign-in URL", "error");
    }
    finally {
      setResendLoading(false);
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
        nextStep();
      }
    } catch (error) {
      handleClick(error?.response?.data?.message || error?.message || "Error fetching sign-in URL", "error");
    } finally {
      setLoading(false);
    }
  };

  const checkIfBroker = () => {
    if (form.role === "broker") {
      setShowConsultantDetailsPopup(true)
      return
    }
    createUserFun()
  }

  const createUserFun = async () => {
    try {
      setLoading(true)
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
        reraNo: form.reraNo
      };
      const res = await createUserAPI(payload);
      if (res.status === 200) {
        const { token, userDetails } = res?.data?.data;
        login(userDetails, token)
        router.push("/");
      }
    } catch (error) {
      handleClick(error?.response?.data?.message || error?.message || "Error fetching sign-in URL", "error");
    } finally {
      setLoading(false)
      setShowConsultantDetailsPopup(false)
    }
  };

  const getComponentByStep = () => {
    switch (activeStep) {
      case 1: {
        return <GoogleSignIn googleSignInLoading={loading} getSignInUrl={getSignInUrl} />;
      }
      case 2: {
        return <SendOtp form={form} handleChange={handleChange} sendOtpFun={sendOtpFun} />;
      }
      case 3: {
        return <VerifyOtp loading={loading} prevStep={prevStep} resendLoading={resendLoading} sendOtpFun={sendOtpFun} form={form} verifyOtpFun={verifyOtpFun} otpInput={otpInput} setOtpInput={setOtpInput} />;
      }
      case 4: {
        return <Welcome createUserFun={checkIfBroker} handleChange={handleChange} form={form} />;
      }
      default: {
        return null;
      }
    }
  };

  console.log(form)
  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 3 }}>
        <Box>
          {getComponentByStep()}
        </Box>
        <ConsultantDialog loading={loading} form={form} createUserFun={createUserFun} handleChange={handleChange} showConsultantDetailsPopup={showConsultantDetailsPopup} setShowConsultantDetailsPopup={setShowConsultantDetailsPopup} />
      </Card>
    </Container>
  );
}

export default Login;
