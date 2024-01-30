'use client'

import { Box, Button, Container, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import HistoryCard from 'Components/Consultant/PaymentHistory/HistoryCard';
import CustomConsultantBreadScrumbs from 'Components/CommonLayouts/CustomConsultantBreadScrumbs';
import ConsultantAddCreditPopup from 'Components/Consultant/PaymentHistory/Modal/ConsultantAddCreditPopup';
import AddCardIcon from '@mui/icons-material/AddCard';

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
            <CustomConsultantBreadScrumbs text='Payment history' />
            <Box sx={{ backgroundColor: 'white' }}>
                <Container>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant='h3'>
                                Balance: 32,000
                            </Typography>
                            <Typography variant='h6' sx={{ flex: 1, alignSelf: 'center' }}>My payment and points credit history</Typography>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Box>
                                <Button startIcon={<AddCardIcon />} size='small' variant='contained' onClick={handleOpenAddCredit}>Add credits</Button>
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