import MoreVert from '@mui/icons-material/MoreVert'
import { Box, Card, Divider, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import colors from 'styles/theme/colors'

function LeadStatusCard({ name, actionType, status, comment, time }) {
    return (
        <Grid item xs={12}>
            <Card sx={{ p: 2, position: 'relative' }}>
                <Typography variant="body1">
                    <span style={{ color: colors.BLUE, fontWeight: 600 }}>{name}</span> &#183; {actionType} &#183; {status} &#183; &nbsp;
                    <span style={{ color: colors.DISABLED }}>{comment}</span>
                </Typography>
                <Typography variant="body2">{time} (7 days remaining)</Typography>
                <IconButton size='small' sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <MoreVert fontSize='1rem' />
                </IconButton>
            </Card>
            <Divider />
        </Grid>
    )
}

export default LeadStatusCard