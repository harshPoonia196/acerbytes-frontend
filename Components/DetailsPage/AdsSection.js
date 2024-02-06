import { Box, Button, Card, Chip, Divider, IconButton, Rating, Tooltip, Typography } from '@mui/material'
import StarIcon from "@mui/icons-material/Star";
import React from 'react'
import { Close } from '@mui/icons-material';
import colors from 'styles/theme/colors';
import PhoneIcon from '@mui/icons-material/Phone';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { useSearchParams } from 'next/navigation';

function AdsSection({ handleOpenPersonalizeAds, handleOpenActivateAdsPopup, isConsultant, SinglePropertyId, propertyData, id }) {
    const brokerData = SinglePropertyId?.brokerData
    const locationData = propertyData?.location;

    const constructPropertyUrl = (property) => {
        const overview = property?.overview;
        const location = property?.location;
        const brokerId = id ?? 'defaultBrokerId'

        const projectCategory = (overview?.projectCategory ?? 'category').replace(/\s+/g, '-');
        const projectType = (overview?.projectType?.map(type => type.replace(/\s+/g, '-')).join("-")) ?? 'type';
        const city = (location?.city ?? 'city').replace(/\s+/g, '-');
        const sector = (location?.sector ?? 'sector').replace(/\s+/g, '-');
        const area = (location?.area ?? 'area').replace(/\s+/g, '-');
        const projectName = (overview?.projectName ?? 'projectName').replace(/\s+/g, '-');


        return `http://localhost:3000/${projectCategory}-${projectType}-${city}-${sector}/${area}-${projectName}-${brokerId}`;
    };

    const propertyUrl = constructPropertyUrl(propertyData)

    const name = brokerData?.name?.firstName && brokerData?.name?.lastName ? `${brokerData.name.firstName}  ${brokerData.name.lastName}` : "Anand Gupta"
    const city = locationData?.city ? locationData.city : "Godrejforest"
    const sector  = locationData?.sector ? locationData.sector : "Sector"
    const pinCode  = locationData?.pinCode ? locationData.pinCode : "132"
    const state  = locationData?.state ? locationData.state : "Noida"
    
    const phoneNumber = brokerData?.phone?.countryCode && brokerData?.phone?.number
        ? `${brokerData.phone.countryCode} ${brokerData.phone.number}`
        : "9322153996667";
    const description = SinglePropertyId?.description ? `${SinglePropertyId.description}` : "Our commitment to addressing escalating environmental issues led us to develop a sustainability strategy which creates long-term value for all our stakeholders, including the planet we live on";
    const Link = id ? propertyUrl : "https://abcd.com/aaad"


    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Link copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy the link: ', err);
        });
    };
    return (

        <Box sx={{ m: 2, mb: 0, }}>
            {
                isConsultant ?
                    <Box sx={{ p: 1, pt: 0, px: 2, display: 'flex', gap: 1, flexDirection: { xs: 'column', evmd: 'row' } }}>
                        <Box sx={{ display: 'flex', flex: 1 }}>
                            <Chip size='small' sx={{ backgroundColor: 'lightgoldenrodyellow', border: '2px solid gold', alignSelf: 'center', mr: 1 }} label="Sample Ad" />
                            <Typography variant="h6" sx={{ flex: 1, alignSelf: 'center' }}>
                                Get your personalized URL to receive potential buyers queries directly in your leadsbox
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'end' }}>
                            <Button startIcon={<AddLinkIcon />} variant='outlined' size='small' sx={{ fontSize: '0.875rem', mr: 2 }} onClick={handleOpenActivateAdsPopup}>
                                {name ? 'Extend' : <>Activate&nbsp;my&nbsp;link</>}
                            </Button>
                            <Button startIcon={<Close />} size='small' sx={{ fontSize: '0.875rem' }} onClick={handleOpenPersonalizeAds}>
                                Don't show
                            </Button>
                        </Box>
                    </Box>
                    :
                    <Box sx={{ p: 1, pt: 0, px: 2, display: 'flex', gap: 1, flexDirection: { xs: 'column', evmd: 'row' } }}>
                        <Box sx={{ display: 'flex', flex: 1 }}>
                            <Chip size='small' sx={{ backgroundColor: 'lightgoldenrodyellow', border: '2px solid gold', alignSelf: 'center', mr: 1 }} label="Active Ad" />
                            <Typography variant="h6" sx={{ flex: 1, alignSelf: 'center' }}>
                                till 25th Feb (5 days remaining)
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'end' }}>
                            <Button startIcon={<AddLinkIcon />} variant='outlined' size='small' sx={{ fontSize: '0.875rem' }} onClick={handleOpenActivateAdsPopup}>
                                Extend
                            </Button>
                        </Box>
                    </Box>
            }
            <Card sx={{ border: isConsultant ? '2px solid gold' : `2px solid ${colors.BLUE}` }}>
                <Box sx={{ display: 'flex', p: 1, px: 2, background: isConsultant ? 'lightgoldenrodyellow' : 'aliceblue' }}>
                    <Box sx={{ display: 'flex', flex: 1, alignSelf: 'center' }}>
                        <Typography variant='h5' sx={{}}>Contact ({name} &#183; 4.7&nbsp;
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
                            ) for {city} &#183; {sector} &#183; {pinCode} &#183; {state}
                        </Typography>
                    </Box>
                    <Box sx={{ alignSelf: 'center' }}>
                        <a>
                            <Button variant='outlined' startIcon={<PhoneIcon />} size='small' sx={{ fontSize: '0.875rem' }}>
                                {phoneNumber}
                            </Button>
                        </a>
                    </Box>
                </Box>
                <Divider sx={{ borderColor: 'whitesmoke' }} />
                <Box sx={{ alignSelf: 'center', p: 2, py: 1, display: 'flex' }}>
                    <Typography variant='body2' sx={{ flex: 1 }}>
                        {Link}
                    </Typography>
                    <Typography variant='body2' className='urlStyling' style={{ color: colors.BLUE, cursor: 'pointer' }} onClick={() => copyToClipboard(propertyUrl)}>Copy link</Typography>
                </Box>
                <Divider sx={{ borderColor: 'whitesmoke' }} />
                <Typography variant='body2' noWrap sx={{ p: 2, py: 1 }}>{description}</Typography>
                {/* <Divider sx={{ borderColor: 'gainsboro' }} /> */}
            </Card>
        </Box>
    )
}

export default AdsSection