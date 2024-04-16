import React from "react";
import {
  Grid,
  Card,
  Typography,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import colors from "styles/theme/colors";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EnquireNow from "./Modal/EnquireNow";
import { useAuth } from "utills/AuthContext";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function OverallAssesmentSection({
  refCallback,
  overallAssessment,
  handleOpenEnquiryForm,
  open,
  handleSubmitEnquiry,
  handleClose,
  handleAction,
  AllPropertyData,
}) {
  const { userDetails } = useAuth();
  const router = useRouter();

  return (
    <Grid item xs={12} ref={refCallback} id="assesment">
      <Card>
        <Box sx={{ p: 2, display: "flex" }}>
          <Typography variant="h4" sx={{ flex: 1, alignSelf: "center" }}>
            Overall assesment
          </Typography>
          <Box sx={{ alignSelf: "center" }}>
            <Card
              sx={{
                width: "fit-content",
                backgroundColor: colors?.BLACK,
                borderRadius: "4px !important",
                m: 0,
                ml: "auto !important",
              }}
              onClick={() => router.push("/research")}
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
          </Box>
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
            <Typography variant="h1" sx={{ mr: 1 }}>{overallAssessment?.score}</Typography>
            <Typography variant="h5" sx={{ alignSelf: "center" }}>
              {' / 100'}
            </Typography>
          </Box>
          <Typography variant="body2" >
            Our authorized professional consultants help you decide whether to
            buy as Investor / End user.
          </Typography>
          <Chip label="Contact us now" icon={<WhatsAppIcon />} size='small' sx={{ mt: 1 }} />
          {userDetails?.role === "user" && (
            <Chip
              sx={{ mt: 2 }}
              color='primary'
              icon={<AssignmentIcon />}
              label="Enquire now"
              size="small"
              onClick={handleOpenEnquiryForm}
            />
          )}
        </Box>
        {open && <EnquireNow
          open={open}
          handleClose={handleClose}
          handleAction={handleAction}
          submitEnquiry={handleSubmitEnquiry}
        />}
        <Divider />
        <Box sx={{ p: 1, display: "flex" }}>
          <Chip label="Disclaimer" size="small" />
          &nbsp;&nbsp;
          <Typography
            variant="subtitle2"
            style={{ fontSize: "0.75rem", alignSelf: "center" }}
          >
            AcresByte.com acts as a inside research and marketing
            platform, doesnt take any responsibility on the accuracy
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
}

export default OverallAssesmentSection;
