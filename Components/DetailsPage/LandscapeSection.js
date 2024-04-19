import React from 'react'
import { Grid, Card, Typography, Box, Divider } from '@mui/material'
import NewKeyValuePairStructure from 'Components/CommonLayouts/NewKeyValuePairStructure'
import { useRouter } from 'next/navigation'
import colors from 'styles/theme/colors'

function LandscapeSection(props) {
    const  {layoutData, overviewData} = props

    const router = useRouter()

    return (
        <Grid item xs={12} id='layout'>
            <Card>
                <Box sx={{ p: 2, display: 'flex' }}>
                    <Typography variant='h4' sx={{ flex: 1, alignSelf: 'center' }}>
                        Layout
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
                                {layoutData?.sectionScore ? layoutData?.sectionScore.toFixed()  : "00"}
                            </Typography>
                        </Card>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={1} sx={{ p: 2 }}>
                    <NewKeyValuePairStructure label="Towers" value={layoutData?.numberOfBuildings} />
                    <NewKeyValuePairStructure label="Property type" value={overviewData?.projectType?.map(item => item.value).join(", ")} />
                    <NewKeyValuePairStructure label="Units (Total)" value={layoutData?.totalUnits} />
                    {/* <NewKeyValuePairStructure label="Floor types" value={layoutData?.layoutType?.map(item => item.value).join(", ")} /> */}
                    <NewKeyValuePairStructure label="Floors (Min-Max)" value={`${layoutData?.minFloors } - ${layoutData?.maxFloors}`} />
                    <NewKeyValuePairStructure label="Area" value={layoutData?.area && `${parseFloat(layoutData?.area).toFixed()} ${layoutData?.areaUnit || ''}`} />
                    {/* <NewKeyValuePairStructure label="Open area" value={layoutData?.area && parseFloat(layoutData?.area).toFixed(2)} /> */}
                    <NewKeyValuePairStructure label="Green area" value={layoutData?.greenArea && `${parseFloat(layoutData?.greenArea).toFixed()} ${layoutData?.areaUnit || ''}`} />
                    <NewKeyValuePairStructure label="Unit density (Unit/Area)" value={layoutData?.unitDensity} isRating={true} isRatingReadOnly />
                    <NewKeyValuePairStructure label="Green density" value={layoutData?.greenDensity} isRating={true} isRatingReadOnly />
                    <NewKeyValuePairStructure label="Construction quality" value={layoutData?.constructionQuality} isRating={true} isRatingReadOnly/>
                    <NewKeyValuePairStructure label="Interior quality" value={layoutData?.interiorQuality} isRating={true} isRatingReadOnly />
                </Grid>
            </Card>
        </Grid>
    )
}

export default LandscapeSection