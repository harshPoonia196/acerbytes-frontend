import React from 'react'
import { Grid, Card, Typography } from '@mui/material'
import NewKeyValuePairStructure from 'Components/CommonLayouts/NewKeyValuePairStructure'

function FloorPlanSection() {
    return (
        <Grid item xs={12}>
            <Card sx={{ p: 2 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant='h4'>
                            Floor plans
                        </Typography>
                    </Grid>
                    <NewKeyValuePairStructure label="Unit type" value="value" />
                    <NewKeyValuePairStructure label="Super area" value="value" />
                    <NewKeyValuePairStructure label="Carpet area" value="value" />
                    <NewKeyValuePairStructure label="Name#" value="value" />
                </Grid>
            </Card>
        </Grid>
    )
}

export default FloorPlanSection