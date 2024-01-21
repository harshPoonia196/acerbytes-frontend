import { Box, Button, Card, Chip, Divider, IconButton, Rating, Tooltip, Typography } from '@mui/material'
import StarIcon from "@mui/icons-material/Star";
import React from 'react'
import { Close } from '@mui/icons-material';
import colors from 'styles/theme/colors';
import PhoneIcon from '@mui/icons-material/Phone';
import AddLinkIcon from '@mui/icons-material/AddLink';

function AdsSection({ handleOpenPersonalizeAds, handleOpenActivateAdsPopup, isConsultant }) {
    return (

        <Box sx={{ m: 2, mb: 0, }}>
            {
                isConsultant &&
                <Box sx={{ p: 1, pt: 0, px: 2, display: 'flex', gap: 1, flexDirection: { xs: 'column', evmd: 'row' } }}>
                    <Typography variant="h6" sx={{ flex: 1, alignSelf: 'center' }}>
                        <Chip size='small' sx={{ backgroundColor: 'lightgoldenrodyellow', border: '2px solid gold' }} label="Sample Ads" /> - Get your personalized URL to receive potential buyers queries directly in your leadsbox
                    </Typography>
                    <Box sx={{ textAlign: 'end' }}>
                        <Button startIcon={<AddLinkIcon />} variant='outlined' size='small' sx={{ fontSize: '0.875rem', mr: 2 }} onClick={handleOpenActivateAdsPopup}>
                            {name ? 'Extend' : <>Activate&nbsp;my&nbsp;link</>}
                        </Button>
                        <Button startIcon={<Close />} size='small' sx={{ fontSize: '0.875rem' }} onClick={handleOpenPersonalizeAds}>
                            Don't show
                        </Button>
                    </Box>
                </Box>
            }
            <Card sx={{ border: isConsultant ? '2px solid gold' : `2px solid ${colors.BLUE}` }}>
                <Box sx={{ display: 'flex', p: 1, px: 2, background: isConsultant ? 'lightgoldenrodyellow' : 'aliceblue' }}>
                    <Box sx={{ display: 'flex', flex: 1, alignSelf: 'center' }}>
                        <Typography variant='h5' sx={{}}>Contact (Anand Gupta &#183; 4.7&nbsp;
                            <Rating
                                name="text-feedback"
                                value={4}
                                readOnly
                                precision={0.5}
                                sx={{ fontSize: '1rem', alignSelf: 'center', verticalAlign: 'baseline' }}
                                emptyIcon={
                                    <StarIcon
                                        style={{ opacity: 0.55 }}
                                        fontSize="inherit"
                                    />
                                }
                            />
                            ) for Godrejforest &#183; Sector &#183; 132 &#183; Noida
                        </Typography>
                    </Box>
                    <Box sx={{ alignSelf: 'center' }}>
                        <a>
                            <Button variant='outlined' startIcon={<PhoneIcon />} size='small' sx={{ fontSize: '0.875rem' }}>
                                9322153996667
                            </Button>
                        </a>
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
        </Box>
    )
}

export default AdsSection