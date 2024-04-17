import { Box, Card, Chip, Divider, IconButton, Rating, Typography } from '@mui/material'
import StarIcon from "@mui/icons-material/Star";
import React from 'react'
import { Close } from '@mui/icons-material';
import colors from 'styles/theme/colors';
import PhoneIcon from '@mui/icons-material/Phone';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { useSnackbar } from 'utills/SnackbarContext';
import CustomButton from 'Components/CommonLayouts/Loading/LoadingButton';
import { formatDateAndDaysRemaining } from 'utills/CommonFunction';
import { useAuth } from 'utills/AuthContext';
import { ToasterMessages } from 'utills/Constants';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function AdsSection({ handleOpenPersonalizeAds, handleOpenActivateAdsPopup, isConsultant, SinglePropertyId, propertyData, id }) {
    const { userDetails } = useAuth();
    const brokerData = SinglePropertyId?.brokerData
    const locationData = propertyData?.location;

    const constructPropertyUrl = (property) => {
        const overview = property?.overview;
        const location = property?.location;
        const brokerId = id ?? 'defaultBrokerId'

        const projectCategory = (overview?.projectCategory.trim() ?? 'category').replace(/\s+/g, '-');
        let projectType;
        if (overview?.projectType?.length > 0) {
            projectType = overview.projectType.map(type => type.value.trim().replace(/\s+/g, '-')).join("-");
        }
        const city = (location?.city.trim() ?? 'city').replace(/\s+/g, '-');
        const sector = (location?.sector.trim() ?? 'sector').replace(/\s+/g, '-');
        const area = (location?.area.trim() ?? 'area').replace(/\s+/g, '-');
        const projectName = (overview?.projectName.trim() ?? 'projectName').replace(/\s+/g, '-');

        const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;

        return `${baseUrl}/${projectCategory}-${projectType}-${city}-${sector}-${area}-${projectName}-${brokerId}`;
    };

    const propertyUrl = constructPropertyUrl(propertyData)

    const name = brokerData?.name?.firstName && brokerData?.name?.lastName ? `${brokerData.name.firstName}  ${brokerData?.name?.lastName}` : `${userDetails?.name?.firstName}  ${userDetails?.name?.lastName}`
    const city = locationData?.city ? locationData.city : "Godrejforest"
    const sector = locationData?.sector ? locationData.sector : "Sector"
    const pinCode = locationData?.pinCode ? locationData.pinCode : "132"
    const state = locationData?.state ? locationData.state : "Noida"
    const projectName = propertyData?.overview?.projectName ? propertyData?.overview?.projectName : ""
    const builderName = propertyData?.overview?.builder

    const phoneNumber = brokerData?.phone?.countryCode && brokerData?.phone?.number
        ? `${brokerData.phone.countryCode} ${brokerData.phone.number}`
        : `${userDetails?.phone?.countryCode}  ${userDetails?.phone?.number}`
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
        <Box sx={{ m: 2, mb: 0, position: 'relative' }}>
            <Card sx={{ border: isConsultant ? '2px solid gold' : `2px solid ${colors.BLUE}`, mb: 1, }}>
                <Box sx={{ p: 1, px: 2, gap: 1, background: isConsultant ? 'lightgoldenrodyellow' : 'aliceblue', }}>
                    <Box sx={{ flex: 1, alignSelf: { xs: 'start', sm: 'center' }, alignItems: "start" }}>
                        <Typography variant='h5'>
                            {builderName}&#183;{projectName}&#183;{city}&#183;{sector}
                        </Typography>

                        <Box sx={{ display: 'flex', width: '100%' }}>
                            <AccountCircle fontSize='small' sx={{ mr: 1 }} />
                            <Box sx={{ display: 'flex', flex: 1 }}>
                                <Typography variant='h6' sx={{ flex: 1, alignSelf: 'center' }}>
                                    {name}
                                </Typography>
                                <Box>
                                    <a href={`tel:${phoneNumber}`}>
                                        <Chip icon={<PhoneIcon />} label={'+' + phoneNumber} size='small' onClick={() => { }} />
                                    </a>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ borderColor: 'whitesmoke' }} />
                <Box sx={{ alignSelf: 'center', p: 2, py: 1, display: 'flex' }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant='body2' nowrap sx={{ display: 'block' }}>
                            {propertyUrl}
                        </Typography>
                    </Box>
                    {isConsultant ? (
                        <ContentCopyIcon fontSize='1rem' sx={{ color: colors.BLUE, cursor: 'not-allowed' }} />
                    ) : (
                        <ContentCopyIcon fontSize='1rem' sx={{ color: colors.BLUE, cursor: 'not-allowed' }} onClick={() => copyToClipboard(propertyUrl)} />
                    )}
                </Box>
                <Divider sx={{ borderColor: 'whitesmoke' }} />
                <Typography variant='body2' noWrap sx={{ p: 2, py: 1 }}>{description}</Typography>
                {/* <Divider sx={{ borderColor: 'gainsboro' }} /> */}
            </Card>
            {isConsultant &&
                <IconButton size="small" sx={{ position: 'absolute', top: 0, right: 0 }} onClick={handleOpenPersonalizeAds}>
                    <Close sx={{ fontSize: '0.75rem' }} />
                </IconButton>}
            {
                isConsultant ?
                    <Box sx={{ pb: 1, pt: 0, display: 'flex', gap: 1, flexDirection: { xs: 'column', evmd: 'row' } }}>
                        <Box sx={{ display: 'flex', flex: 1 }}>
                            <Typography variant="body2" sx={{ flex: 1, alignSelf: 'center' }}>
                                Get your customer enquiries
                            </Typography>
                            <Chip
                                size="small"
                                sx={{
                                    backgroundColor: "lightgoldenrodyellow",
                                    border: "2px solid gold",
                                    mr: 1,
                                }}
                                label="👆 Activate your ad link"
                                onClick={() => handleOpenActivateAdsPopup(propertyUrl)}
                            />
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
                            <CustomButton startIcon={<AddLinkIcon />} variant='outlined' size='small' sx={{ fontSize: '0.875rem' }} onClick={() => handleOpenActivateAdsPopup(propertyUrl)} ButtonText={"Extend"} />
                        </Box>
                    </Box>
            }
        </Box>
    )
}

export default AdsSection