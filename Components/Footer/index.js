import React, { useState } from 'react'
import { Box, Typography, Chip, Button, Card, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import { useRouter, usePathname } from 'next/navigation'
import colors from 'styles/theme/colors'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useSelector } from 'react-redux';
import { listOfPages } from 'Components/NavBar/Links';
import ShareIcon from '@mui/icons-material/Share';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CustomButton from 'Components/CommonLayouts/Loading/LoadingButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { boxShadowTop } from 'utills/Constants';
import { useAuth } from "utills/AuthContext";
import DescriptionIcon from '@mui/icons-material/Description';

function Footer({ paymentPage }) {
    const history = useRouter()
    const { isLogged } = useAuth();
    
    const handleWhatsappShare = () => {
        window.open('whatsapp://send?text=Hi, I would like to invite u to a better place to get a clients.')
    }

    const navState = useSelector(globalState => globalState.isDrawerOpen)

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const pathname = usePathname();

    return (
        <Card sx={{
            position: 'fixed', bottom: 0, p: 2, width: '100%',
            boxShadow: boxShadowTop,
            zIndex: 1,
            justifyContent: {sm: "space-between"},
            alignItems: "center"
        }}>
            {pathname === '/generate-real-estate-leads-growth' && <Box sx={{ display: {sm: 'none', xs: 'block'}, textAlign: 'center' }}>
                 <Typography variant="h3" className='blink_me'>Lorem ipsum dolor smat</Typography>
            </Box>}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: "100%"}}>
                <Box sx={{ alignSelf: 'center' }}>
                    {pathname !== '/generate-real-estate-leads-growth' ? (<>
                        {
                            !paymentPage &&
                            <CustomButton variant='outlined'
                                onClick={() => { history.push('/consultant/make-payment') }}
                                size="small" sx={{ fontSize: '0.75rem' }}
                                startIcon={<QrCodeScannerIcon />}

                                ButtonText={<>Pay&nbsp;here</>}
                            />

                        }</>) :
                    (<CustomButton variant='outlined'
                        onClick={() => { window.open('http://wa.me/+919323996997', "_blank") }}
                        size="small"
                        startIcon={<WhatsAppIcon />}

                        ButtonText={<>Contact us</>}
                    />)}
                </Box>
                {pathname === '/generate-real-estate-leads-growth' && <Box sx={{ alignSelf: 'center', display: {sm: 'block', xs: 'none'} }}>
                    <Typography variant="h3" className='blink_me'>Lorem ipsum dolor smat</Typography>
                </Box>}
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box sx={{ alignSelf: 'center', cursor: 'pointer', }}>
                    {pathname !== '/generate-real-estate-leads-growth' ? 
                        <CustomButton variant='contained'
                            size="small"
                            startIcon={<ShareIcon />}
                            ButtonText={<>Share</>}
                        /> :
                        <CustomButton variant='contained'
                            size="small"
                            startIcon={<DescriptionIcon />}
                            ButtonText={<>Register</>}
                        />
                    }
                    </Box>
                    <Tooltip title="More">
                    
                    <IconButton onClick={handleClick}>
                        <MoreVertIcon fontSize='small' />
                    </IconButton>
                    </Tooltip>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => {
                            handleClose()
                            history.push(listOfPages.consultantJoinNow)
                        }}>
                            <PersonAddAlt1Icon fontSize='1rem' sx={{
                                mr: 1
                            }} />
                            Invite&nbsp;-&nbsp;Consultant
                        </MenuItem>
                        {!isLogged && <MenuItem onClick={() => {
                            handleClose()
                            history.push(listOfPages.consultantJoinNow)
                        }}>
                            <HowToRegIcon fontSize='1rem' sx={{
                                mr: 1
                            }} />
                            Register&nbsp;-&nbsp;Consultant
                        </MenuItem>}
                        <MenuItem onClick={() => {
                            handleClose()
                            history.push(listOfPages.termsAndCondition)
                        }}>
                            <HowToRegIcon fontSize='1rem' sx={{
                                mr: 1
                            }} />
                            Terms
                        </MenuItem>
                        <MenuItem onClick={() => {
                            handleClose()
                            history.push(listOfPages.privacy)
                        }}>
                            <HowToRegIcon fontSize='1rem' sx={{
                                mr: 1
                            }} />
                            Privacy
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>
        </Card >
    )
}

export default Footer