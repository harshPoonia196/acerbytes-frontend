import React from 'react'
import { Grid, Card, Typography, Box, Divider } from '@mui/material'
import NewKeyValuePairStructure from 'Components/CommonLayouts/NewKeyValuePairStructure'
import { useRouter } from 'next/navigation'
import colors from 'styles/theme/colors'

function LandscapeSection({ refCallback }) {

    const router = useRouter()

    return (
        <Grid item xs={12} ref={refCallback} id='landscape'>
            <Card>
                <Box sx={{ p: 2, display: 'flex' }}>
                    <Typography variant='h4' sx={{ flex: 1, alignSelf: 'center' }}>
                        Landscape
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
                    <NewKeyValuePairStructure label="Units" value="5" />
                    <NewKeyValuePairStructure label="Area" value="5 acres" />
                    <NewKeyValuePairStructure label="Open area" value="1 acres" />
                    <NewKeyValuePairStructure label="Green area" value="0.5 acres" />
                    <NewKeyValuePairStructure label="Density" value="Low" />
                </Grid>
            </Card>
        </Grid>
    )
}

export default LandscapeSection