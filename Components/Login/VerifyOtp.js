import { Box, Button, Grid, Typography } from '@mui/material';
import OTPInputLayout from 'Components/CommonLayouts/OTPInputLayout';
import React, { useEffect, useState } from 'react'

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import colors from "styles/theme/colors";
import { LoadingButton } from '@mui/lab';
import CustomButton from 'Components/CommonLayouts/Loading/LoadingButton';

const VerifyOtp = ({ loading, setOtpInput, form, prevStep, otpInput, verifyOtpFun, sendOtpFun, resendLoading }) => {

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
            sendOtpFun(true);
            setOtpInput("");
        }
    };

    useEffect(() => {
        if (timer === 0) {
            setResendDisabled(false)
        }
    }, [timer])

    return (
        <Grid container sx={{ p: 2 }} spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Mobile verification,
                    <span style={{ color: "gray" }}> enter OTP</span>
                </Typography>
                <Typography variant="body1">
                    to ensure we connect with intended user only
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
                    <LoadingButton loading={resendLoading} disabled={resendDisabled} onClick={handleResendClick}>
                        Resend OTP {resendDisabled ? `(${timer}s)` : ''}
                    </LoadingButton>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Typography
                    variant="body2"
                    sx={{ textTransform: "uppercase", color: colors.DISABLED }}
                >
                    Received at {form?.countryCode} {form?.phone}
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
                <CustomButton
                    startIcon={<ArrowBackIosIcon />}
                    onClick={() => prevStep()}
                    ButtonText={"Back"}
                />
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    disabled={otpInput?.length !== 4}
                    onClick={() => verifyOtpFun()}
                >
                    Verify
                </LoadingButton>
            </Grid>
        </Grid>
    )
}

export default VerifyOtp