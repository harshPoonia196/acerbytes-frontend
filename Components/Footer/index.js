import React from 'react'
import { Box, Typography, Chip, Button, Card } from '@mui/material'
import { useRouter } from 'next/navigation'
import colors from 'styles/theme/colors'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function Footer({ paymentPage }) {
    const history = useRouter()

    const handleWhatsappShare = () => {
        window.open('whatsapp://send?text=Hi, I would like to invite u to a better place to get a clients.')
    }

    return (
        <Card sx={{ position: 'fixed', bottom: 0, p: 2, borderTop: '1px solid gainsboro', width: '100%', display: 'flex' }}>
            <Box sx={{ flex: 1, alignSelf: 'center' }}>
                <Typography variant="body2">
                    <span className='urlStyling' style={{ color: colors.BLUE, cursor: 'pointer' }} onClick={() => { history.push('/') }}>Terms</span> ·{' '}
                    <span className='urlStyling' style={{ color: colors.BLUE, cursor: 'pointer' }} onClick={() => { history.push('/') }}>Privacy</span> ·
                    Platform solution by Gravity44
                </Typography>
            </Box>
            <Box sx={{ alignSelf: 'center', cursor: 'pointer' }}>
                {/* <a href="whatsapp://send?text=Hi, I would like to invite u to a better place to get a clients." data-action="share/whatsapp/share"
                    target="_blank"> */}
                <Button startIcon={<WhatsAppIcon />} onClick={handleWhatsappShare} size="small" sx={{ fontSize: '0.75rem' }}>
                    Invite a consultant
                </Button>
                {/* </a> */}
            </Box>
            {
                !paymentPage &&
                <Box sx={{ alignSelf: 'center', cursor: 'pointer' }}>
                    <Button variant='outlined'
                        onClick={() => { history.push('/make-payment') }}
                        size="small" sx={{ fontSize: '0.75rem', ml: 2 }}
                        startIcon={<QrCodeScannerIcon />}
                    >
                        Pay here
                    </Button>
                </Box>
            }
        </Card >
    )
}

export default Footer