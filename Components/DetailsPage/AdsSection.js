import { Box, Button, Card, Divider, Rating, Tooltip, Typography } from '@mui/material'
import StarIcon from "@mui/icons-material/Star";
import React from 'react'
import { Close } from '@mui/icons-material';
import colors from 'styles/theme/colors';
import PhoneIcon from '@mui/icons-material/Phone';

function AdsSection({ handleOpenPersonalizeAds, handleOpenActivateAdsPopup, isConsultant }) {
    return (
        <>
            <Card sx={{ m: 2, mx: 8, mb: 0, position: 'relative', border: isConsultant ? '2px solid gold' : `2px solid ${colors.BLUE}` }}>
                <Box sx={{ display: 'flex', background: isConsultant ? 'lightgoldenrodyellow' : 'aliceblue' }}>
                    <Box sx={{ display: 'flex', p: 2, py: 1, flex: 1 }}>
                        <Typography variant='h6' sx={{}}>Contact (Anand Gupta &#183; 4.7</Typography>
                        <Rating
                            name="text-feedback"
                            value={4}
                            readOnly
                            precision={0.5}
                            sx={{ fontSize: '1rem', alignSelf: 'center', ml: 1 }}
                            emptyIcon={
                                <StarIcon
                                    style={{ opacity: 0.55 }}
                                    fontSize="inherit"
                                />
                            }
                        />
                        <Typography variant="h6" sx={{ alignSelf: 'center' }}>) for Godrej forest &#183; Sector &#183; 132 &#183; Noida</Typography>
                    </Box>
                    <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                        <Tooltip title="Don't show me again">
                            {/* <IconButton> */}
                            <Close fontSize="1rem" sx={{ cursor: 'pointer' }} onClick={handleOpenPersonalizeAds} />
                            {/* </IconButton> */}
                        </Tooltip>
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'whitesmoke' }} />
                <Box sx={{ alignSelf: 'center', p: 2, py: 1, display: 'flex' }}>
                    <Typography variant='body2' sx={{ flex: 1 }}>https://abcd.com/aaad</Typography>
                    <Typography variant='body2' className='urlStyling' style={{ color: colors.BLUE, cursor: 'pointer' }}>Copy link</Typography>
                </Box>
                <Divider sx={{ borderColor: 'whitesmoke' }} />
                <Typography variant='body2' noWrap sx={{ p: 2, py: 1 }}>Our commitment to addressing escalating environmental issues led us to develop a sustainability strategy which creates long-term value for all our stakeholders, including the planet we live on</Typography>
                {/* <Divider sx={{ borderColor: 'gainsboro' }} /> */}
            </Card>
            <Box sx={{ m: 2, mx: 8, p: 2, py: 1, pt: 0, display: 'flex' }}>
                {
                    isConsultant &&
                    <Typography variant='body2' sx={{ alignSelf: 'center' }}>
                        <i>
                            {
                                name ? 'Your Link will expiry in 20 days' :
                                    'Get your personalized URL to receive potential buyers queries directly in your leadsbox'

                            }
                        </i>
                    </Typography>
                }
                <Box sx={{ flex: 1, textAlign: 'end' }}>
                    {isConsultant ?
                        <Button variant='outlined' size='small' sx={{ fontSize: '0.875rem' }} onClick={handleOpenActivateAdsPopup}>
                            {name ? 'Extend' : `Activate my link`}
                        </Button>
                        :
                        <a>
                            <Button variant='outlined' startIcon={<PhoneIcon />} size='small' sx={{ fontSize: '0.875rem' }}>
                                9322153996667
                            </Button>
                        </a>
                    }

                </Box>
            </Box>
        </>
    )
}

export default AdsSection