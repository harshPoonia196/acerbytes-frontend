import { Button, Grid, Typography } from '@mui/material';
import InputField from 'Components/CommonLayouts/InputField';
import NewPhoneInputField from 'Components/CommonLayouts/NewPhoneInputField';
import React from 'react'

const SendOtp = ({form, handleChange, sendOtpFun}) => {
    return (
        <Grid container>
            <Grid item xs={12} sx={{ mb: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Create your <span style={{ color: "gray" }}>account</span>
                </Typography>
                <Typography variant="body1">
                    Connect with professional property consultants only
                </Typography>
            </Grid>
            <InputField value={form.firstName} handleChange={(e)=> handleChange("firstName", e.target.value)} label="First name" halfSm />
            <InputField value={form.lastName} handleChange={(e)=> handleChange("lastName", e.target.value)} label="Last name" halfSm />
            <NewPhoneInputField handleSelectChange={(e)=> handleChange("countryCode", e.target.value)} handleChange={(e)=> handleChange("phone", (e.target.value))}   label="Phone number" />
            <Grid item xs={12} sx={{ textAlign: "end" }}>
                <Button
                    sx={{ mt: 1 }}
                    variant="contained"
                    onClick={() => sendOtpFun()}
                >
                    Confirm
                </Button>
            </Grid>
        </Grid>
    )
}

export default SendOtp