import React from 'react'
import { Grid, Card, Typography, Box, Divider } from '@mui/material'
import NewKeyValuePairStructure from 'Components/CommonLayouts/NewKeyValuePairStructure'
import colors from 'styles/theme/colors'
import { useRouter } from 'next/navigation'

function LocationSection(props) {
    const {locationData, refCallback} = props
    const assessment = locationData?.assessment
    const router = useRouter()

    return (
        <Grid item xs={12} ref={refCallback} id='location' >
            <Card>
                <Box sx={{ p: 2, display: 'flex' }}>
                    <Typography variant='h4' sx={{ flex: 1, alignSelf: 'center' }}>
                        Location
                    </Typography>
                    <Box sx={{ alignSelf: "center" }}>
                        <Card
                            sx={{
                                width: "fit-content",
                                backgroundColor: colors?.BLACK,
                                borderRadius: "4px !important",
                                m: 0,
                                ml: "auto !important",
                            }}
                            onClick={() => router.push("/research")}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    width: "fit-content",
                                    color: "white",
                                    p: 0.5,
                                    px: 1,
                                    cursor: 'pointer'
                                }}
                            >
                                99
                            </Typography>
                        </Card>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <Grid container spacing={1}>
                        {assessment?.School?.isApplicable && <NewKeyValuePairStructure label="School" value={assessment?.School?.rating} middleValue={'Low'} />}
                        <NewKeyValuePairStructure label="App based rides" value="value" middleValue={'Med'} />
                        {assessment?.Hospital?.isApplicable &&<NewKeyValuePairStructure label="Hospital" value={assessment?.Hospital?.rating} />}
                        <NewKeyValuePairStructure label="Railway stop" value="value" />
                        <NewKeyValuePairStructure label="Metro" value="value" />
                        <NewKeyValuePairStructure label="Bus stand" value="value" />
                        <NewKeyValuePairStructure label="Food delivery" value="value" />
                    </Grid>
                </Box>
            </Card>
        </Grid>
    )
}

export default LocationSection