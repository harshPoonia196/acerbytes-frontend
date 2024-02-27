import {
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CreditRequestPaymentPopup from "./CreditRequestPaymentPopup";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { companyName } from "Components/NavBar/Links";
import { BuyingCreditPoints } from "Components/Constants";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";

function ConsultantAddCreditPopup({ open, handleClose }) {
  const [openCreditRequestPaymentPopup, setCreditRequestPaymentPopup] =
    useState(false);
  const [creditRequestPaymentInfo, setCreditRequestPaymentInfo] = useState({});

  const handleOpenCreditRequestPaymentPopup = (credit) => {
    setCreditRequestPaymentPopup(true);
    setCreditRequestPaymentInfo(credit);
  };

  const handleCloseCreditRequestPaymentPopup = () => {
    setCreditRequestPaymentPopup(false);
    setCreditRequestPaymentInfo({});
  };

  return (
    <>
      <CreditRequestPaymentPopup
        open={openCreditRequestPaymentPopup}
        handleClose={handleCloseCreditRequestPaymentPopup}
        creditRequest={creditRequestPaymentInfo}
      />
      <Dialog
        sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle onClose={handleClose}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Request for buying credits (points)
          </Typography>
          <Typography variant="body1">
            Potential to buy leads from the panel
          </Typography>
        </DialogTitle>
        <DialogContent>
          {BuyingCreditPoints?.map((credit) => {
            return (
              <>
                <Card sx={{ display: "flex", p: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1">
                      {credit.point} points
                    </Typography>
                    <Typography variant="subtitle2">
                      <span style={{ fontWeight: 600 }}>
                        Rs {credit.amount}
                      </span>{" "}
                      ({credit.discount}% discount)
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <CustomButton
                      variant="contained"
                      size="small"
                      onClick={() => handleOpenCreditRequestPaymentPopup(credit)}
                      ButtonTex={`Get ${credit.point} points`}
                    />
                  </Box>
                </Card>
                <Divider />
              </>
            );
          })}
          <Box sx={{ backgroundColor: "whitesmoke", p: 2, my: 2 }}>
            <Typography variant="body1">
              Post requesting you will receive a{" "}
              <span style={{ fontWeight: 600 }}>order number</span>
              that can be shared with {companyName} representative (if any) and
              send screenshot at
              <Chip
                onClick={() => { }}
                icon={<WhatsAppIcon fontSize="small" />}
                label="+9198799877"
                size="small"
                sx={{ fontSize: "0.875rem" }}
              />
            </Typography>
          </Box>
          <Typography variant="body2">
            Property consultant can use above credits to activate below services
          </Typography>
          <ul>
            <li style={{ marginLeft: "16px" }}>
              <Typography variant="body2">
                Activate unique link for a property
              </Typography>
            </li>
            <li style={{ marginLeft: "16px" }}>
              <Typography variant="body2">View leads contact</Typography>
            </li>
            <li style={{ marginLeft: "16px" }}>
              <Typography variant="body2">
                Managing leads panel with notes
              </Typography>
            </li>
            <li style={{ marginLeft: "16px" }}>
              <Typography variant="body2">
                Link own profile with Property page
              </Typography>
            </li>
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ConsultantAddCreditPopup;
