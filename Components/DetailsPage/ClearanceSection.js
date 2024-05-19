import React from 'react'
import { Grid, Card, Typography, Box, Divider, Rating } from '@mui/material'
import NewKeyValuePairStructure from 'Components/CommonLayouts/NewKeyValuePairStructure'
import { useRouter } from 'next/navigation'
import colors from 'styles/theme/colors'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

function ClearanceSection(props) {
    const { refCallback, regulatoryClearanceData } = props;

    const router = useRouter()

    const getTextToDisplay = (type) => {
        switch (type) {
            case 'Yes':
                return <Box sx={{ display: 'flex', width: 'fit-content', ml: 'auto' }}>
                    <CheckBoxIcon fontSize='small' /><p style={{ alignSelf: 'left' }}>{type}</p>
                </Box>
            case "Don't know":
                return <Box sx={{ display: 'flex', width: 'fit-content', ml: 'auto' }}>
                    <QuestionMarkIcon fontSize='1.25rem' /><p style={{ alignSelf: 'center' }}>{type}</p>
                </Box>
            default:
                return <Box sx={{ display: 'flex', width: 'fit-content', ml: 'auto' }}>
                    <p style={{ alignSelf: 'center' }}>{type}</p>
                </Box>
        }
    }

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
                                {regulatoryClearanceData?.sectionScore ? regulatoryClearanceData?.sectionScore.toFixed() : "00"}
                            </Typography>
                        </Card>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={1} sx={{ p: 2 }}>
                    <NewKeyValuePairStructure label="RERA approved"
                        value={getTextToDisplay(regulatoryClearanceData?.reraApproved)}
                    />
                    <NewKeyValuePairStructure label="RERA" value={getTextToDisplay(regulatoryClearanceData?.reraNumber)}
                    />
                    <NewKeyValuePairStructure label="CC" value={getTextToDisplay(regulatoryClearanceData?.cc)} />
                    <NewKeyValuePairStructure label="OC" value={getTextToDisplay(regulatoryClearanceData?.oc)} />
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