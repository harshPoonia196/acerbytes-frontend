import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Toolbar,
  Typography,
  Rating,
  Tooltip,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import React, { useEffect, useState } from "react";
import colors from "styles/theme/colors";
import PhoneIcon from "@mui/icons-material/Phone";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import { useAuth } from "utills/AuthContext";
import GoogleIcon from "@mui/icons-material/Google";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { countryCodeFormating } from "utills/utills";
import { ToasterMessages, boxShadowTop } from "utills/Constants";
import Phone from "@mui/icons-material/Phone";
import DoneIcon from "@mui/icons-material/Done";
import { capitalLizeName, formatDateAndDaysRemaining } from "utills/CommonFunction";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddLinkIcon from '@mui/icons-material/AddLink';
import ShareIcon from '@mui/icons-material/Share';
import { useSnackbar } from "utills/SnackbarContext";

function UserDetailsAd({
  AllPropertyData,
  contactPermissionToView,
  handleOpenEnquiryForm,
  isUnique = false,
  handleOpenActivateAdsPopup
}) {
  const { userDetails, isLoggedIn } = useAuth();
  const overviewData = AllPropertyData?.propertyData?.overview;
  const [showContact, setShowContact] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const brokerData = AllPropertyData?.brokerData;
  const locationData = AllPropertyData?.propertyData.location;
  const phoneNumber =
    brokerData?.phone?.countryCode && brokerData?.phone?.number
      ? `${countryCodeFormating(brokerData.phone.countryCode)} ${brokerData.phone.number
      }`
      : `${countryCodeFormating(userDetails?.phone?.countryCode)}  ${userDetails?.phone?.number
      }`;

  const name =
    brokerData?.name?.firstName && brokerData?.name?.lastName
      ? `${brokerData.name.firstName}  ${brokerData?.name?.lastName}`
      : `${userDetails?.name?.firstName}  ${userDetails?.name?.lastName}`;
  const city = locationData?.city ? locationData.city : "city";
  const sector = locationData?.sector ? locationData.sector : "sector";
  const area = locationData?.area ? locationData.area : "area";
  const projectName = overviewData?.projectName
    ? overviewData.projectName
    : "projectName";
  const builder = overviewData?.builder ? overviewData.builder : "builder";

  const handleViewContactClick = () => {
    if (!contactPermissionToView) {
      handleOpenEnquiryForm();
    } else {
      setShowContact(!showContact);
    }
  };

  useEffect(() => {
    if (contactPermissionToView) {
      setShowContact(contactPermissionToView ? true : false);
    }
  }, [contactPermissionToView, showContact]);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

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

  const constructPropertyUrl = (property) => {
    const overview = property?.overview;
    const location = property?.location;
    const brokerId = property?.propertyBroker?.[0]?._id ?? 'defaultBrokerId'

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

    let url = `${baseUrl}/${projectCategory}-${projectType}-${city}-${sector}-${area}-${projectName}`;

    if (userDetails?.role === "broker" && AllPropertyData?.isActiveAd) {
      const expireTime = formatDateAndDaysRemaining(AllPropertyData?.propertyBroker?.[0]?.expired_at, 'long')
      url += `-${expireTime}`;
    }
    url += `-${brokerId}`;

    return url;

  };


  const propertyUrl = constructPropertyUrl(AllPropertyData)


  return (
    <Box>
      <Box sx={{ position: "fixed", bottom: 0, left: "-3px", width: "100%" }}>
        <Container
          maxWidth="md"
          sx={{
            p: { xs: "0 !important", md: "16px !important" },
            pb: { md: "0 !important" },
            pt: { xs: "0 !important" }
          }}
        >
          <Box sx={{

            p: 2,
            background: "ghostwhite",
            boxShadow: boxShadowTop,
            borderTop: `2px solid ${colors.BLUE}`
          }}>
            <Box>
              <Typography variant="body2" sx={{ marginBottom: "3px" }}>
                {capitalLizeName(builder)} | {capitalLizeName(projectName)} | {sector} | {area} | {city}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex" }}
            >
              <Avatar
                src={AllPropertyData?.brokerProfilePic?.profilePicture}
                sx={{
                  height: { md: 40 },
                  width: { md: 40 },
                  fontSize: { xs: "0.75rem", md: "1rem" },
                }}
              ></Avatar>
              <Box sx={{ display: 'flex', justifyContent: "space-between", ml: 2, flex: 1 }}>
                <Box sx={{ display: { xs: "none", md: "block" } }}>

                  <Typography variant="h6" sx={{ display: "inline-block", marginRight: "5px" }}>{name}</Typography>
                  {!isLoggedIn && <a href={`tel:${phoneNumber}`}>
                    <Chip icon={<PhoneIcon />} label={phoneNumber} size="small" />
                  </a>}

                  <Box>
                    <Typography variant="body2" sx={{ mt: 1, display: "inline-block", position: "relative", top: "-2px", marginRight: "3px" }}>
                      {AllPropertyData?.brokerRating?.rating && AllPropertyData?.brokerRating?.rating}
                    </Typography>

                    {AllPropertyData?.brokerRating?.rating && (<Rating
                      name="half-rating"
                      {...AllPropertyData?.brokerRating?.rating}
                      precision={0.5}
                      defaultValue={AllPropertyData?.brokerRating?.rating}
                      value={AllPropertyData?.brokerRating?.rating}
                      readOnly
                      size="small"
                      sx={{ alignSelf: "center", fontSize: { xs: '0.75rem !important', sm: '0.875rem !important' } }}
                    />)}
                  </Box>
                </Box>
                <Box sx={{ display: { xs: "block", md: "none" } }}>
                  {/* <Typography variant="subtitle2">
                  {capitalLizeName(builder)} | {capitalLizeName(projectName)} | {city} | {sector}
                </Typography> */}
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ display: "inline-block", marginRight: "5px" }}>{name}</Typography>
                      {!isLoggedIn && <a href={`tel:${phoneNumber}`}>
                        <Chip
                          icon={<PhoneIcon />}
                          label={phoneNumber}
                          size="small"
                        />
                      </a>}

                      <Box>
                        <Typography variant="body2" sx={{ mt: 1, display: "inline-block", position: "relative", top: "-2px", marginRight: "3px" }}>
                          {AllPropertyData?.brokerRating?.rating && AllPropertyData?.brokerRating?.rating}
                        </Typography>
                        {AllPropertyData?.brokerRating?.rating && (<Rating
                          name="half-rating"
                          {...AllPropertyData?.brokerRating?.rating}
                          precision={0.5}
                          value={AllPropertyData?.brokerRating?.rating}
                          defaultValue={AllPropertyData?.brokerRating?.rating}
                          readOnly
                          size="small"
                          sx={{ alignSelf: "center", fontSize: { xs: '0.75rem !important', sm: '0.875rem !important' } }}
                        />)}
                      </Box>
                    </Box>
                    {isLoggedIn && userDetails.role === 'broker' && <Box
                      sx={{
                        textAlign: { xs: "start", md: "end" },
                        alignSelf: { xs: "start", md: "end" },
                        display: { xs: "block", md: "none" },
                      }}
                    >
                      {/* <Button
                      variant="contained"
                      size="small"
                      startIcon={<DoneIcon />}
                      disabled
                      sx={{}}
                    >
                      Activated
                    </Button> */}
                      {/* <Button variant='contained' startIcon={<Phone />} sx={{ mb: 1 }}>
                Call First
              </Button>
              <Button startIcon={<GoogleIcon />} variant='contained' sx={{ mb: 1 }}>
                Log in
              </Button> */}
                    </Box>}
                  </Box>
                </Box>

                {
                  userDetails?.role === "broker" && AllPropertyData?.broker_id === userDetails?._id &&
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ textAlign: 'center', alignSelf: 'start', display: { xs: "block", evmd: 'block' } }}>
                      {true ?
                        <>
                          <Button sx={{
                            border: `2px solid ${colors.BLUE}`,
                            fontSize: "14px", padding: "3px 5px",
                            color: "#000", '&:hover': {
                              // backgroundColor: "inherit",
                              border: `2px solid ${colors.BLUE}`,
                            }
                          }} variant='outlined' startIcon={<DoneIcon />} disabled>
                            Activated
                          </Button>
                        </>
                        :
                        <Button sx={{
                          color: "#000", border: "2px solid gold", fontSize: "14px", padding: "3px 5px", '&:hover': {
                            backgroundColor: "#fffade",
                            border: "2px solid gold",
                          }
                        }} onClick={() => handleOpenActivateAdsPopup(propertyUrl)} variant='outlined' size="small" startIcon={<AddLinkIcon />} >
                          Activate link
                        </Button>
                      }
                      <div><Typography variant='body2' sx={{ marginTop: '5px' }}>Get leads</Typography></div>
                      <div><Typography variant="body2" sx={{ lineHeight: '1.3', marginTop: '5px' }}>{AllPropertyData?.propertyBroker?.[0]?.expired_at ? formatDateAndDaysRemaining(AllPropertyData?.propertyBroker?.[0]?.expired_at, "short") : "Get customer enquiries"}</Typography></div>
                    </Box>
                    {true &&
                      <Box sx={{ alignSelf: 'start' }}>
                        <Tooltip title="More">
                          <IconButton onClick={handleClick} sx={{ padding: "0" }}>
                            <MoreVertIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    }
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={() => handleOpenActivateAdsPopup(propertyUrl)}><AddLinkIcon sx={{ fontSize: "20px", marginRight: "10px" }} /> {true ? "Extend" : "Activate link"} </MenuItem>
                      {true ? (
                        <MenuItem onClick={() => copyToClipboard(propertyUrl)}><ShareIcon sx={{ fontSize: "18px", marginRight: "10px" }} /> Share</MenuItem>
                      ) : (
                        <MenuItem sx={{ cursor: 'not-allowed' }}><ShareIcon sx={{ fontSize: "18px", marginRight: "10px" }} /> Share</MenuItem>
                      )}
                    </Menu>
                  </Box>
                }


              </Box>
              <Box
                sx={{
                  textAlign: "center",
                  alignSelf: "start",
                  display: { md: "block" },
                }}
              >
                {isLoggedIn && userDetails.role === "user" && <>

                  <Chip
                    icon={showContact ? null : <PhoneIcon />}
                    label={showContact ? <a href={`tel:${phoneNumber}`}>{phoneNumber}</a> : "View Contact"}
                    size="small"
                    onClick={handleViewContactClick}
                    sx={{ marginLeft: "5px" }}
                  />

                </>
                }
                {/* <Button variant='contained' startIcon={<Phone />} sx={{ mb: 1 }}>
                Call First
              </Button>
              <Button startIcon={<GoogleIcon />} variant='contained' sx={{ mb: 1 }}>
                Log in
              </Button> */}
                {/* <p style={{ fontSize: "0.75rem" }}>26 days remaining</p> */}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <Card sx={{ border: `2px solid ${colors.BLUE}`, display: "none" }}>
        <Box
          sx={{
            display: "flex",
            p: 1,
            px: 2,
            gap: 1,
            background: "aliceblue",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box sx={{ display: "flex", flex: 1 }}>
            <AccountCircle fontSize="small" sx={{ mr: 1 }} />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex" }}>
                <Typography variant="h5" sx={{ flex: 1 }}>
                  {name}
                </Typography>
                {isLoggedIn && userDetails.role === "user" && <Box>

                  <Chip
                    icon={showContact ? null : <PhoneIcon />}
                    label={showContact ? <a href={`tel:${phoneNumber}`}>{phoneNumber}</a> : "View Contact"}
                    size="small"
                    onClick={handleViewContactClick}
                  />

                </Box>}
              </Box>
              <Typography variant="h6">
                {builder}&#183;{projectName}&#183;{city}&#183;{sector}&#183;
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ borderColor: "whitesmoke" }} />
      </Card>
    </Box>
  );
}
export default UserDetailsAd;
