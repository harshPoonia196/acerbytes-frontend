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

function OtpVerify({ open, handleClose, handleOpen, handleAlternateSignIn }) {
  const [otp, setOtp] = useState("");

  const [isVerified, setIsVerified] = useState(false);

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }}
      open={open}
      onClose={handleClose}
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
              Mobile <span style={{ color: "gray" }}>verification</span>
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
            <Grid item xs={12}>
              <Typography variant="body2">
                Enter 4 digits OTP received on +99132435353
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span> - </span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    style={{
                      width: "2rem",
                      height: "2rem",
                      textAlign: "center",
                      fontSize: "1rem",

                      outline: "none",
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                Enter 4 digits OTP received on abc @ efmwolcom
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span> - </span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    style={{
                      width: "2rem",
                      height: "2rem",
                      textAlign: "center",
                      fontSize: "1rem",

                      outline: "none",
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      {!isVerified && (
        <DialogActions>
          <Button
            startIcon={<ArrowBackIosIcon />}
            onClick={() => {
              handleClose();
              handleOpen();
            }}
          >
            Back
          </Button>
          <Button
            startIcon={<DoneIcon />}
            variant="contained"
            onClick={() => {
              handleAlternateSignIn();
              handleClose();
            }}
          >
            Verify
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

export default OtpVerify;
