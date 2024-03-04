import MoreVert from '@mui/icons-material/MoreVert'
import { Box, Card, Divider, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import colors from 'styles/theme/colors'

function LeadStatusCard({ name, actionType, status, comment, time }) {
    return (
        <Grid item xs={12}>
            <Card sx={{ p: 2, display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1">
                        <span style={{ color: colors.BLUE, fontWeight: 600 }}>{name}</span> &#183; {actionType} &#183; {status} &#183; &nbsp;
                        <span style={{ color: colors.DISABLED }}>{comment}</span>
                    </Typography>
                    <Typography variant="body2">{time} (7 days remaining)</Typography>
                </Box>
                <Box>
                    <IconButton size='small'>
                        <MoreVert fontSize='1rem' />
                    </IconButton>
                </Box>
            </Card>
            <Divider />
        </Grid>
    )
}

export default LeadStatusCard