'use client'

import React from 'react'
import { Container, Typography, Card, Box, Chip } from '@mui/material'
import Image from 'next/image'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Qrimage from "../../../public/Upi.png"
import Footer from 'Components/Footer';
import CustomConsultantBreadScrumbs from 'Components/CommonLayouts/CustomConsultantBreadScrumbs';
import { companyName } from 'Components/NavBar/Links';

function MakePayment() {
    return (
        <>

            <CustomConsultantBreadScrumbs text='Make payment' />

            <Container maxWidth='sm'>

                <Card>
                    <Box sx={{ p: 2, borderBottom: '1px solid whitesmoke', display: 'flex' }}>
                        <Typography variant="h4" sx={{ flex: 1 }}>
                            Make payment to
                        </Typography>
                        <Box sx={{ textAlign: 'end' }}>
                            <Typography variant="h4">
                                {companyName}
                            </Typography>
                            <Typography variant="subtitle2">
                                Gravity44 platform solution
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ p: 2, textAlign: 'center', borderBottom: '1px solid whitesmoke' }}>
                        <Image src={Qrimage} width={200} height={200} />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Typography variant='body2'>
                            1. Scan QR code, enter amount and pay
                        </Typography>
                        <Typography variant='body2'>
                            2. After successful payment, send payment reference screenshot to
                            <Chip onClick={() => { }} icon={<WhatsAppIcon fontSize="small" />}
                                label="+9198799877" size="small" sx={{ fontSize: '0.875rem' }} />
                        </Typography>
                    </Box>
                </Card>
            </Container >
            <Footer paymentPage />
        </>
    )
}

export default MakePayment