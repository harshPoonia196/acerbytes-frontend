import {
  Button,
  Grid,
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";
import OtpInput from "react-otp-input";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DoneIcon from "@mui/icons-material/Done";
import OTPInputLayout from "Components/CommonLayouts/OTPInputLayout";
import colors from "styles/theme/colors";
import { clearItem } from "utills/utills";
import { enquiryFormKey } from "utills/Constants";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";

function OtpVerify({
  open,
  handleClose,
  handleOpen,
  handleAlternateSignIn,
  formData,
  handleSubmit
}) {
  const [otp, setOtp] = useState("");

  const [isVerified, setIsVerified] = useState(false);

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }}
      open={open}
      onClose={() => {
        clearItem(enquiryFormKey);
        handleClose();
      }}
    >
      <DialogTitle onClose={handleClose}>
        {isVerified ? (
          <>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Thanks, <span style={{ color: "gray" }}>you are verified</span>
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Mobile verification,
              <span style={{ color: "gray" }}> enter OTP</span>
            </Typography>
            <Typography variant="body1">
              This is to ensure we connect with intended Customer only
            </Typography>
          </>
        )}
      </DialogTitle>
      <DialogContent>
        {isVerified ? (
          <Typography variant="body1">
            Our team will connect with you shortly
          </Typography>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: "flex" }}>
              <Box sx={{ flex: 1 }}>
                <OTPInputLayout otpInput={otp} setOtpInput={setOtp} />
              </Box>
              <Box sx={{ alignSelf: "center" }}>
                <CustomButton disabled ButtonText={"Resend OTP"} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{ textTransform: "uppercase", color: colors.DISABLED }}
              >
                Received at {`+${formData?.countryCode} ${formData?.number}`}
              </Typography>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      {!isVerified && (
        <DialogActions>
          <CustomButton
            startIcon={<ArrowBackIosIcon />}
            onClick={() => {
              handleClose();
              handleOpen();
            }}

            ButtonText={"Back"}
          />
          <CustomButton
            startIcon={<DoneIcon />}
            variant="contained"
            onClick={() => {
              handleSubmit(formData);
              handleAlternateSignIn();
              handleClose();
            }}

            ButtonText={"Verify"}
          />
        </DialogActions>
      )}
    </Dialog>
  );
}

export default OtpVerify;
