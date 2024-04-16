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
import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useRouter } from "next/navigation";
import { companyName, listOfPages } from "Components/NavBar/Links";
import { useAuth } from "utills/AuthContext";
import { createOrderRequest, generateRandorOrderNumber } from "api/Broker.api";
import { ToasterMessages } from "utills/Constants";
import { useSnackbar } from "utills/SnackbarContext";
import { LoadingButton } from "@mui/lab";
import { formatAmount, formatPoints } from "utills/CommonFunction";
import AutorenewIcon from '@mui/icons-material/Autorenew';

function CreditRequestPaymentPopup({ open, handleClose, creditRequest }) {
  const router = useRouter();
  const { userDetails } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const handleCopyClick = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error("Unable to copy text to clipboard:", err);
    }
  };

  React.useEffect(() => {
    if (open == true) {
      getOrderNumber();
    }
  }, [open == true]);

  const { openSnackbar } = useSnackbar();

  const showToaterMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  const getOrderNumber = async () => {
    try {
      setLoading(true);
      const response = await generateRandorOrderNumber();
      if (response.status == 200) {
        const randomNumber = response?.data?.data;
        setOrderNumber(typeof randomNumber === "string" ? randomNumber.toUpperCase() : "");
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
        error?.message ||
        "Error generating order number request",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentRequest = async (data) => {
    try {
      setLoading(true);
      const response = await createOrderRequest(data);
      if (response.status == 200) {
        showToaterMessages(ToasterMessages.ORDER_REQUESTED_SUCCESS, "success");
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
        error?.message ||
        "Error creating order request",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClickPayHere = async () => {
    const payload = {
      orderNumber: orderNumber,
      points: creditRequest?.point || 0,
      amount: creditRequest?.amount || 0,
      standardDiscount: creditRequest?.discount,
      brokerId: userDetails?._id,
    };
    await handlePaymentRequest(payload);
    router.push(listOfPages.consultantMakePayment);
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
          <Typography variant="h6">Order number</Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
            <Typography variant="h3">{orderNumber}</Typography>
            <Box>
              <Tooltip title="Copy">
                <IconButton
                  size="small"
                  onClick={() => handleCopyClick(orderNumber)}
                >
                  <ContentCopyIcon fontSize="1.25rem" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Typography sx={{ fontSize: "1rem" }}>generated for</Typography>
          <Typography variant="h3">
            {formatPoints(creditRequest?.point || 0)}&nbsp;
          </Typography>
          <Typography sx={{ fontSize: "1rem", pb: 2 }}>credits (points)</Typography>
          <Box sx={{ my: 2 }}>
            <Chip icon={<AutorenewIcon />} label='Payment pending' size='small' color='warning' />
          </Box>
          <Typography variant="h4">
            You need to make payment of
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", my: 2, mt: 0 }}>
            <Typography variant="h2" sx={{ fontWeight: 600 }}>
              {formatAmount(creditRequest?.amount || 0)}
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
          {/* <Button
            variant="contained"
            // onClick={() => {
            //   router.push(listOfPages.consultantMakePayment);
            // }}
            onClick={handleClickPayHere}
          >
            Pay here
          </Button> */}
          <LoadingButton
            onClick={handleClickPayHere}
            loading={isLoading}
            disabled={!orderNumber}
            loadingPosition="start"
            variant="contained"
          >
            Click here to pay
          </LoadingButton>
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
                onClick={() => { }}
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
    </Dialog >
  );
}

export default CreditRequestPaymentPopup;
