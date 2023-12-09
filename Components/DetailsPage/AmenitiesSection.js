import React from 'react'
import { Grid, Card, Typography, Box, Divider, Rating } from '@mui/material'
import NewKeyValuePairStructure from 'Components/CommonLayouts/NewKeyValuePairStructure'
import { useRouter } from 'next/navigation'
import colors from 'styles/theme/colors'

function AmenitiesSection({ refCallback }) {

    const router = useRouter()

    return (
        <Grid item xs={12} ref={refCallback} id='location' >
            <Card>
                <Box sx={{ p: 2, display: 'flex' }}>
                    <Typography variant='h4' sx={{ flex: 1, alignSelf: 'center' }}>
                        Amenities
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
                <Grid container spacing={1} sx={{ p: 2 }}>
                    <NewKeyValuePairStructure label="Gym"
                        value={<Rating name="half-rating" defaultValue={2.5} precision={0.5}
                            size='small' sx={{ alignSelf: 'center' }} />} middleValue={'Basic'} />
                    <NewKeyValuePairStructure label="Pool"
                        value={<Rating name="half-rating" defaultValue={2.5} precision={0.5}
                            size='small' sx={{ alignSelf: 'center' }} />} middleValue={'Basic'} />
                    <NewKeyValuePairStructure label="Yoga"
                        value={<Rating name="half-rating" defaultValue={2.5} precision={0.5}
                            size='small' sx={{ alignSelf: 'center' }} />} middleValue={'Expected'} />
                    <NewKeyValuePairStructure label="Party hall"
                        value={<Rating name="half-rating" defaultValue={2.5} precision={0.5}
                            size='small' sx={{ alignSelf: 'center' }} />} middleValue={'Unique'} />
                    <NewKeyValuePairStructure label="Theatre"
                        value={<Rating name="half-rating" defaultValue={2.5} precision={0.5}
                            size='small' sx={{ alignSelf: 'center' }} />} middleValue={'Unique'} />
                </Grid>
            </Card>
        </Grid>
    )
}

export default AmenitiesSection