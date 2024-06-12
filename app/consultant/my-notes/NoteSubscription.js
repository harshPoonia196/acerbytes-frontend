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
import { BuyConsultantsNotePoints } from "utills/Constants";
import { useSnackbar } from "utills/SnackbarContext";
import { PropertyPlanPoints } from "api/Property.api";
import { buyNotesPoints, getBrokerBalance } from "api/Broker.api";
import { useAuth } from "utills/AuthContext";

function NoteSubscription({ open, handleClose, getList }) {
  const { setBrokerPoints, brokerBalance } = useAuth(),
    [loadingStates, setLoadingStates] = useState({}),
    { openSnackbar } = useSnackbar(),

    showToaterMessages = (message, severity) => {
      openSnackbar(message, severity);
    },

    handleByPlanClick = async (duration, index) => {
      const adData = { months: duration };
      try {
        setLoadingStates(prevStates => ({ ...prevStates, [index]: true }));
        const response = await buyNotesPoints(adData);
        if (response.status == 200) {
          showToaterMessages(response?.data.message, "success");
          getBrokerpointBalance()
          handleClose()
          getList()
        }
      } catch (error) {
        showToaterMessages(
          error?.response?.data?.message ||
          error?.message ||
          "something went wrong error",
          "error"
        );
      } finally {
        setLoadingStates(prevStates => ({ ...prevStates, [index]: false }))
      }
    },

    getBrokerpointBalance = async () => {
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
        "& .MuiDialog-paper": { borderRadius: "8px !important" }
      }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle onClose={handleClose}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Request for Plan Subscribe
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1} >
          {BuyConsultantsNotePoints?.map((credit, index) => {
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
                          ButtonText={loadingStates[index] ? 'Loading...' : `Subscribe`}
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
      <DialogActions sx={{justifyContent: 'space-between'}}>
        <Box sx={{ fontWeight: 700}}>
          Points: {brokerBalance}
        </Box>
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

export default NoteSubscription;
