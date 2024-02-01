import React from 'react'
import { Box, Typography, Chip, Button, Card } from '@mui/material'
import { useRouter } from 'next/navigation'
import colors from 'styles/theme/colors'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useSelector } from 'react-redux';
import { listOfPages } from 'Components/NavBar/Links';
import ShareIcon from '@mui/icons-material/Share';
import HowToRegIcon from '@mui/icons-material/HowToReg';

function Footer({ paymentPage }) {
    const history = useRouter()

    const handleWhatsappShare = () => {
        window.open('whatsapp://send?text=Hi, I would like to invite u to a better place to get a clients.')
    }

    const navState = useSelector(globalState => globalState.isDrawerOpen)

    return (
        <Card sx={{
            position: 'fixed', bottom: 0, p: 2, width: '100%', display: 'flex',
            boxShadow: '-1px -2px 6px -2px gainsboro!important',
            flexDirection: {
                xs: 'column-reverse', md: 'row'
            }
        }}>
            <Box sx={{ flex: 1, display: 'flex', mt: { xs: 1, md: 0 }, flexWrap: 'wrap', alignSelf: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ alignSelf: 'center' }}>
                    <span className='urlStyling' style={{ color: colors.BLUE, cursor: 'pointer' }} onClick={() => { history.push('/terms-and-condition') }}>Terms</span> ·{' '}
                    <span className='urlStyling' style={{ color: colors.BLUE, cursor: 'pointer' }} onClick={() => { history.push('/privacy') }}>Privacy</span> ·
                    Platform solution by Gravity44
                </Typography>
                {
                    !paymentPage &&
                    <Box sx={{ alignSelf: 'center', cursor: 'pointer' }}>
                        <Button variant='outlined'
                            onClick={() => { history.push('/consultant/make-payment') }}
                            size="small" sx={{ fontSize: '0.75rem' }}
                            startIcon={<QrCodeScannerIcon />}
                        >
                            Pay&nbsp;here
                        </Button>
                    </Box>
                }
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignSelf: 'center', gap: 1 }}>
                <Box sx={{ alignSelf: 'center', cursor: 'pointer', }}>
                    <Button startIcon={<ShareIcon />} onClick={handleWhatsappShare} size="small" sx={{ fontSize: '0.75rem' }}>
                        Share
                    </Button>
                </Box>
                <Box sx={{ alignSelf: 'center', cursor: 'pointer', }}>
                    <Button startIcon={<PersonAddAlt1Icon />} onClick={() => history.push(listOfPages.consultantJoinNow)} size="small" sx={{ fontSize: '0.75rem' }}>
                        Invite&nbsp;-&nbsp;Consultant
                    </Button>
                </Box>
                <Box sx={{ alignSelf: 'center', cursor: 'pointer', }}>
                    {/* <a href="whatsapp://send?text=Hi, I would like to invite u to a better place to get a clients." data-action="share/whatsapp/share"
                    target="_blank"> */}
                    <Button startIcon={<HowToRegIcon />} onClick={() => history.push(listOfPages.consultantJoinNow)} size="small" sx={{ fontSize: '0.75rem' }}>
                        Register&nbsp;-&nbsp;Consultant
                    </Button>
                    {/* </a> */}
                </Box>
            </Box>
        </Card >
    )
}

export default Footer