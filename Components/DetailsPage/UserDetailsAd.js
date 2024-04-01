import { Box, Button, Card, Rating, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import React, { useState } from "react";
import colors from "styles/theme/colors";
import PhoneIcon from "@mui/icons-material/Phone";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import { useAuth } from "utills/AuthContext";
import CloseIcon from "@mui/icons-material/Close";

function UserDetailsAd({ AllPropertyData, contactPermissionToView }) {
  const { userDetails } = useAuth();
  const overviewData = AllPropertyData?.propertyData?.overview
  const [showContact, setShowContact] = useState(false);

  const brokerData = AllPropertyData?.brokerData;
  const locationData = AllPropertyData?.propertyData.location;
  const phoneNumber =
    brokerData?.phone?.countryCode && brokerData?.phone?.number
      ? `${brokerData.phone.countryCode} ${brokerData.phone.number}`
      : `${userDetails?.phone?.countryCode}  ${userDetails?.phone?.number}`;

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
          <Box sx={{ display: "flex", flex: 1, alignSelf: "center" }}>
            <Typography variant="h5" sx={{}}>
              Contact ({name} &#183; 4.7&nbsp;
              <Rating
                name="text-feedback"
                value={4}
                readOnly
                precision={0.5}
                sx={{
                  fontSize: "1rem",
                  alignSelf: "center",
                  verticalAlign: "baseline",
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              ) for {projectName} &#183; {city} &#183; {sector} &#183; {pinCode} &#183; {state}
            </Typography>
          </Box>
          <Box sx={{ alignSelf: { xs: "end", sm: "center" } }}>
            {/* <a href={`tel:${phoneNumber}`}>
              <CustomButton
                variant="outlined"
                startIcon={<PhoneIcon />}
                size="small"
                sx={{ fontSize: "0.875rem" }}
                ButtonText={phoneNumber}
              />
            </a> */}
            <Button
              variant="outlined"
              disabled={!contactPermissionToView}
              startIcon={showContact ? <CloseIcon /> : <PhoneIcon />}
              onClick={() => setShowContact(!showContact)}
            >
              {showContact ? phoneNumber : "View Contact"}
            </Button>
          </Box>
        </Box>
        <Typography variant="body2" noWrap sx={{ p: 2, py: 1 }}>
          {description}
        </Typography>
      </Card>
    </Box>
  );
}
export default UserDetailsAd;
