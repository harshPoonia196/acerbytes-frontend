import { Box, Card, Divider, Grid, Typography } from '@mui/material'
import React from 'react'

function MoreSimilarPropertyCard() {
    return (
        <Grid item xs={12}>
            <Card>
                <Box sx={{ p: 2, display: "flex" }}>
                    <Typography variant="h4" sx={{ flex: 1, alignSelf: "center" }}>
                        Similar properties
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }}>
                                <Typography variant='h2'>6</Typography>
                                <Typography variant='h6'>
                                    More by Supertech
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }}>
                                <Typography variant='h2'>4</Typography>
                                <Typography variant='h6'>
                                    More in Noida
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }}>
                                <Typography variant='h2'>4</Typography>
                                <Typography variant='h6'>
                                    More in Noida sector 15
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }}>
                                <Typography variant='h2'>4</Typography>
                                <Typography variant='h6'>
                                    Residental studios
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </Grid>
    )
}

export default MoreSimilarPropertyCard