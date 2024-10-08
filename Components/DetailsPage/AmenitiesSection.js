import React from 'react'
import { Grid, Card, Typography, Box, Divider, Rating } from '@mui/material'
import NewKeyValuePairStructure from 'Components/CommonLayouts/NewKeyValuePairStructure'
import { useRouter } from 'next/navigation'
import colors from 'styles/theme/colors'

function AmenitiesSection(props) {
    const { refCallback, amenitiesData } = props
    const router = useRouter()
    
    if (!amenitiesData) {
        return null;
    }
    const allAmenities = Object.values(amenitiesData).flatMap(Object.values);
    const hasApplicableAmenity = allAmenities?.some(amenity => amenity.isApplicable);
    if (!hasApplicableAmenity) {
        return null;
    }

    return (
        <Grid item xs={12} ref={refCallback} id='amenities' >
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
                        >
                            {/* <Typography
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
                                {amenitiesData?.sectionScore ? amenitiesData?.sectionScore : "00"}
                            </Typography> */}
                        </Card>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={1} sx={{ p: 2 }}>
                    {Object.entries(amenitiesData ?? {}).map(([category, amenities]) => {
                        return (
                            <React.Fragment key={category}>
                                {Object.entries(amenities ?? {}).map(([amenityName, amenityDetails]) => {
                                    if (amenityDetails?.isApplicable) {
                                        return (
                                            <NewKeyValuePairStructure
                                                key={amenityName}
                                                label={amenityName}
                                                value={amenityDetails?.rating}
                                                middleValue={category}
                                                isRating={amenityDetails?.isApplicable}
                                                isRatingReadOnly
                                            />
                                        );
                                    }
                                    return null;
                                })}
                            </React.Fragment>
                        );
                    })}
                </Grid>
            </Card>
        </Grid>
    )
}

export default AmenitiesSection