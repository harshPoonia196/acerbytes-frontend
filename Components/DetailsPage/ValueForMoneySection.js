import React from 'react'
import { Grid, Card, Typography, Box, Divider, Rating } from '@mui/material'
import NewKeyValuePairStructure from 'Components/CommonLayouts/NewKeyValuePairStructure'
import { useRouter } from 'next/navigation'
import colors from 'styles/theme/colors'

function ValueForMoneySection(props) {
    const  {refCallback, valueForMoneyData} = props
    const router = useRouter()

    return (
        <Grid item xs={12} id='value' ref={refCallback}  >
            <Card>
                <Box sx={{ p: 2, display: 'flex' }}>
                    <Typography variant='h4' sx={{ flex: 1, alignSelf: 'center' }}>
                        Value for money
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
                            {valueForMoneyData?.sectionScore ? valueForMoneyData?.sectionScore : "00"}
                            </Typography>
                        </Card>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={1} sx={{ p: 2 }}>
                    <NewKeyValuePairStructure label="Appreciation till now" value={valueForMoneyData?.appTillNow} />
                    <NewKeyValuePairStructure label="Expected further appreciation" value={valueForMoneyData?.expectedFurtherApp} />
                    <NewKeyValuePairStructure label="For end user" value={valueForMoneyData?.forEndUse} />
                </Grid>
            </Card>
        </Grid>
    )
}

export default ValueForMoneySection