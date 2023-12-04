import React from 'react'
import { Grid, Card, Typography } from '@mui/material'
import NewKeyValuePairStructure from 'Components/CommonLayouts/NewKeyValuePairStructure'

function RegulatorySection({ refCallback }) {
    return (
        <Grid item xs={12} id='regulatory' ref={refCallback}>
            <Card sx={{ p: 2 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant='h4'>
                            Regulatory
                        </Typography>
                    </Grid>
                    <NewKeyValuePairStructure label="RERA" value="value" />
                    <NewKeyValuePairStructure label="CC available" value="value" />
                    <NewKeyValuePairStructure label="OC available" value="value" />
                    <NewKeyValuePairStructure label="Registration" value="value" />
                    <NewKeyValuePairStructure label="Resale" value="value" />
                </Grid>
            </Card>
        </Grid>
    )
}

export default RegulatorySection