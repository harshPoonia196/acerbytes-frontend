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
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useRouter } from "next/navigation";
import { companyName, listOfPages } from "Components/NavBar/Links";
import { generateRandomId } from "utills/CommonFunction";
import { useAuth } from "utills/AuthContext";

function CreditRequestPaymentPopup({ open, handleClose, creditRequest }) {
  const router = useRouter();
  const orderRequestId = generateRandomId().toUpperCase();
  const { userDetails } = useAuth();

  const handleCopyClick = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error("Unable to copy text to clipboard:", err);
    }
  };

  const handleClickPayHere = () => {
    const payload = {
      orderNumber: orderRequestId,
      points: creditRequest?.point || 0,
      amount: creditRequest?.amount || 0,
      googleID: userDetails?.googleID,
    };
    console.log(payload);
    // router.push(listOfPages.consultantMakePayment);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle onClose={handleClose}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Credits (points) purchase order generated
        </Typography>
        <Typography variant="body1">Payment pending</Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Typography variant="h3">{orderRequestId}</Typography>
            <Box>
              <Tooltip title="Copy">
                <IconButton
                  size="small"
                  onClick={() => handleCopyClick(orderRequestId)}
                >
                  <ContentCopyIcon fontSize="1.25rem" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Typography variant="h3">
            <span style={{ fontSize: "1rem" }}>for</span>&nbsp;
            {creditRequest?.point || 0}&nbsp;
            <span style={{ fontSize: "1rem" }}>credits (points)</span>
          </Typography>
          <Typography variant="h6">
            is pending for payment for request number
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <Typography variant="h2" sx={{ fontWeight: 600 }}>
              <span style={{ fontSize: "1rem" }}>Rs&nbsp;</span>
              {creditRequest?.amount || 0}
            </Typography>
            <Box sx={{ alignSelf: "center" }}>
              <Tooltip title="Copy">
                <IconButton
                  size="small"
                  onClick={() => handleCopyClick(creditRequest?.amount || 0)}
                >
                  <ContentCopyIcon fontSize="1.25rem" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Button
            variant="contained"
            // onClick={() => {
            //   router.push(listOfPages.consultantMakePayment);
            // }}
            onClick={handleClickPayHere}
          >
            Pay here
          </Button>
        </Box>
        <Divider sx={{ my: 2, borderColor: "gainsboro" }} />
        <ul>
          <li style={{ marginLeft: "16px" }}>
            <Typography variant="body2">
              Please share credits (points) request number with {companyName}{" "}
              representative (if any)
            </Typography>
          </li>
          <li style={{ marginLeft: "16px" }}>
            <Typography variant="body2">
              Send screenshot to{" "}
              <Chip
                onClick={() => {}}
                icon={<WhatsAppIcon fontSize="small" />}
                label="+9198799877"
                size="small"
                sx={{ fontSize: "0.875rem" }}
              />{" "}
              after making the payment
            </Typography>
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
}

export default CreditRequestPaymentPopup;
