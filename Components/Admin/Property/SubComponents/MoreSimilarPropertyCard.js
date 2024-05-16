import { Box, Card, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { useRouter } from "next/navigation";
import { listOfPages } from 'Components/NavBar/Links';

function MoreSimilarPropertyCard({propertyData}) {
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
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={() => {
                                    router.push(listOfPages.commonPropertyList + `/${overviewData?.builder}`)}}>
                                <Typography variant='h2'>{Alldata?.builderPropertyCount}</Typography>
                                <Typography variant='h6'>
                                    More by {overviewData?.builder}
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={() => {
                                    router.push(listOfPages.commonPropertyList + `/${locationData?.city}`)}}>
                                <Typography variant='h2'>{Alldata?.cityPropertyCount}</Typography>
                                <Typography variant='h6'>
                                    More in {locationData?.city}
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }} onClick={() => {
                                    router.push(listOfPages.commonPropertyList + `/${locationData?.area}`)}}>
                                <Typography variant='h2'>{Alldata?.sectorPropertyCount}</Typography>
                                <Typography variant='h6'>
                                    More in {locationData?.area}
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