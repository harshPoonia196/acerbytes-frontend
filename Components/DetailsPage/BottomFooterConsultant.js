import { Avatar, Box, Button, Chip, Container, Fab, IconButton, Menu, MenuItem, Typography, Rating } from '@mui/material'
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
import ShareIcon from '@mui/icons-material/Share';
import { countryCodeFormating } from 'utills/utills';


function BottomFooterConsultant({ handleOpenActivateAdsPopup, propertyData, SinglePropertyId }) {
    const { userDetails } = useAuth();
    const locationData = propertyData?.location;
    const brokerData = SinglePropertyId?.brokerData

    const name = brokerData?.name?.firstName && brokerData?.name?.lastName
        ? `${brokerData.name.firstName} ${brokerData.name.lastName}`
        : `${userDetails?.name?.firstName} ${userDetails?.name?.lastName}`;

    const phoneNumber = brokerData?.phone?.countryCode && brokerData?.phone?.number
        ? `${countryCodeFormating(brokerData.phone.countryCode)} ${
            brokerData.phone.number
          }`
        : `${countryCodeFormating(userDetails?.phone?.countryCode)}-${userDetails?.phone?.number}`;

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
    
            return `${baseUrl}/${projectCategory}-${projectType}-${city}-${sector}-${area}-${projectName}-${brokerId}`;
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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box className="consultantFooter" sx={{
                width: '100%', position: 'fixed',
                bottom: 0,
                left: 0,
                zIndex: 1000,
            }}>
                <Container maxWidth='md' sx={{ px: { xs: '0 !important', evmd: '1rem !important' }, py: "0 !important" }}>
                    <Box sx={{
                        background: 'ghostwhite',
                        boxShadow: boxShadowTop, p: 2,
                        alignItems: "start",
                        gap: "0px",
                        borderTop: propertyData?.isActiveAd ? `2px solid ${colors.BLUE}` : `2px solid gold`
                    }}>
                        <Box>
                            <Typography variant='body2' sx={{ marginBottom: "5px"}}>
                                {`${propertyData?.overview?.builder}  | ${capitalLizeName(propertyData?.overview?.projectName)} | ${locationData?.city || 'Godrejforest'} | ${locationData?.sector || 'Sector'}`}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex'}}>
                            <Avatar src={propertyData?.brokerDetais?.profilePicture} sx={{ height: { xs: 24, evmd: 40 }, width: { xs: 24, evmd: 40 }, fontSize: { xs: '0.75rem', evmd: '1rem' } }}></Avatar>
                            <Box sx={{ display: 'flex', flex: 1, justifyContent: "space-between", marginLeft: "10px" }}>
                                   
                                <Box sx={{ display: { xs: 'none', evmd: 'block' } }}>
                                    {/* <Typography variant='body2' sx={{ marginBottom: "5px"}}>
                                    {`${capitalLizeName(propertyData?.overview?.builder || "builder")}  | ${capitalLizeName(propertyData?.overview?.projectName|| "projectName")} | ${locationData?.city || 'Godrejforest'} | ${locationData?.sector || 'Sector'}`}
                                    </Typography> */}
                                    
                                    <Typography variant='h6' sx={{ flex: 1, alignSelf: 'center', display: "inline-block", marginRight: "5px" }}>
                                     {name}
                                    </Typography>
                                    <a href={`tel:${phoneNumber}`}>
                                                <Chip icon={<PhoneIcon />} label={phoneNumber} size='small' />
                                            </a>
                                    
                                    <Box>
                                    <Typography variant='body2' sx={{ mt: 1, display: "inline-block", position: "relative", top: "-2px", marginRight: "5px" }}>
                                    {propertyData?.brokerDetais?.rating && propertyData?.brokerDetais?.rating}
                                    </Typography>
                                    <Rating
                                        name="half-rating"
                                        {...propertyData?.brokerDetais?.rating}
                                        precision={0.5}
                                        value={propertyData?.brokerDetais?.rating}
                                        defaultValue={propertyData?.brokerDetais?.rating}
                                        size="small"
                                        readOnly
                                        sx={{ alignSelf: "center", fontSize: { xs: '0.75rem !important', sm: '0.875rem !important' } }}
                                    />
                                    </Box>
                                    
                                </Box>
                                    
                                <Box sx={{ display: { xs: 'block', evmd: 'none' } }}>
                                        {/* <Typography variant='subtitle2'>
                                            {`${capitalLizeName(propertyData?.overview?.builder || "builder")}  | ${capitalLizeName(propertyData?.overview?.projectName|| "projectName")} | ${locationData?.city || 'Godrejforest'} | ${locationData?.sector || 'Sector'}`}
                                        </Typography> */}
                                        <Box sx={{ display: 'flex' }}>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography variant='h6' sx={{ flex: 1, alignSelf: 'center', marginRight: "5px" }}>
                                                    {name}
                                                </Typography>
                                                    <Typography variant='subtitle2'>
                                                        <a href={`tel:${phoneNumber}`}>
                                                            <Chip icon={<PhoneIcon />} label={phoneNumber} size='small' />
                                                        </a>
                                                    </Typography>
                                                    <Box>
                                                    <Typography variant='subtitle2' sx={{ mt: 1, display: "inline-block", position: "relative", top: "-2px", marginRight: "5px" }}>
                                                        {propertyData?.brokerDetais?.rating && propertyData?.brokerDetais?.rating} 
                                                    </Typography>
                                                    <Rating
                                                        name="half-rating"
                                                        {...propertyData?.brokerDetais?.rating}
                                                        precision={0.5}
                                                        value={propertyData?.brokerDetais?.rating}
                                                        defaultValue={propertyData?.brokerDetais?.rating}
                                                        size="small"
                                                        readOnly
                                                        sx={{ alignSelf: "center", fontSize: { xs: '0.75rem !important', sm: '0.875rem !important' } }}
                                                    />
                                                    </Box>
                                                </Box>
                                            {/* <Box sx={{ display: 'flex' }}> */}
                                            {/* <Typography variant='subtitle2'>
                                                {`${propertyData?.overview?.builder}  | ${capitalLizeName(propertyData?.overview?.projectName)} | ${locationData?.city || 'Godrejforest'} | ${locationData?.sector || 'Sector'}`}
                                            </Typography> */}
                                                {/* <Box sx={{ textAlign: 'center', alignSelf: 'center', display: { xs: "block", evmd: 'none' } }}>
                                                    {propertyData?.isActiveAd ? 
                                                        <Button  sx={{
                                                            border: `2px solid ${colors.BLUE}`,
                                                            mr: 1,
                                                            '&:hover': {
                                                                backgroundColor: "inherit",
                                                                border: "2px solid gold",
                                                            }
                                                        }} disabled variant='outlined' size="small" startIcon={<DoneIcon />}>
                                                            Activated
                                                        </Button> 
                                                        : 
                                                        <Button sx={{ color: "#000", border: "2px solid gold",  '&:hover': {
                                                            backgroundColor: "inherit",
                                                            border: "2px solid gold",
                                                        }}} onClick={() => handleOpenActivateAdsPopup(propertyUrl)} variant='outlined' size="small" startIcon={<DoneIcon />}>
                                                            Activate link
                                                        </Button>
                                                        }
                                                </Box> */}
                                            {/* </Box> */}
                                        </Box>
                                    </Box>



                                <Box sx={{ display: 'flex'}}>
                                    <Box sx={{textAlign: 'center', alignSelf: 'start', display: { xs: "block", evmd: 'block' } }}>
                                        {propertyData?.isActiveAd ?
                                            <Button  sx={{
                                                border: `2px solid ${colors.BLUE}`,
                                                fontSize: "14px", padding: "3px 5px",
                                                color: "#000", '&:hover': {
                                                    backgroundColor: "inherit",
                                                    border: `2px solid ${colors.BLUE}`,
                                                }
                                                }} variant='outlined' startIcon={<DoneIcon />} disabled>
                                                Activated
                                            </Button>
                                        : 
                                            <Button sx={{ color: "#000", border: "2px solid gold", fontSize: "14px", padding: "3px 5px", '&:hover': {
                                                backgroundColor: "inherit",
                                                border: "2px solid gold",
                                            } }} onClick={() => handleOpenActivateAdsPopup(propertyUrl)} variant='outlined' size="small" startIcon={<DoneIcon />} >
                                                Activate link
                                            </Button>
                                        }
                                        {/* <Button variant='contained' startIcon={<Phone />} sx={{ mb: 1 }}>
                        Call First
                    </Button>
                    <Button startIcon={<GoogleIcon />} variant='contained' sx={{ mb: 1 }}>
                        Log in
                    </Button> */}
                                        <div><Typography variant='body2' sx={{ marginTop: '5px'}}>Get leads</Typography></div>
                                        {/* <div><Typography variant="body2" sx={{ lineHeight: '1.3', marginTop: '5px'}}>{SinglePropertyId?.expired_at ? formatDateAndDaysRemaining(SinglePropertyId?.expired_at) : "Get customer enquiries" }</Typography></div> */}
                                    </Box>

                                    <Box sx={{ alignSelf: 'start'}}>
                                        <IconButton onClick={handleClick} sx={{ padding: "0"}}>
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

                                        <MenuItem onClick={() => handleOpenActivateAdsPopup(propertyUrl)}><AddLinkIcon sx={{ fontSize: "20px", marginRight: "10px"}}/> {propertyData?.isActiveAd ? "Extend" : "Activate link"} </MenuItem>
                                        <MenuItem onClick={() => copyToClipboard(propertyUrl)}><ShareIcon sx={{ fontSize: "18px", marginRight: "10px"}} /> Share</MenuItem>
                                    </Menu>
                                </Box>
                            
                                
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Box
            className="detailFab"
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