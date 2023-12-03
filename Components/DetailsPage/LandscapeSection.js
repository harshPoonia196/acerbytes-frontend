import React from 'react'
import { Grid, Card, Typography } from '@mui/material'
import NewKeyValuePairStructure from 'Components/CommonLayouts/NewKeyValuePairStructure'

function LandscapeSection() {
    return (
        <Grid item xs={12}>
            <Card sx={{ p: 2 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant='h4'>
                            Landscape
                        </Typography>
                    </Grid>
                    <NewKeyValuePairStructure label="Towers" value="value" />
                    <NewKeyValuePairStructure label="Total Units" value="value" />
                    <NewKeyValuePairStructure label="Total area" value="value" />
                    <NewKeyValuePairStructure label="Open area" value="value" />
                    <NewKeyValuePairStructure label="Green area" value="value" />
                    <NewKeyValuePairStructure label="Density" value="value" />
                </Grid>
            </Card>
        </Grid>
    )
}

export default LandscapeSection