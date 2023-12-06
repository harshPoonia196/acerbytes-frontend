import React from 'react'
import { Grid, Card, Typography } from '@mui/material'
import NewKeyValuePairStructure from 'Components/CommonLayouts/NewKeyValuePairStructure'

function LocationSection({ refCallback }) {
    return (
        <Grid item xs={12} ref={refCallback} id='location' >
            <Card sx={{ p: 2 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant='h4'>
                            Location
                        </Typography>
                    </Grid>
                    <NewKeyValuePairStructure label="School" value="value" middleValue={'Low'} />
                    <NewKeyValuePairStructure label="App based rides" value="value" middleValue={'Med'} />
                    <NewKeyValuePairStructure label="Hospital" value="value" />
                    <NewKeyValuePairStructure label="Railway stop" value="value" />
                    <NewKeyValuePairStructure label="Metro" value="value" />
                    <NewKeyValuePairStructure label="Bus stand" value="value" />
                    <NewKeyValuePairStructure label="Food delivery" value="value" />
                </Grid>
            </Card>
        </Grid>
    )
}

export default LocationSection