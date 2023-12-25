'use client'

import { Box, Button, Container, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import HistoryCard from 'Components/Consultant/PaymentHistory/HistoryCard';
import CustomConsultantBreadScrumbs from 'Components/CommonLayouts/CustomConsultantBreadScrumbs';
import ConsultantAddCreditPopup from 'Components/Consultant/PaymentHistory/Modal/ConsultantAddCreditPopup';

function PaymentHistory() {

    const [openAddCredit, setOpenAddCredit] = useState(false)

    const handleOpenAddCredit = () => {
        setOpenAddCredit(true)
    }

    const handleCloseAddCredit = () => {
        setOpenAddCredit(false)
    }

    return (
        <>
            <ConsultantAddCreditPopup open={openAddCredit} handleClose={handleCloseAddCredit} />
            <Box sx={{ backgroundColor: "white" }}>
                <Container
                    maxWidth="lg"
                >
                    <CustomConsultantBreadScrumbs text='Payment history' />
                </Container>
            </Box>
            <Box sx={{ backgroundColor: 'whitesmoke' }}>
                <Container>
                    <Box sx={{ display: 'flex', pt: 6, px: 2 }}>
                        <Typography variant='h6' sx={{ flex: 1, alignSelf: 'center' }}>My payment and points credit history</Typography>
                        <Box sx={{ display: 'flex' }}>
                            <Typography variant='h6' sx={{ alignSelf: 'center', mr: 2 }}>
                                Balance: 32,000
                            </Typography>
                            <Box>
                                <Button size='small' variant='contained' onClick={handleOpenAddCredit}>Add credits</Button>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Container>
                <HistoryCard />
                <HistoryCard />
            </Container>
        </>
    )
}

export default PaymentHistory