import { Button, Grid, ToggleButton, Typography } from '@mui/material';
import CustomButton from 'Components/CommonLayouts/Loading/LoadingButton';
import NewToggleButtonStructure from 'Components/CommonLayouts/NewToggleButtonStructure';
import { companyName, listOfPages } from 'Components/NavBar/Links';
import React from 'react'
import colors from "styles/theme/colors";

const Welcome = ({ form, handleChange, createUserFun }) => {
    return (
        <Grid container sx={{ p: 2 }} spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Hi {form.firstName} {form.lastName},{" "}
                    <span style={{ color: "gray" }}>Welcome to {companyName}!</span>
                </Typography>
                <Typography variant="body1">
                    You account has been successfully created
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <NewToggleButtonStructure
                    isEdit={true}
                    label={"Select your role"}
                    value={form.role}
                    handleChange={(e) => handleChange("role", e.target.value)}
                    toggleStyle={{
                        diplay: "flex",
                        flexDirection: "column",
                        mt: 1,
                    }}
                >
                    <ToggleButton
                        fullWidth
                        size="small"
                        value="broker"
                        sx={{
                            border: `1px solid ${colors.LIGHT_GRAY} !important`,
                            borderBottom: 'none !important',
                            borderRadius: "0 !important",
                        }}
                    // onClick={() => setShowConsultantDetailsPopup(true)}
                    >
                        I am a Real estate consultant
                    </ToggleButton>
                    <ToggleButton
                        fullWidth
                        size="small"
                        value="user"
                        sx={{
                            border: `1px solid ${colors.LIGHT_GRAY} !important`,
                            borderBottom: 'none !important',
                            borderRadius: "0 !important",
                            ml: "0 !important",
                        }}
                    >
                        I am here to explore / buy a property
                    </ToggleButton>
                    <ToggleButton
                        fullWidth
                        size="small"
                        value="admin"
                        sx={{
                            border: `1px solid ${colors.LIGHT_GRAY} !important`,
                            borderRadius: "0 !important",
                            ml: "0 !important",
                        }}
                    >
                        I am from {companyName} Team
                    </ToggleButton>
                </NewToggleButtonStructure>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "end" }}>
                <CustomButton
                    variant="contained"
                    disabled={!form.role}
                    onClick={() => createUserFun()}
                    ButtonText={"Confirm"}
                />
            </Grid>
        </Grid>
    )
}

export default Welcome