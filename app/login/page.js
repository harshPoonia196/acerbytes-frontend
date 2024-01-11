"use client";

import {
  Container,
  Card,
  Grid,
  Button,
  ToggleButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import NewToggleButtonStructure from "Components/CommonLayouts/NewToggleButtonStructure";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import { createUserAPI, sendOtpAPI, signInAPI, signInAuthenticationAPI, verifyOtpAPI } from "api/Auth.api";
import SendOtp from "Components/Login/SendOtp";
import Welcome from "Components/Login/Welcome";
import VerifyOtp from "Components/Login/VerifyOtp";
import GoogleSignIn from "Components/Login/GoogleSignIn";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();

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

  const [activeStep, setActiveStep] = useState(1)
  const [otpInput, setOtpInput] = useState("")


  const [form, setForm] = useState({
    countryCode: '+91',
    phone: "",
    firstName: '',
    lastName: '',
    googleId: '',
    role: '',
    businessType: '',
    reraNo: '',
    company: ''
  })

  console.log(form)

  const handleChange = (name, value) => {
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const nextStep = () => {
    setActiveStep(prev => prev + 1)
  }

  const getSignInUrl = async () => {
    const data = await signInAPI()
    window.location.href = data?.data?.data?.authUrl
  }

  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('code')) {
      AuthenticateUser(searchParams.get('code'))
    }
  }, [])

  const AuthenticateUser = async (code) => {
    const res = await signInAuthenticationAPI({ code: code })
    const { email, id } = res?.data?.data
    setForm(prev => ({
      ...prev,
      email: email,
      googleId: id
    }))
    nextStep()
  }

  const sendOtpFun = async () => {
    try {
      let payload = {
        phoneNumber: form.phone,
        countryCode: form.countryCode
      }
      const res = await sendOtpAPI(payload)
      if (res.status === 200) {
        nextStep()
      }
    } catch (error) {

    }
  }

  const verifyOtpFun = async () => {
    try {
      let payload = {
        phoneNumber: form.phone,
        countryCode: form.countryCode,
        otp: otpInput
      }
      const res = await verifyOtpAPI(payload)
      if (res.status === 200) {
        nextStep()
      }
    } catch (error) {

    }
  }

  const createUserFun = async () => {
    console.log("yes")
    try {
      let payload = {
        name: { 
          firstName: form.firstName,
          lastName: form.lastName
        },
        phone: { 
          countryCode: form.countryCode,
          number: form.phone
        },
        email: form.email,
        role: form.role,
        googleId: form.googleId
      }
      const res = await createUserAPI(payload)
      if (res.status === 200) {
        const {token, userDetails} = res?.data?.data
        localStorage.setItem("token", token)
        localStorage.setItem("userDetails", JSON.stringify(userDetails))

        router.push('/');      
      }
    } catch (error) {
      console.log(error)
    }
  }


  const getComponentByStep = () => {
    switch (activeStep) {
      case 1: {
        return <GoogleSignIn getSignInUrl={getSignInUrl} />
      }
      case 2: {
        return <SendOtp form={form} handleChange={handleChange} sendOtpFun={sendOtpFun} />
      }
      case 3: {
        return <VerifyOtp verifyOtpFun={verifyOtpFun} otpInput={otpInput} setOtpInput={setOtpInput} />
      }
      case 4: {
        return <Welcome createUserFun={createUserFun} handleChange={handleChange} form={form} />
      }
    }
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ p: 3 }}>
        <Grid container spacing={2}>
          {getComponentByStep()}
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
