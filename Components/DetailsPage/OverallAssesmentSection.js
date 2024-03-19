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

function OverallAssesmentSection({
  refCallback,
  overallAssessment,
  handleOpenEnquiryForm,
  open,
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
            <Typography variant="body1">
              {AllPropertyData?.overview?.projectName} project has scored
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              width: "fit-content",
              margin: "auto",
            }}
          >
            <Typography variant="h1">{overallAssessment?.score}</Typography>
            <Typography variant="h5" sx={{ alignSelf: "center" }}>
              /100
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Our authorized professional consultants help you decide whether to
            buy as Investor / End user. Contact us now
          </Typography>
          {userDetails?.role !== "admin" &&
            userDetails?.role !== "superAdmin" && (
              <Chip
                icon={<AssignmentIcon />}
                label="Enquire now"
                size="small"
                onClick={handleOpenEnquiryForm}
              />
            )}
        </Box>
        <EnquireNow
          open={open}
          handleClose={handleClose}
          handleAction={handleAction}
        />
        <Divider />
        <Box sx={{ p: 1, display: "flex" }}>
          <Chip label="Disclaimer" size="small" />
          <Typography
            variant="subtitle2"
            style={{ fontSize: "0.6rem", alignSelf: "center" }}
          >
            &nbsp;&nbsp;AcresByte.com acts as a inside research and marketing
            platform, doesnt take any responsibility on the accuracy
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
}

export default OverallAssesmentSection;
