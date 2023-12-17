import React from 'react'
import { Grid, Card, Typography, Box, Divider, Rating } from '@mui/material'
import NewKeyValuePairStructure from 'Components/CommonLayouts/NewKeyValuePairStructure'
import { useRouter } from 'next/navigation'
import colors from 'styles/theme/colors'

function ClearanceSection({ refCallback }) {

    const router = useRouter()

    return (
        <Grid item xs={12} ref={refCallback} id='clearance' >
            <Card>
                <Box sx={{ p: 2, display: 'flex' }}>
                    <Typography variant='h4' sx={{ flex: 1, alignSelf: 'center' }}>
                        Regulation & Clearance
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
                    <NewKeyValuePairStructure label="RERA approved" value={'Yes'} />
                    <NewKeyValuePairStructure label="RERA" value={'fdfhdfhdhjhj'} />
                    <NewKeyValuePairStructure label="CC" value={'Yes'} />
                    <NewKeyValuePairStructure label="OC" value={'Yes'} />
                    <NewKeyValuePairStructure label="Authority registration" value={'Yes'} />
                    <NewKeyValuePairStructure label="Government bank loan" value={'Yes'} />
                    <NewKeyValuePairStructure label="Private bank loan" value={'Yes'} />
                    <NewKeyValuePairStructure label="Resale" value={'Yes'} />
                </Grid>
            </Card>
        </Grid>
    )
}

export default ClearanceSection