import { Box, Card, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { useRouter } from "next/navigation";
import { listOfPages } from 'Components/NavBar/Links';
import Link from 'next/link';

function MoreSimilarPropertyCard({propertyData}) {
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
                            <Link href={{pathname: `${listOfPages.commonPropertyList}/${overviewData?.builder}`}} >
                            <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }}>
                                <Typography variant='h2'>{Alldata?.builderPropertyCount}</Typography>
                                <Typography variant='h6'>
                                    More by {overviewData?.builder}
                                </Typography>
                            </Card>
                            </Link>
                        </Grid>
                        <Grid item xs={4}>
                        <Link href={{pathname: `${listOfPages.commonPropertyList}/${locationData?.city}`, query: { builder: overviewData?.builder}}} >
                            <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }}>
                                <Typography variant='h2'>{Alldata?.cityPropertyCount}</Typography>
                                <Typography variant='h6'>
                                    More in {locationData?.city}
                                </Typography>
                            </Card>
                        </Link>
                        </Grid>
                        <Grid item xs={4}>
                        <Link href={{pathname: `${listOfPages.commonPropertyList}/${locationData?.area}`, query: { builder: overviewData?.builder}}} >
                            <Card sx={{ p: 2, textAlign: 'center', cursor: 'pointer' }}>
                                <Typography variant='h2'>{Alldata?.sectorPropertyCount}</Typography>
                                <Typography variant='h6'>
                                    More in {locationData?.area}
                                </Typography>
                            </Card>
                        </Link>
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