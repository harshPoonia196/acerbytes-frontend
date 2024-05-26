import { Avatar, Box, Button, Card, Chip, Container, Divider, Toolbar, Typography } from "@mui/material";
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
import { boxShadowTop } from "utills/Constants";
import Phone from "@mui/icons-material/Phone";
import DoneIcon from '@mui/icons-material/Done';

function UserDetailsAd({ AllPropertyData, contactPermissionToView, handleOpenEnquiryForm }) {
  const { userDetails } = useAuth();
  const overviewData = AllPropertyData?.propertyData?.overview
  const [showContact, setShowContact] = useState(false);

  const brokerData = AllPropertyData?.brokerData;
  const locationData = AllPropertyData?.propertyData.location;
  const phoneNumber =
    brokerData?.phone?.countryCode && brokerData?.phone?.number
      ? `${countryCodeFormating(brokerData.phone.countryCode)} ${brokerData.phone.number}`
      : `${countryCodeFormating(userDetails?.phone?.countryCode)}  ${userDetails?.phone?.number}`;

  const name =
    brokerData?.name?.firstName && brokerData?.name?.lastName
      ? `${brokerData.name.firstName}  ${brokerData?.name?.lastName}`
      : `${userDetails?.name?.firstName}  ${userDetails?.name?.lastName}`;
  const city = locationData?.city ? locationData.city : "Godrejforest";
  const sector = locationData?.sector ? locationData.sector : "Sector";
  const pinCode = locationData?.pinCode ? locationData.pinCode : "132";
  const state = locationData?.state ? locationData.state : "Noida";
  const projectName = overviewData?.projectName ? overviewData.projectName : "";

  const description = AllPropertyData?.description
    ? `${AllPropertyData?.description}`
    : "Our commitment to addressing escalating environmental issues led us to develop a sustainability strategy which creates long-term value for all our stakeholders, including the planet we live on";
  const handleViewContactClick = () => {
    if (!contactPermissionToView) {
      handleOpenEnquiryForm();
    } else {
      setShowContact(!showContact)
    }
  }

  useEffect(() => {
    if (contactPermissionToView) {
      setShowContact(contactPermissionToView ? true : false);
    }
  }, [contactPermissionToView, showContact])

  return (
    <Box>
      <Box sx={{ position: 'fixed', bottom: 0, width: '100%', }}>
        <Container maxWidth='md' sx={{ p: { xs: '0 !important', md: '16px !important' }, pb: { md: '0 !important' } }}>
          <Box sx={{ display: 'flex', p: 2, background: 'white', boxShadow: boxShadowTop }}>
            <Avatar src="" sx={{ height: { xs: 24, md: 40 }, width: { xs: 24, md: 40 }, fontSize: { xs: '0.75rem', md: '1rem' } }}>FD</Avatar>
            <Box sx={{ ml: 2, flex: 1 }}>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Typography variant='h6'>
                  first last | Project name | Noida
                </Typography>
                <Box>
                  <Typography variant='h6'>
                    +91 9625555559
                  </Typography>
                  <Typography variant='h6' sx={{ mt: 1 }}>
                    4.5 | 12 ratings
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Typography variant='subtitle2'>
                  first last | Project name | Noida
                </Typography>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant='subtitle2'>
                      +91 9625555559
                    </Typography>
                    <Typography variant='subtitle2' sx={{ mt: 1 }}>
                      4.5 | 12 ratings
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'end', alignSelf: 'end', display: { xs: "block", md: 'none' } }}>
                    <Button variant='contained' size="small" startIcon={<DoneIcon />} disabled sx={{}}>
                      Activated
                    </Button>
                    {/* <Button variant='contained' startIcon={<Phone />} sx={{ mb: 1 }}>
                Call First
              </Button>
              <Button startIcon={<GoogleIcon />} variant='contained' sx={{ mb: 1 }}>
                Log in
              </Button> */}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'end', alignSelf: 'end', display: { xs: "none", md: 'block' } }}>
              <Button variant='contained' startIcon={<DoneIcon />} disabled sx={{ mb: 1 }}>
                Activated
              </Button>
              {/* <Button variant='contained' startIcon={<Phone />} sx={{ mb: 1 }}>
                Call First
              </Button>
              <Button startIcon={<GoogleIcon />} variant='contained' sx={{ mb: 1 }}>
                Log in
              </Button> */}
              <p style={{ fontSize: '0.75rem' }}>26 days remaining</p>
            </Box>
            <Box sx={{ textAlign: 'end', alignSelf: 'center' }}>

            </Box>
          </Box>
        </Container>
      </Box>
      <Card sx={{ border: `2px solid ${colors.BLUE}`, display: 'none' }}>
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
          <Box sx={{ display: 'flex', flex: 1, }}>
            <AccountCircle fontSize='small' sx={{ mr: 1 }} />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex' }}>
                <Typography variant='h5' sx={{ flex: 1 }}>
                  {name}
                </Typography>
                <Box>
                  <Chip icon={showContact ? null : <PhoneIcon />}
                    label={showContact ? phoneNumber : "View Contact"}
                    size='small' onClick={handleViewContactClick} />
                </Box>
              </Box>
              <Typography variant='h6'>{projectName}&#183;{city}&#183;{sector}&#183;
                {state}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'whitesmoke' }} />
        <Typography variant="body2" sx={{ p: 2, py: 1 }}>
          {description}
        </Typography>
      </Card>
    </Box>
  );
}
export default UserDetailsAd;
