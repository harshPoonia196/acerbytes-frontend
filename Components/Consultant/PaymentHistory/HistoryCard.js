import React from 'react'
import { Box, Card, IconButton, Typography, Grid } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import colors from 'styles/theme/colors';

function HistoryCard() {
    return (
        <Grid item xs={12}>
            <Card>
                <Box sx={{ p: 1, px: 2, display: 'flex', backgroundColor: 'whitesmoke' }}>
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex' }}>
                            <Typography variant='h6' sx={{ flex: 1 }}>Paid rs 23,000 + 18% tax</Typography>
                            <Typography variant='h6' sx={{ color: colors.BLUE, flex: 1 }}>Balance: 32,000</Typography>
                        </Box>
                        <Typography variant='h6'>
                            New points: 25,000 | Opening: 8,000 | Consumed: 12,000
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant='subtitle2' sx={{ color: colors.DISABLED }}>Points Consumed</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='h6'>12,000</Typography>
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={1} columnSpacing={2} sx={{ pt: 2 }}>
                        <Grid item xs={6}>
                            <Typography variant='subtitle2' sx={{ color: colors.DISABLED }}>Activated links</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='subtitle2' sx={{ color: colors.DISABLED }}>5,000(1 link)</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='subtitle2' sx={{ color: colors.DISABLED }}>Activated leads</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='subtitle2' sx={{ color: colors.DISABLED }}>7,000(25 contacts)</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='subtitle2' sx={{ color: colors.DISABLED }}>Notes panel</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='subtitle2' sx={{ color: colors.DISABLED }}>25,000(3 months)</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </Grid>
    )
}

export default HistoryCard