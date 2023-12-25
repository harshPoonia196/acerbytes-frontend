import { Box, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import colors from 'styles/theme/colors'

function LeadStatusCard({ name, actionType, status, comment, time }) {
    return (
        <Grid item xs={12}>
            <Card sx={{ p: 2 }}>
                <Typography variant="h6">
                    <span style={{ color: colors.BLUE }}>{name}</span> - {actionType} | {status} | &nbsp;
                    <span style={{ color: colors.DISABLED }}>{comment}</span>
                </Typography>
                <Typography variant="body2">{time} (7 days remaining)</Typography>
            </Card>
        </Grid>
    )
}

export default LeadStatusCard