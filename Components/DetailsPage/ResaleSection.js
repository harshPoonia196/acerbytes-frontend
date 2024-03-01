import React from 'react'
import { Grid, Card, Typography, Box, Divider, Chip, Button } from '@mui/material'
import NewKeyValuePairStructure from 'Components/CommonLayouts/NewKeyValuePairStructure'
import { useRouter } from 'next/navigation'
import colors from 'styles/theme/colors'
import AddIcon from '@mui/icons-material/Add'
import CustomButton from 'Components/CommonLayouts/Loading/LoadingButton'

function ResaleSection({ refCallback }) {

    const router = useRouter()

    return (
        <Grid item xs={12} ref={refCallback} id='resale' >
            <Card>
                <Box sx={{ p: 2, display: 'flex' }}>
                    <Typography variant='h4' sx={{ flex: 1, alignSelf: 'center' }}>
                        44 Units for resale
                    </Typography>
                    <Box sx={{ alignSelf: "center" }}>
                        <CustomButton ButtonText={"Sell your property"} />
                    </Box>
                </Box>
                <Divider />
                <Grid container sx={{ p: 2 }}>
                    <NewKeyValuePairStructure label={<Chip
                        label="2.5 BHK · 1582 sqft · 2 units"
                        onClick={() => { }}
                    />} value="1.5 Cr · 2 Cr" />

                </Grid>
            </Card>
        </Grid>
    )
}

export default ResaleSection