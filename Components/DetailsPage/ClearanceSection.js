import React from 'react'
import { Grid, Card, Typography, Box, Divider, Rating, Tooltip } from '@mui/material'
import NewKeyValuePairStructure from 'Components/CommonLayouts/NewKeyValuePairStructure'
import { useRouter } from 'next/navigation'
import colors from 'styles/theme/colors'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ErrorIcon from '@mui/icons-material/Error';

function ClearanceSection(props) {
    const { refCallback, regulatoryClearanceData } = props;

    const router = useRouter()

    const getTextToDisplay = (type) => {
        switch (type) {
            case 'Yes':
                return <Tooltip title="Yes" sx={{ fontSize: { xs: '0.95rem !important', position: 'relative', top: '2px' } }}>
                        <CheckBoxIcon fontSize='small' sx={{ fontSize: { xs: '0.95rem !important' }, position: 'relative', top: '2px', color: "#696969" }} />
                        </Tooltip>

            case "Don't know":
                return <Tooltip title="No information found" sx={{ fontSize: { xs: '0.95rem !important' } }}><ErrorIcon fontSize='1.25rem' sx={{ color: "#696969", position: 'relative', top: '2px'}}/></Tooltip>
        }
    }

    const checkData = (text)=>{
        if(text === "Don't know"){
            return "-"
        }
        return text
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
                        labelIcon={getTextToDisplay(regulatoryClearanceData?.reraApproved)}
                        value={checkData(regulatoryClearanceData?.reraApproved)}
                    />
                    <NewKeyValuePairStructure label="RERA" value={checkData(regulatoryClearanceData?.reraNumber)}
                    />
                    <NewKeyValuePairStructure label="CC" labelIcon={getTextToDisplay(regulatoryClearanceData?.cc)} value={checkData(regulatoryClearanceData?.cc)} />
                    <NewKeyValuePairStructure label="OC" labelIcon={getTextToDisplay(regulatoryClearanceData?.oc)} value={checkData(regulatoryClearanceData?.oc)} />
                    <NewKeyValuePairStructure label="Authority registration" labelIcon={getTextToDisplay(regulatoryClearanceData?.authorityRegistration)} value={checkData(regulatoryClearanceData?.authorityRegistration)} />
                    <NewKeyValuePairStructure label="Government bank loan" labelIcon={getTextToDisplay(regulatoryClearanceData?.governmentLoan)} value={checkData(regulatoryClearanceData?.governmentLoan)} />
                    <NewKeyValuePairStructure label="Private bank loan" labelIcon={getTextToDisplay(regulatoryClearanceData?.privateBankLoan)} value={checkData(regulatoryClearanceData?.privateBankLoan)} />
                    <NewKeyValuePairStructure label="Resale" labelIcon={getTextToDisplay(regulatoryClearanceData?.resale)} value={checkData(regulatoryClearanceData?.resale)} />
                </Grid>
            </Card>
        </Grid>
    )
}

export default ClearanceSection