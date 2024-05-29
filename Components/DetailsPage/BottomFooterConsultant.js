import { Avatar, Box, Button, Chip, Container, Fab, Typography } from '@mui/material'
import AddLinkIcon from '@mui/icons-material/AddLink';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { ContentCopy as ContentCopyIcon, Phone as PhoneIcon,  } from '@mui/icons-material';
import React from 'react';
import { boxShadowTop } from 'utills/Constants';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneIcon from '@mui/icons-material/Done';
import { capitalLizeName, formatDateAndDaysRemaining } from 'utills/CommonFunction';
import { useAuth } from 'utills/AuthContext';
import { useSnackbar } from 'utills/SnackbarContext';
import { ToasterMessages } from 'utills/Constants';
import colors from 'styles/theme/colors';


function BottomFooterConsultant({ handleOpenActivateAdsPopup, propertyData, SinglePropertyId }) {
    const { userDetails } = useAuth();
    const locationData = propertyData?.location;
    const brokerData = SinglePropertyId?.brokerData

    const phoneNumber = brokerData?.phone?.countryCode && brokerData?.phone?.number
        ? `${brokerData.phone.countryCode}-${brokerData.phone.number}`
        : `${userDetails?.phone?.countryCode}-${userDetails?.phone?.number}`;

        const constructPropertyUrl = (property) => {
            const overview = property?.overview;
            const location = property?.location;
            const brokerId = propertyData?.propertyBroker?.[0]?._id ?? 'defaultBrokerId'
    
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
    
            return `${baseUrl}/${projectCategory}-${projectType}-${city}-${sector}-${area}-${projectName}-${name.replace(/\s+/g, '-')}-${phoneNumber.replace(/\s+/g, '-')}-${brokerId}`;
        };
    
    const propertyUrl = constructPropertyUrl(propertyData)

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
    // const [value, setValue] = React.useState(0);

    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    return (
        <>
            <Box sx={{
                width: '100%', position: 'fixed',
                bottom: 0,
                left: 0,
                zIndex: 1000,
            }}>
                <Container maxWidth='md' sx={{ px: { xs: '0 !important', evmd: '1rem !important' }, py: "0 !important" }}>
                    <Box sx={{
                        display: 'flex', background: 'white',
                        boxShadow: boxShadowTop, p: 2,
                        alignItems: "center",
                        gap: "10px"
                    }}>
                        <Box sx={{ display: 'flex', flex: 1 }}>
                            <Avatar src="" sx={{ height: { xs: 24, evmd: 40 }, width: { xs: 24, evmd: 40 }, fontSize: { xs: '0.75rem', evmd: '1rem' } }}></Avatar>
                            <Box sx={{ ml: 1, flex: 1 }}>
                                <Box sx={{ display: { xs: 'none', evmd: 'block' } }}>
                                    <Typography variant='h6'>
                                    {`${propertyData?.overview?.builder}  | ${capitalLizeName(propertyData?.overview?.projectName)} | ${locationData?.city || 'Godrejforest'} | ${locationData?.sector || 'Sector'}`}
                                    </Typography>
                                    <Box>
                                        <Typography variant='h6'>
                                            <a href={`tel:${phoneNumber}`}>
                                                <Chip icon={<PhoneIcon />} label={'+' + phoneNumber} size='small' onClick={() => { }} />
                                            </a>
                                        </Typography>
                                        <Typography variant='h6' sx={{ mt: 1 }}>
                                            4.5 | 12 ratings
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: { xs: 'block', evmd: 'none' } }}>
                                    <Typography variant='subtitle2'>
                                        {`${propertyData?.overview?.builder}  | ${capitalLizeName(propertyData?.overview?.projectName)} | ${locationData?.city || 'Godrejforest'} | ${locationData?.sector || 'Sector'}`}
                                    </Typography>
                                    <Box sx={{ display: 'flex' }}>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant='subtitle2'>
                                                <a href={`tel:${phoneNumber}`}>
                                                    <Chip icon={<PhoneIcon />} label={'+' + phoneNumber} size='small' onClick={() => { }} />
                                                </a>
                                            </Typography>
                                            <Typography variant='subtitle2' sx={{ mt: 1 }}>
                                                4.5 | 12 ratings
                                            </Typography>
                                        </Box>
                                        <Box sx={{ textAlign: 'end', alignSelf: 'end', display: { xs: "block", evmd: 'none' } }}>
                                            <Button onClick={() => handleOpenActivateAdsPopup(propertyUrl)} variant='contained' size="small" startIcon={<DoneIcon />}  sx={{}}>
                                            {propertyData?.isActiveAd ? "Extend" : "👆 Activate your ad link"} 
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ textAlign: 'end', alignSelf: 'end', display: { xs: "none", evmd: 'block' } }}>
                                <Button onClick={() => handleOpenActivateAdsPopup(propertyUrl)} variant='contained' startIcon={<DoneIcon />}  sx={{ mb: 1 }}>
                                    {propertyData?.isActiveAd ? "Extend" : "👆 Activate your ad link"} 
                                </Button>
                                {/* <Button variant='contained' startIcon={<Phone />} sx={{ mb: 1 }}>
                Call First
              </Button>
              <Button startIcon={<GoogleIcon />} variant='contained' sx={{ mb: 1 }}>
                Log in
              </Button> */}
                                <p style={{ fontSize: '0.75rem' }}>{SinglePropertyId?.expired_at ? formatDateAndDaysRemaining(SinglePropertyId?.expired_at) : "Get your customer enquiries "}</p>
                            </Box>
                        </Box>
                        {propertyData?.isActiveAd ? (
                            <ContentCopyIcon fontSize='1rem' sx={{ color: colors.BLUE, }} onClick={() => copyToClipboard(propertyUrl)} />
                    ) : (
                        <ContentCopyIcon fontSize='1rem' sx={{ color: colors.BLUE, cursor: 'not-allowed' }} />
                    )}
                        {/* <Box sx={{ alignSelf: 'end' }}>
                            <IconButton onClick={handleClick}>
                                <MoreVertIcon />
                            </IconButton>
                        </Box>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >

                            <MenuItem onClick={handleClose}>Activate link</MenuItem>
                            <MenuItem onClick={handleClose}>View leads</MenuItem>
                        </Menu> */}
                    </Box>
                </Container>
            </Box>
            <Box
                sx={{
                    position: "fixed",
                    right: 16,
                    bottom: 16,
                    display: { xs: "none", evmd: "flex" },
                    gap: 2,
                    flexDirection: "column",
                }}
            >
                <Fab
                    // size="small"
                    variant="extended"
                    sx={{ justifyContent: "flex-start" }}
                >
                    <AddLinkIcon fontSize='small' sx={{ mr: 1 }} />
                    Activate link
                </Fab>
                <Fab
                    // size="small"
                    variant="extended"
                    sx={{ justifyContent: "flex-start" }}
                >
                    <FormatListBulletedIcon fontSize='small' sx={{ mr: 1 }} />
                    Enquiries
                </Fab>
            </Box>
        </>
    )
}

export default BottomFooterConsultant