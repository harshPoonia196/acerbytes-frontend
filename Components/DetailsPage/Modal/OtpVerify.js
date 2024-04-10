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
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DoneIcon from "@mui/icons-material/Done";
import OTPInputLayout from "Components/CommonLayouts/OTPInputLayout";
import colors from "styles/theme/colors";
import { clearItem } from "utills/utills";
import { enquiryFormKey } from "utills/Constants";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import { sendOtpAPI } from "api/Auth.api";
import { useSnackbar } from "utills/SnackbarContext";

function OtpVerify({
  open,
  handleClose,
  handleOpen,
  sendOtpFun,
  handleAlternateSignIn,
  formData,
  handleSubmit,
}) {
  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);

  const [isVerified, setIsVerified] = useState(false);

  const { openSnackbar } = useSnackbar();

  const handleSendOtp = async (isResend) => {
    let payload = {
      phoneNumber: formData?.number,
      countryCode: formData?.countryCode,
    };
    console.log("payload: ", payload);
    const res = await sendOtpAPI(payload);
    if (res.status === 200) {
      openSnackbar("Verfication code send successfully", "success");
      if (!isResend) {
        setOtp("");
      }
    }
  };

  const handleResendClick = () => {
    if (!resendDisabled) {
        setResendDisabled(true);
        handleSendOtp(true);
        setTimer(60);
        setOtp("");
    }
};


  useEffect(() => {
    if (open) {
      handleSendOtp();
      setTimer(60);
    }
  }, [open]);

  useEffect(() => {
    let interval;
    if (resendDisabled) {
        interval = setInterval(() => {
            setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
        }, 1000);
    }
    return () => clearInterval(interval);
}, [resendDisabled]);

useEffect(() => {
  if (timer === 0) {
      setResendDisabled(false)
  }
}, [timer])

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
                <CustomButton disabled={resendDisabled} ButtonText={`Resend OTP ${resendDisabled ? `(${timer}s)` : ''}`} onClick={handleResendClick} />
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
          {/* <CustomButton
            startIcon={<ArrowBackIosIcon />}
            onClick={() => {
              handleClose();
              handleOpen();
            }}
            ButtonText={"Back"}
          /> */}
          <CustomButton
            startIcon={<DoneIcon />}
            variant="contained"
            onClick={async() => {
              await handleSubmit({ ...(formData || {}), otp: otp });
              // handleAlternateSignIn();
              // handleClose();
              setOtp("");
            }}
            disabled={otp.length !== 4}
            ButtonText={"Verify"}
          />
        </DialogActions>
      )}
    </Dialog>
  );
}

export default OtpVerify;
