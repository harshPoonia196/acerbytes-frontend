import React from 'react'
import { Grid, Card, Typography, Box, Divider } from '@mui/material'
import NewKeyValuePairStructure from 'Components/CommonLayouts/NewKeyValuePairStructure'
import { useRouter } from 'next/navigation'
import colors from 'styles/theme/colors'

function LandscapeSection() {

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
                    <NewKeyValuePairStructure label="Towers" value="5" />
                    <NewKeyValuePairStructure label="Property type" value="Flat" />
                    <NewKeyValuePairStructure label="Units(Total)" value="10" />
                    <NewKeyValuePairStructure label="Floor types" value="3BHK" />
                    <NewKeyValuePairStructure label="Floors (Max-Min)" value="34" />
                    <NewKeyValuePairStructure label="Area" value="5 acres" />
                    <NewKeyValuePairStructure label="Open area" value="4 acres" />
                    <NewKeyValuePairStructure label="Green area" value="0.5 acres" />
                    <NewKeyValuePairStructure label="Unit density" value="5" />
                    <NewKeyValuePairStructure label="Green density" value="10" />
                    <NewKeyValuePairStructure label="Construction quality" value="10" />
                    <NewKeyValuePairStructure label="Interior quality" value="10" />
                </Grid>
            </Card>
        </Grid>
    )
}

export default LandscapeSection