import { Card, Checkbox, Container, Divider, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material'
import CustomButton from 'Components/CommonLayouts/Loading/LoadingButton'
import React from 'react'

const Step1 = ({getSignInUrl,loading}) => {
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
                                    Step 1 : Connect with your valid Gmail
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <CustomButton loading={loading} onClick={getSignInUrl} variant="contained" fullWidth ButtonText={'Sign in with Google'} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    )
}

export default Step1