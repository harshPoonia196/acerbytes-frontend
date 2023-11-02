"use client";

import {
  Button,
  Card,
  Grid,
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  CardActionArea,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";

function AlternateSignIn({ open, handleClose }) {
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
              Sign in with <span style={{ color: "gray" }}>Google</span>
            </Typography>
            <Typography variant="body1">
              This is to avoid verification steps when you visit next time
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
          <Card>
            <CardActionArea
              sx={{ p: 2, display: "flex", justifyContent: "start" }}
            >
              <GoogleIcon />
              <Typography sx={{ ml: 1 }} variant="h6">
                Sign in with Google
              </Typography>
            </CardActionArea>
          </Card>
        )}
      </DialogContent>
      {!isVerified && (
        <DialogActions>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "end",
            }}
          >
            <Box>
              <Button
                startIcon={<CloseIcon />}
                sx={{ mr: 2 }}
                onClick={handleClose}
              >
                Skip
              </Button>
              <Button
                startIcon={<DoneIcon />}
                variant="contained"
                onClick={() => {
                  setIsVerified(true);
                }}
              >
                Sign in
              </Button>
            </Box>
          </Box>
        </DialogActions>
      )}
    </Dialog>
  );
}

export default AlternateSignIn;
