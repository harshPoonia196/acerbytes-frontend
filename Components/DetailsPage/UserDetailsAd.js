import { Box, Button, Card, Chip, Divider, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import React, { useEffect, useState } from "react";
import colors from "styles/theme/colors";
import PhoneIcon from "@mui/icons-material/Phone";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import { useAuth } from "utills/AuthContext";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { countryCodeFormating } from "utills/utills";

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
    <Box sx={{ m: 2, mb: 0 }}>
      <Card sx={{ border: `2px solid ${colors.BLUE}` }}>
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
