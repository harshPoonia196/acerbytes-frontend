import { LoadingButton } from '@mui/lab';
import { Box, Card, Checkbox, Container, Divider, FormControlLabel, FormGroup, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import InputField from 'Components/CommonLayouts/InputField';
import CustomButton from 'Components/CommonLayouts/Loading/LoadingButton';
import NewPhoneInputField from 'Components/CommonLayouts/NewPhoneInputField';
import OTPInputLayout from 'Components/CommonLayouts/OTPInputLayout';
import PhoneInputField from 'Components/CommonLayouts/PhoneInputField';
import SelectTextFields from 'Components/CommonLayouts/SelectTextFields';
import React, { useEffect, useState } from 'react'

const Step2 = ({ form, handleChange, handleSignUp, showOtp, setOtpInput, otpInput, resendLoading }) => {


    const [resendDisabled, setResendDisabled] = useState(true);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        let interval;
        if (resendDisabled) {
            interval = setInterval(() => {
                setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendDisabled]);

    const handleResendClick = () => {
        if (!resendDisabled) {
            setResendDisabled(true);
            setTimer(60);
            handleSignUp(true);
            setOtpInput("");
        }
    };

    useEffect(() => {
        if (timer === 0) {
            setResendDisabled(false)
        }
    }, [timer])

    const [errors, setErrors] = React.useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!form.firstName) {
            newErrors.firstName = true;
        }

        if (!form.lastName) {
            newErrors.lastName = true;
        }

        if (!form.phone) {
            newErrors.phone = true;
        }
        if (form.phone.length !== 10) {
            newErrors.phone = true;
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleClick = ()=> {
        console.log("check")
        if(validateForm()){
            handleSignUp(false)
        }
    }

    return (
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
                                    Step 2 : Enter your details
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={form.businessType}
                                    exclusive
                                    onChange={(e) => handleChange("businessType", e.target.value)}
                                    aria-label="Platform"
                                    size="small"
                                    fullWidth
                                >
                                    <ToggleButton value="INDIVIDUAL">Individual</ToggleButton>
                                    <ToggleButton value="COMPANY">Company</ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            <InputField
                                onChange={(e) => handleChange("firstName", e.target.value)}
                                value={form.firstName}
                                error={errors.firstName}
                                label="First name" variant="outlined" halfSm />
                            <InputField
                                onChange={(e) => handleChange("lastName", e.target.value)}
                                value={form.lastName}
                                error={errors.lastName}
                                label="Last name" variant="outlined" halfSm />
                            {form.businessType === "COMPANY" && (
                                <InputField
                                    onChange={(e) => handleChange("company", e.target.value)}
                                    value={form.company}
                                    label="Company name" variant="outlined" halfSm />
                            )}
                            {form.businessType === 'COMPANY' && (
                                <Grid item xs={6}>
                                    <SelectTextFields
                                        handleChange={(e) => handleChange("companyType", e.target.value)}
                                        value={form.companyType}
                                        label="Company type" list={[
                                            {
                                                label: "PVT",
                                                value: "PVT",
                                            }
                                        ]} />
                                </Grid>
                            )}
                            <InputField
                                onChange={(e) => handleChange("reraNo", e.target.value)}
                                value={form.reraNo}
                                label="RERA number" variant="outlined" />
                            <InputField
                                value={form.email}
                                disabled
                                label="Email" variant="outlined" />
                            {/* #ptwon# add a verify button */}
                            <NewPhoneInputField
                                handleSelectChange={(e) => handleChange('countryCode', e.target.value)}
                                handleChange={(e) => handleChange('phone', e.target.value)}
                                value={form.phone}
                                error={errors.phone}
                                optionValue={form.countryCode}
                                label="Phone number"
                                variant="outlined" />

                            {
                                showOtp ?
                                    <>
                                        <Grid item xs={12} sx={{ display: "flex", mb: 0 }}>
                                            <Typography>Enter OTP</Typography>
                                        </Grid>
                                        <Grid item xs={12} sx={{ display: "flex" }}>
                                            <Box sx={{ flex: 1 }}>
                                                <OTPInputLayout
                                                    otpInput={otpInput}
                                                    setOtpInput={setOtpInput}
                                                />
                                            </Box>
                                            <Box sx={{ alignSelf: "center" }}>
                                                <LoadingButton loading={resendLoading} disabled={resendDisabled} onClick={handleResendClick}>
                                                    Resend OTP {resendDisabled ? `(${timer}s)` : ''}
                                                </LoadingButton>
                                            </Box>
                                        </Grid>
                                    </>
                                    : null
                            }

                            <Grid item xs={12}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={form.termsAndConditions}
                                            onChange={(e) => handleChange("termsAndConditions", e.target.checked)}
                                            size="small" />}
                                        label="I agree with terms and condition"
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <CustomButton onClick={() => handleClick()} disabled={!form.termsAndConditions} variant="contained" ButtonText={"Sign up"} fullWidth />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    )
}

export default Step2