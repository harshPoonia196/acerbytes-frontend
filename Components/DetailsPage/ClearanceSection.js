import React from 'react'
import { Grid, Card, Typography, Box, Divider, Rating } from '@mui/material'
import NewKeyValuePairStructure from 'Components/CommonLayouts/NewKeyValuePairStructure'
import { useRouter } from 'next/navigation'
import colors from 'styles/theme/colors'

function ClearanceSection(props) {
    const { refCallback, regulatoryClearanceData } = props;

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
                    <NewKeyValuePairStructure label="RERA approved" value={regulatoryClearanceData?.reraApproved} />
                    <NewKeyValuePairStructure label="RERA" value={regulatoryClearanceData?.reraNumber} />
                    <NewKeyValuePairStructure label="CC" value={regulatoryClearanceData?.cc} />
                    <NewKeyValuePairStructure label="OC" value={regulatoryClearanceData?.oc} />
                    <NewKeyValuePairStructure label="Authority registration" value={regulatoryClearanceData?.authorityRegistration} />
                    <NewKeyValuePairStructure label="Government bank loan" value={regulatoryClearanceData?.governmentLoan} />
                    <NewKeyValuePairStructure label="Private bank loan" value={regulatoryClearanceData?.privateBankLoan} />
                    <NewKeyValuePairStructure label="Resale" value={regulatoryClearanceData?.resale} />
                </Grid>
            </Card>
        </Grid>
    )
}

export default ClearanceSection