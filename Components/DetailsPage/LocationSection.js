import React from 'react'
import { Grid, Card, Typography } from '@mui/material'
import NewKeyValuePairStructure from 'Components/CommonLayouts/NewKeyValuePairStructure'

function LocationSection() {
    return (
        <Grid item xs={12}>
            <Card sx={{ p: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h4'>
                            Location
                        </Typography>
                    </Grid>
                    <NewKeyValuePairStructure label="School" value="Anasjsmdj" middleValue={'Low'} />
                    <NewKeyValuePairStructure label="App based rides" value="Anasjsmdj" middleValue={'Med'} />
                    <NewKeyValuePairStructure label="Hospital" value="Anasjsmdj" />
                    <NewKeyValuePairStructure label="Railway stop" value="Anasjsmdj" />
                    <NewKeyValuePairStructure label="Metro" value="Anasjsmdj" />
                    <NewKeyValuePairStructure label="Bus stand" value="Anasjsmdj" />
                    <NewKeyValuePairStructure label="Food delivery" value="Anasjsmdj" />
                </Grid>
            </Card>
        </Grid>
    )
}

export default LocationSection