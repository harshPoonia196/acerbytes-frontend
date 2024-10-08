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
import { useParams, useRouter } from "next/navigation";
import { setItem } from "utills/utills";
import { propertyRedirectKey, propertyUserVerifiedKey, userLeadId } from "utills/Constants";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";

function AlternateSignIn({ open,leadId, handleClose }) {
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();
  const param = useParams();

  const handleSignin = () => {
    setItem(propertyUserVerifiedKey, true);
    setItem(userLeadId, leadId);
    setIsVerified(true);
    if (param?.projectdetails) {
      setItem(propertyRedirectKey, param?.projectdetails);
    } else if (param?.id) {
      setItem(propertyRedirectKey, "/details/" + param?.id);
    }

    router.push("/login");
  };

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
          <Card
            onClick={() => {
              handleSignin();
            }}
          >
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
              <CustomButton
                startIcon={<CloseIcon />}
                sx={{ mr: 2 }}
                onClick={handleClose}

                ButtonText={"Skip"}
              />
              {/* <CustomButton
                startIcon={<DoneIcon />}
                variant="contained"
                onClick={() => {
                  handleSignin();
                }}
              ButtonText={" Sign in"}
               
              /> */}
            </Box>
          </Box>
        </DialogActions>
      )}
    </Dialog>
  );
}

export default AlternateSignIn;
