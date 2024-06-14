import React from "react";
import {
  Grid,
  Card,
  Typography,
  Box,
  Divider,
  Chip,
  Button
} from "@mui/material";
import { useRouter } from "next/navigation";
import colors from "styles/theme/colors";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EnquireNow from "./Modal/EnquireNow";
import { useAuth } from "utills/AuthContext";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import { companyName } from "Components/NavBar/Links";

function OverallAssesmentSection({
  refCallback,
  overallAssessment,
  handleOpenEnquiryForm,
  open,
  handleSubmitEnquiry,
  handleClose,
  handleAction,
  AllPropertyData,
  submitEnquiryUnath,
  isUnique = false
}) {
  const { userDetails, isLogged } = useAuth();
  const router = useRouter();
  return (
    <Grid item xs={12} ref={refCallback} id="assesment">
      <Card sx={{ pb: "40px"}}>
        <Box sx={{ p: 2, display: "flex" }}>
          <Typography variant="h4" sx={{ flex: 1, alignSelf: "center" }}>
            Overall assesment
          </Typography>
          {/* <Box sx={{ alignSelf: "center" }}>
            <Card
              sx={{
                width: "fit-content",
                backgroundColor: colors?.BLACK,
                borderRadius: "4px !important",
                m: 0,
                ml: "auto !important",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  width: "fit-content",
                  color: "white",
                  p: 0.5,
                  px: 1,
                  cursor: "pointer",
                }}
              >
                {overallAssessment?.score
                  ? overallAssessment?.score.toFixed()
                  : "00"}
              </Typography>
            </Card>
          </Box> */}
        </Box>
        <Divider />

        <Box sx={{ p: 2, textAlign: "center" }}>
          {AllPropertyData?.overview?.projectName && (
            <>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {AllPropertyData?.overview?.builder} {AllPropertyData?.overview?.projectName}
              </Typography>
              <Typography variant='body2'>has scored</Typography>
            </>
          )}
          <Box
            sx={{
              display: "flex",
              width: "fit-content",
              margin: "auto",
            }}
          >
            <Typography variant="h1" sx={{ mr: 1, fontWeight: 600 }}>{overallAssessment?.score}</Typography>
            <Typography variant="h5" sx={{ alignSelf: "center" }}>
              {' / 100'}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ margin: "10px 0"}}>
            Our authorized real estate consultants help you to take a better decide as
            an Investor / End user. Know more about Builder, Project, Layouts and Plans
          </Typography>
          
          <Box sx={{ mt: 1 }}>
          {userDetails?.role !== "broker" && userDetails?.role !== "admin" && userDetails?.role !== "superAdmin" && (<>
            {isLogged && !isUnique && <Button variant="outlined" onClick={() => { window.open('http://wa.me/+919323996997', "_blank") }} startIcon={<WhatsAppIcon sx={{ position: 'relative', top: '-2px'}} />} sx={{
                marginRight: "10px"}}>WhatsApp</Button> }
            <Button variant="contained" onClick={handleOpenEnquiryForm} startIcon={<CallIcon />}>Get a Call back</Button></>)}
            {/* <Chip label="WhatsApp" className="customBtn" onClick={() => { router.push('http://wa.me/+919323996997') }} icon={<WhatsAppIcon fontSize="small" />}
              sx={{
                marginRight: "10px"
                // background: colors.GRADIENT,
                // color: colors?.BLACK,
                // '& .MuiChip-icon': {
                //   color: colors?.BLACK,
                // },
                // '& .MuiChip-label': {
                //   color: colors?.BLACK,
                // },
                // '&:hover': {
                //   background: colors.GRADIENT,
                // },

                // animation: 'floatAnimation 2s ease-in-out infinite', // Apply floating animation
                // '@keyframes floatAnimation': {
                //   '0%': {
                //     transform: 'translateY(0)',
                //   },
                //   '50%': {
                //     transform: 'translateY(-5px)', // Adjust the float height
                //   },
                //   '100%': {
                //     transform: 'translateY(0)',
                //   },
                // },
              }} />
              <Chip label="Get a Call back" className="customBtn" onClick={() => { router.push('http://wa.me/+919323996997') }} icon={<CallIcon fontSize="small" />}
              /> */}
            {/* {userDetails?.role === "user" && (
              <Chip
                sx={{ ml: 2 }}
                color='primary'
                icon={<AssignmentIcon />}
                label="Enquire now"
                size="small"
                onClick={handleOpenEnquiryForm}
              />
            )} */}
          </Box>
        </Box>
        {open && <EnquireNow
          open={open}
          handleClose={handleClose}
          handleAction={handleAction}
          submitEnquiry={handleSubmitEnquiry}
          submitEnquiryUnath={submitEnquiryUnath}
        />}
        <Divider />
        <Box sx={{ p: 1 }}>
          <Typography
            variant="subtitle2"
            style={{ fontSize: "0.675rem", alignSelf: "center", lineHeight: 'normal', color: 'gray' }}
          >
            <i>
              Disclaimer: The property score is provided by {companyName} is for informational purposes only
              and should not only be relied upon for any financial or investment decisions.
            </i>
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
}

export default OverallAssesmentSection;
