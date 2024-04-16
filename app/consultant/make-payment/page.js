'use client'

import React from 'react'
import { Container, Typography, Card, Box, Chip } from '@mui/material'
import Image from 'next/image'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Qrimage from "../../../public/images/Upi.png"
import Footer from 'Components/Footer';
import CustomConsultantBreadScrumbs from 'Components/CommonLayouts/CustomConsultantBreadScrumbs';
import { companyName } from 'Components/NavBar/Links';
import colors from 'styles/theme/colors';

function MakePayment() {
    return (
        <>

            <CustomConsultantBreadScrumbs text='Make payment' />

            <Container maxWidth='sm'>

                <Card>
                    <Box sx={{ p: 2, borderBottom: '1px solid whitesmoke', textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ flex: 1 }}>
                            Make payment to
                        </Typography>
                        <Typography variant="h3">
                            {companyName}
                        </Typography>
                        <Typography variant="body2" sx={{ color: colors.DISABLED, }}>
                            by Gravity44 Platform Solution Private Limited
                        </Typography>
                    </Box>
                    <Box sx={{ p: 2, textAlign: 'center', borderBottom: '1px solid whitesmoke' }}>
                        <Image src={Qrimage} width={200} height={200} />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Typography variant='body2'>
                            Step 1. Scan QR code, enter amount and pay
                        </Typography>
                        <Typography variant='body2'>
                            Step 2. After successful payment, send payment reference screenshot to&nbsp;
                            <Chip onClick={() => { }} icon={<WhatsAppIcon fontSize="small" />}
                                label="+9198799877" size="small" sx={{ fontSize: '0.875rem', verticalAlign: 'middle' }} />
                        </Typography>
                    </Box>
                </Card>
            </Container >
            <Footer paymentPage />
        </>
    )
}

export default MakePayment