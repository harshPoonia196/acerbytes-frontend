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
import { BuyingCreditPoints } from "utills/Constants";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import { formatAmount, formatPoints } from "utills/CommonFunction";
import Link from "next/link";

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
                <Card sx={{ p: 1, }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Typography variant="body1" sx={{ flex: 1, alignSelf: 'center' }}>
                      {formatPoints(credit.point)} points
                    </Typography>
                    <Box>
                      <CustomButton
                        variant="contained"
                        size="small"
                        onClick={() => handleOpenCreditRequestPaymentPopup(credit)}
                        ButtonText={`Get ${formatPoints(credit.point)} pts`}
                      />
                    </Box>
                  </Box>

                  <Typography variant="subtitle2">
                    <span style={{ fontWeight: 600 }}>
                      {formatAmount(credit.amount)}
                    </span>{" "}
                    ({credit.discount}% discount)
                  </Typography>
                </Card>
                <Divider />
              </>
            );
          })}
          <Box sx={{ backgroundColor: "whitesmoke", p: 2, my: 2 }}>
            <Typography variant="body2">
              Post requesting you will receive a{" "}
              <span style={{ fontWeight: 600 }}>order number </span>
              that can be shared with {companyName} representative (if any) and
              send screenshot at&nbsp;&nbsp;
              <Chip
                onClick={() => { }}
                icon={<WhatsAppIcon fontSize="small" />}
                label="+9198799877"
                size="small"
                sx={{ fontSize: "0.875rem", alignSelf: 'center' }}
              />
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between"}}>
          <Typography variant="body2">
            Property consultant can use above credits to activate below services. <Link href="/generate-real-estate-leads-growth" style={{ textDecoration: "none"}}>Know more</Link>
          </Typography>
          
          
          </Box>
          <ul style={{ marginLeft: "16px" }}>
            <li>
              <Typography variant="body2">
                Activate unique link for a property
              </Typography>
            </li>
            <li>
              <Typography variant="body2">View leads contact</Typography>
            </li>
            <li>
              <Typography variant="body2">
                Managing leads panel with notes
              </Typography>
            </li>
            <li>
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
