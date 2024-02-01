import React from 'react'
import { Grid, Card, Typography, Box, Divider } from '@mui/material'
import NewKeyValuePairStructure from 'Components/CommonLayouts/NewKeyValuePairStructure'
import { useRouter } from 'next/navigation'
import colors from 'styles/theme/colors'

function LandscapeSection(props) {
    const  {layoutData} = props

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
                                99
                            </Typography>
                        </Card>
                    </Box>
                </Box>
                <Divider />

                <Grid container spacing={1} sx={{ p: 2 }}>
                    <NewKeyValuePairStructure label="Towers" value={layoutData?.numberOfBuildings} />
                    <NewKeyValuePairStructure label="Property type" value={layoutData?.layoutType.join(", ")} />
                    <NewKeyValuePairStructure label="Units (Total)" value={layoutData?.totalUnits} />
                    <NewKeyValuePairStructure label="Floor types" value={layoutData?.layoutType.join(", ")} />
                    <NewKeyValuePairStructure label="Floors (Max-Min)" value={`${layoutData?.maxFloors } - ${layoutData?.minFloors}`} />
                    <NewKeyValuePairStructure label="Area" value={layoutData?.area} />
                    <NewKeyValuePairStructure label="Open area" value={layoutData?.area} />
                    <NewKeyValuePairStructure label="Green area" value={layoutData?.greenArea} />
                    <NewKeyValuePairStructure label="Unit density" value={layoutData?.unitDensity} />
                    <NewKeyValuePairStructure label="Green density" value={layoutData?.greenDensity} />
                    <NewKeyValuePairStructure label="Construction quality" value={layoutData?.constructionQuality} />
                    <NewKeyValuePairStructure label="Interior quality" value={layoutData?.interiorQuality} />
                </Grid>
            </Card>
        </Grid>
    )
}

export default LandscapeSection