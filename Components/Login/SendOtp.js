import { Button, Grid, Typography } from '@mui/material';
import InputField from 'Components/CommonLayouts/InputField';
import NewPhoneInputField from 'Components/CommonLayouts/NewPhoneInputField';
import React, { useEffect } from 'react'

const SendOtp = ({ form, handleChange, sendOtpFun }) => {
    const [errors, setErrors] = React.useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!form.firstName) {
            newErrors.firstName = 'First name is required.';
        }

        if (!form.lastName) {
            newErrors.lastName = 'Last name is required.';
        }

        if (!form.phone) {
            newErrors.phone = 'Phone number is required.';
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(()=> {
        validateForm()
    }, [form])

    return (
        <Grid container sx={{ p: 2 }} spacing={2}>
            <Grid item xs={12} sx={{ mb: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Create your <span style={{ color: "gray" }}>account</span>
                </Typography>
                <Typography variant="body1">
                    Connect with professional property consultants only
                </Typography>
            </Grid>
            <InputField
                value={form.firstName}
                handleChange={(e) => handleChange('firstName', e.target.value)}
                label="First name"
                halfSm
                error={errors.firstName}
            />
            <InputField
                value={form.lastName}
                handleChange={(e) => handleChange('lastName', e.target.value)}
                label="Last name"
                halfSm
                error={errors.lastName}
            />
            <NewPhoneInputField
                handleSelectChange={(e) => handleChange('countryCode', e.target.value)}
                handleChange={(e) => handleChange('phone', e.target.value)}
                label="Phone number"
                error={errors.phone}
            />
            <Grid item xs={12} sx={{ textAlign: 'end' }}>
                <Button
                    sx={{ mt: 1 }}
                    variant="contained"
                    onClick={() => {
                        if (validateForm()) {
                            sendOtpFun();
                        }
                    }}
                >
                    Confirm
                </Button>
            </Grid>
        </Grid>
    )
}

export default SendOtp