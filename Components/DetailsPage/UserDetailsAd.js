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
import { boxShadowTop } from "utills/Constants";
import Phone from "@mui/icons-material/Phone";
import DoneIcon from "@mui/icons-material/Done";
import { capitalLizeName } from "utills/CommonFunction";

function UserDetailsAd({
  AllPropertyData,
  contactPermissionToView,
  handleOpenEnquiryForm,
}) {
  const { userDetails } = useAuth();
  const overviewData = AllPropertyData?.propertyData?.overview;
  const [showContact, setShowContact] = useState(false);

  const brokerData = AllPropertyData?.brokerData;
  const locationData = AllPropertyData?.propertyData.location;
  const phoneNumber =
    brokerData?.phone?.countryCode && brokerData?.phone?.number
      ? `${countryCodeFormating(brokerData.phone.countryCode)} ${
          brokerData.phone.number
        }`
      : `${countryCodeFormating(userDetails?.phone?.countryCode)}  ${
          userDetails?.phone?.number
        }`;

  const name =
    brokerData?.name?.firstName && brokerData?.name?.lastName
      ? `${brokerData.name.firstName}  ${brokerData?.name?.lastName}`
      : `${userDetails?.name?.firstName}  ${userDetails?.name?.lastName}`;
  const city = locationData?.city ? locationData.city : "city";
  const sector = locationData?.sector ? locationData.sector : "sector";
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

  return (
    <Box>
      <Box sx={{ position: "fixed", bottom: 0, width: "100%" }}>
        <Container
          maxWidth="md"
          sx={{
            p: { xs: "0 !important", md: "16px !important" },
            pb: { md: "0 !important" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              p: 2,
              background: "white",
              boxShadow: boxShadowTop,
              border: `2px solid ${colors.BLUE}`,
            }}
          >
            <Avatar
              src={AllPropertyData?.brokerProfilePic?.profilePicture}
              sx={{
                height: { xs: 24, md: 40 },
                width: { xs: 24, md: 40 },
                fontSize: { xs: "0.75rem", md: "1rem" },
              }}
            ></Avatar>
            <Box sx={{ ml: 2, flex: 1 }}>
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Box>
                  <Typography variant="h6">
                    {capitalLizeName(builder)} | {capitalLizeName(projectName)} | {city} | {sector}
                  </Typography>
                </Box>
                <Typography variant="h6">{name}</Typography>
                <a href={`tel:${phoneNumber}`}>
                  <Chip icon={<PhoneIcon />} label={phoneNumber} size="small" />
                </a>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  {AllPropertyData?.brokerRating?.rating} rating
                </Typography>
              </Box>
              <Box sx={{ display: { xs: "block", md: "none" } }}>
                <Typography variant="subtitle2">
                  {capitalLizeName(builder)} | {capitalLizeName(projectName)} | {city} | {sector}
                </Typography>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">{name}</Typography>
                  <a href={`tel:${phoneNumber}`}>
                    <Chip
                      icon={<PhoneIcon />}
                      label={phoneNumber}
                      size="small"
                    />
                  </a>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {AllPropertyData?.brokerRating?.rating} rating
                  </Typography>
                  <Box
                    sx={{
                      textAlign: "end",
                      alignSelf: "end",
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<DoneIcon />}
                      disabled
                      sx={{}}
                    >
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
            <Box
              sx={{
                textAlign: "center",
                alignSelf: "center",
                display: { xs: "none", md: "block" },
              }}
            >
              <Chip
                icon={showContact ? null : <PhoneIcon />}
                label={showContact ? phoneNumber : "View Contact"}
                size="small"
                onClick={handleViewContactClick}
              />
              {/* <Button variant='contained' startIcon={<Phone />} sx={{ mb: 1 }}>
                Call First
              </Button>
              <Button startIcon={<GoogleIcon />} variant='contained' sx={{ mb: 1 }}>
                Log in
              </Button> */}
              {/* <p style={{ fontSize: "0.75rem" }}>26 days remaining</p> */}
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
                <Box>
                  <Chip
                    icon={showContact ? null : <PhoneIcon />}
                    label={showContact ? phoneNumber : "View Contact"}
                    size="small"
                    onClick={handleViewContactClick}
                  />
                </Box>
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
