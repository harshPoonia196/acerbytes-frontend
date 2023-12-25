import { Box, Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import HistoryCard from 'Components/Consultant/PaymentHistory/HistoryCard';

function PaymentHistory() {
    return (
        <>
            <Box sx={{ backgroundColor: 'whitesmoke' }}>
                <Container>
                    <Box sx={{ display: 'flex', pt: 6, px: 2 }}>
                        <Typography variant='h6' sx={{ flex: 1, alignSelf: 'center' }}>My payment and points credit history</Typography>
                        <Box sx={{ display: 'flex' }}>
                            <Typography variant='h6' sx={{ alignSelf: 'center', mr: 2 }}>
                                Balance: 32,000
                            </Typography>
                            <Box>
                                <Button size='small' variant='contained'>Add credits</Button>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Container>
                <Grid container spacing={2}>
                    <HistoryCard />
                </Grid>
            </Container>
        </>
    )
}

export default PaymentHistory