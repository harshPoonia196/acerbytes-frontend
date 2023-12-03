import React from 'react'
import { Typography, Grid } from '@mui/material'

function NewKeyValuePairStructure({ label, value, middleValue }) {
    return (
        <>
            <Grid item xs={middleValue === undefined ? 9 : 6}>
                <Typography variant="h5">
                    {label}
                </Typography>
            </Grid>
            {
                !(middleValue === undefined) && <Grid item xs={3}><Typography variant="body1">{middleValue}</Typography></Grid>
            }
            <Grid item xs={3} sx={{ textAlign: "end" }}>
                <Typography variant="body1">{value}</Typography>
            </Grid>
        </>
    )
}

export default NewKeyValuePairStructure