import React from 'react'
import { Box, Card, Container, Divider, Grid, Typography } from '@mui/material'

const Step3 = () => {
    return (
        <Container maxWidth="evmd">
            <Card sx={{ p: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Thanks</Typography>
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
                                    Details submitted successfully
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        backgroundColor: "whitesmoke",
                                        p: 2,
                                        borderRadius: "4px",
                                    }}
                                >
                                    <Typography variant="body2">
                                        Thanks for your interest to join us as Real estate
                                        consultant for our clients. We are reviewing your details
                                        to get in touch with you shortly.
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    )
}

export default Step3