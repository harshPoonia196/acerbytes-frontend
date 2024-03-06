import { Box, Button, Card, Chip, Divider, IconButton, Rating, Tooltip, Typography } from '@mui/material'
import StarIcon from "@mui/icons-material/Star";
import React from 'react'
import { Close } from '@mui/icons-material';
import colors from 'styles/theme/colors';
import PhoneIcon from '@mui/icons-material/Phone';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { useSearchParams } from 'next/navigation';
import { useSnackbar } from 'utills/SnackbarContext';
import { ToasterMessages } from "Components/Constants";
import CustomButton from 'Components/CommonLayouts/Loading/LoadingButton';
import { formatDateAndDaysRemaining } from 'utills/CommonFunction';

function AdsSection({ handleOpenPersonalizeAds, handleOpenActivateAdsPopup, isConsultant, SinglePropertyId, propertyData, id }) {
    const brokerData = SinglePropertyId?.brokerData
    const locationData = propertyData?.location;
    
    const constructPropertyUrl = (property) => {
        const overview = property?.overview;
        const location = property?.location;
        const brokerId = id ?? 'defaultBrokerId'

        const projectCategory = (overview?.projectCategory.trim() ?? 'category').replace(/\s+/g, '-');
        let projectType;
        if (Array.isArray(overview?.projectType) && overview?.projectType.length > 0) {
            if (typeof overview.projectType[0] === 'object') {
                projectType = overview.projectType.map(type => type.value.trim().replace(/\s+/g, '-')).join("-");
            } else if (typeof overview.projectType[0] === 'string') {
                projectType = overview.projectType.map(type => type.trim().replace(/\s+/g, '-')).join("-");
            }
        } else {
            projectType = 'type';
        }
        const city = (location?.city.trim() ?? 'city').replace(/\s+/g, '-');
        const sector = (location?.sector.trim() ?? 'sector').replace(/\s+/g, '-');
        const area = (location?.area.trim() ?? 'area').replace(/\s+/g, '-');
        const projectName = (overview?.projectName.trim() ?? 'projectName').replace(/\s+/g, '-');

        const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;

        return `${baseUrl}/${projectCategory}-${projectType}-${city}-${sector}-${area}-${projectName}-${brokerId}`;
    };

    const propertyUrl = constructPropertyUrl(propertyData)

    const name = brokerData?.name?.firstName && brokerData?.name?.lastName ? `${brokerData.name.firstName}  ${brokerData.name.lastName}` : "Test Patel"
    const city = locationData?.city ? locationData.city : "Godrejforest"
    const sector = locationData?.sector ? locationData.sector : "Sector"
    const pinCode = locationData?.pinCode ? locationData.pinCode : "132"
    const state = locationData?.state ? locationData.state : "Noida"

    const phoneNumber = brokerData?.phone?.countryCode && brokerData?.phone?.number
        ? `${brokerData.phone.countryCode} ${brokerData.phone.number}`
        : "9322153996667";
    const description = SinglePropertyId?.description ? `${SinglePropertyId.description}` : "Our commitment to addressing escalating environmental issues led us to develop a sustainability strategy which creates long-term value for all our stakeholders, including the planet we live on";

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            showToaterMessages(ToasterMessages?.LINK_COPIED_SUCCESS);
        }).catch(err => {
            showToaterMessages('Failed to copy the link: ', err);
        });
    };


    const { openSnackbar } = useSnackbar();
    const showToaterMessages = (message, severity) => {
        openSnackbar(message, severity);
    };
    return (

        <Box sx={{ m: 2, mb: 0, }}>
            {
                isConsultant ?
                    <Box sx={{ pb: 1, pt: 0, display: 'flex', gap: 1, flexDirection: { xs: 'column', evmd: 'row' } }}>
                        <Box sx={{ display: 'flex', flex: 1 }}>
                            <Typography variant="h6" sx={{ flex: 1, alignSelf: 'center' }}>
                                <Chip
                                    size="small"
                                    sx={{
                                        backgroundColor: "lightgoldenrodyellow",
                                        border: "2px solid gold",
                                        mr: 1,
                                    }}
                                    label="Sample Ad"
                                />Get your personalized URL to receive potential buyers queries directly in your leadsbox
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'end' }}>
                            <Box sx={{ alignSelf: 'center' }}>
                                <CustomButton startIcon={<AddLinkIcon />} variant='outlined' size='small' sx={{ fontSize: '0.875rem' }} onClick={handleOpenActivateAdsPopup} ButtonText={isConsultant ? 'Activate my link' : <>Extend</>} />
                                <IconButton onClick={handleOpenPersonalizeAds}>
                                    <Close fontSize='small' />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                    :
                    <Box sx={{ p: 1, pt: 0, px: 2, display: 'flex', gap: 1, flexDirection: { xs: 'column', evmd: 'row' } }}>
                        <Box sx={{ display: 'flex', flex: 1 }}>
                            <Chip size='small' sx={{ backgroundColor: 'lightgoldenrodyellow', border: '2px solid gold', alignSelf: 'center', mr: 1 }} label="Active Ad" />
                            <Typography variant="h6" sx={{ flex: 1, alignSelf: 'center' }}>
                                {SinglePropertyId?.expired_at ? formatDateAndDaysRemaining(SinglePropertyId?.expired_at) : " "}
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'end' }}>
                            <CustomButton startIcon={<AddLinkIcon />} variant='outlined' size='small' sx={{ fontSize: '0.875rem' }} onClick={handleOpenActivateAdsPopup} ButtonText={"Extend"} />
                        </Box>
                    </Box>
            }
            <Card sx={{ border: isConsultant ? '2px solid gold' : `2px solid ${colors.BLUE}` }}>
                <Box sx={{ display: 'flex', p: 1, px: 2, gap: 1, background: isConsultant ? 'lightgoldenrodyellow' : 'aliceblue', flexDirection: { xs: 'column', sm: 'row' } }}>
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
                    <Box sx={{ alignSelf: { xs: "end", sm: 'center' } }}>
                        <a href={`tel:${phoneNumber}`}>
                            <CustomButton variant='outlined' startIcon={<PhoneIcon />} size='small' sx={{ fontSize: '0.875rem' }} ButtonText={phoneNumber} />
                        </a>
                    </Box>
                </Box>
                <Divider sx={{ borderColor: 'whitesmoke' }} />
                <Box sx={{ alignSelf: 'center', p: 2, py: 1, display: 'flex' }}>
                    <Typography variant='body2' sx={{ flex: 1 }}>
                        {propertyUrl}
                    </Typography>
                    {isConsultant ? (
                        <Typography variant='body2' className='urlStyling' style={{ color: colors.BLUE, cursor: 'not-allowed' }}>Copy link</Typography>
                    ) : (
                        <Typography variant='body2' className='urlStyling' style={{ color: colors.BLUE, cursor: 'pointer' }} onClick={() => copyToClipboard(propertyUrl)}>Copy link</Typography>
                    )}
                </Box>
                <Divider sx={{ borderColor: 'whitesmoke' }} />
                <Typography variant='body2' noWrap sx={{ p: 2, py: 1 }}>{description}</Typography>
                {/* <Divider sx={{ borderColor: 'gainsboro' }} /> */}
            </Card>
        </Box>
    )
}

export default AdsSection