import { Box, Card, CardActionArea, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { useRouter } from "next/navigation";
import { listOfPages } from 'Components/NavBar/Links';

function MoreSimilarPropertyCard({ propertyData }) {
    const router = useRouter();
    const { data: Alldata, location: locationData, overview: overviewData } = propertyData;

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
                    <Grid container spacing={2} sx={{ justifyContent: "center"}}>
                        <Grid item sm={4} xs={6}>
                            <Card sx={{ height: '100%' }} onClick={() => {
                                router.push(listOfPages.commonPropertyList + `/${overviewData?.builder}`)
                            }}>
                                <CardActionArea sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h2'>{Alldata?.builderPropertyCount}</Typography>
                                    <Typography variant='h4'>
                                        by {overviewData?.builder}
                                    </Typography>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item sm={4} xs={6}>
                            <Card sx={{ height: '100%' }} onClick={() => {
                                router.push(listOfPages.commonPropertyList + `/${locationData?.city}`)
                            }}>
                                <CardActionArea sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h2'>{Alldata?.cityPropertyCount}</Typography>
                                    <Typography variant='h4'>
                                        in {locationData?.city}
                                    </Typography>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item sm={4} xs={6}>
                            <Card  sx={{ height: '100%' }} onClick={() => {
                                router.push(listOfPages.commonPropertyList + `/${locationData?.area}`)
                            }}>
                                <CardActionArea sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }}>
                                    <Typography variant='h2'>{Alldata?.sectorPropertyCount}</Typography>
                                    <Typography variant='h4'>
                                        in {locationData?.area}
                                    </Typography>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        {/* <Grid item xs={4}>
                            <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }}>
                                <Typography variant='h2'>4</Typography>
                                <Typography variant='h6'>
                                    Residental studios
                                </Typography>
                            </Card>
                        </Grid> */}
                    </Grid>
                </Box>
            </Card>
        </Grid>
    )
}

export default MoreSimilarPropertyCard