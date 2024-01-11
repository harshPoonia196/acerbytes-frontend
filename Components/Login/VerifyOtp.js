import { Box, Button, Grid, Typography } from '@mui/material';
import OTPInputLayout from 'Components/CommonLayouts/OTPInputLayout';
import React from 'react'

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import colors from "styles/theme/colors";

const VerifyOtp = ({setOtpInput, otpInput, verifyOtpFun}) => {
    return (
        <Grid container>
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
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    onClick={()=> verifyOtpFun()}
                >
                    Verify
                </Button>
            </Grid>
        </Grid>
    )
}

export default VerifyOtp