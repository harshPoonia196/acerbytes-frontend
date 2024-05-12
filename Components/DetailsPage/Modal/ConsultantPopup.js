import { useState } from "react";
import {
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Card,
  Grid,
} from "@mui/material";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import { formatAmount } from "utills/CommonFunction";
import { BuyConsultanttPoints } from "utills/Constants";
import { useSnackbar } from "utills/SnackbarContext";
import { PropertyPlanPoints } from "api/Property.api";
import { getBrokerBalance } from "api/Broker.api";
import { useAuth } from "utills/AuthContext";

function ConsultantPopup({ open, handleClose, detailsPropertyId, detailsGetProperty }) {
  const { setBrokerPoints } = useAuth();
  const [loadingStates, setLoadingStates] = useState({});
    const { openSnackbar } = useSnackbar();
    const showToaterMessages = (message, severity) => {
        openSnackbar(message, severity);
      };
   
    const handleByPlanClick = async (duration, planId) => {
        const adData = {
          durationInMonths: duration
        }
        try {
          setLoadingStates(prevStates => ({ ...prevStates, [planId]: true }));
          const response = await PropertyPlanPoints(detailsPropertyId, adData);
          if (response.status == 200) {
            showToaterMessages(response?.data.message, "success");
            detailsGetProperty()
            getBrokerpointBalance()
            handleClose()
          }
        } catch (error) {
          showToaterMessages(
            error?.response?.data?.message ||
            error?.message ||
            "something went wrong error",
            "error"
          );
        } finally {
          setLoadingStates(prevStates => ({ ...prevStates, [planId]: false }))
        }
      }

      const getBrokerpointBalance = async () => {
        try {
          const response = await getBrokerBalance();
          if (response.status == 200) {
            setBrokerPoints(response?.data?.data?.balance || 0);
          }
        } catch (error) {
          showToaterMessages(
            error?.response?.data?.message ||
            error?.message ||
            "Error getbroker balance request",
            "error"
          );
        }
      };

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "8px !important",
          maxHeight: "500px",
          maxWidth: "100%",
          overflowY: "scroll",
        },
      }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle onClose={handleClose}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Request for purchase plan
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{ maxWidth: "100%", width: "100%", overflowY: "scroll" }}
      >
        <Grid container spacing={1} sx={{ p: 2 }}>

          {BuyConsultanttPoints?.map((credit, index) => {
            return (
              <>
               <Grid item xs={12}>
                <Card sx={{ p: 1 }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{ flex: 1, alignSelf: "center" }}
                    >
                      {credit?.month} plan
                    </Typography>
                    <Box>
                      <CustomButton
                        variant="contained"
                        size="small"
                        onClick={() => handleByPlanClick(credit.value, index)}
                        disabled={loadingStates[index] || false}
                        ButtonText={loadingStates[index] ? 'Loading...' : `${credit?.amount} Buy Now`}
                      />
                    </Box>
                  </Box>
                  <Typography variant="subtitle2">
                    <span style={{ fontWeight: 600 }}>
                      {formatAmount(credit?.discountAmount)} 
                    </span>{" "}
                    ({credit?.discount}% discount)
                  </Typography>
                </Card>
               </Grid>
              </>
            );
          })}
           </Grid>
      </DialogContent>
      <DialogActions>
        <Box sx={{ textAlign: "end" }}>
          <CustomButton
            variant="contained"
            onClick={() => {
              handleClose();
            }}
            ButtonText={"Close"}
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default ConsultantPopup;
