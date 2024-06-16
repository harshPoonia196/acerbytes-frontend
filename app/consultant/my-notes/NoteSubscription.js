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
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import { formatPoints } from "utills/CommonFunction";
import { BuyConsultantsNotePoints } from "utills/Constants";
import { useSnackbar } from "utills/SnackbarContext";
import { buyNotesPoints, getBrokerBalance } from "api/Broker.api";
import { useAuth } from "utills/AuthContext";
import AddCardIcon from "@mui/icons-material/AddCard";
import { useRouter } from "next/navigation";
import { listOfPages } from "Components/NavBar/Links";

function NoteSubscription({ open, handleClose, getList }) {
  const router = useRouter();
  const [duration, setDuration] = useState({});

  const { setBrokerPoints, brokerBalance } = useAuth(),
    [loadingStates, setLoadingStates] = useState({}),
    { openSnackbar } = useSnackbar(),
    showTostMessages = (message, severity) => {
      openSnackbar(message, severity);
    },
    handleByPlanClick = async () => {
      const adData = { months: duration };
      setLoadingStates(true);
      if (duration) {
        try {
          const response = await buyNotesPoints(adData);
          if (response.status == 200) {
            showTostMessages(response?.data.message, "success");
            getBrokerPointBalance();
            handleClose();
            getList();
          }
        } catch (error) {
          showTostMessages(
            error?.response?.data?.message ||
              error?.message ||
              "something went wrong error",
            "error"
          );
        } finally {
          setLoadingStates(false);
        }
      } else {
        showTostMessages("Please select a plan", "error");
        setLoadingStates(true);
      }
    },
    getBrokerPointBalance = async () => {
      try {
        const response = await getBrokerBalance();
        if (response.status == 200) {
          setBrokerPoints(response?.data?.data?.balance || 0);
        }
      } catch (error) {
        showTostMessages(
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
        "& .MuiDialog-paper": { borderRadius: "8px !important" },
      }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle onClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Request for plan subscribe
          </Typography>
          <CustomButton
            startIcon={<AddCardIcon fontSize="small" />}
            variant="outlined"
            size="small"
            onClick={() => router.push(listOfPages.consultantPaymentHistory)}
            ButtonText={"Add points"}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
        >
          <Grid container spacing={1}>
            {BuyConsultantsNotePoints?.map((credit) => {
              return (
                <Grid item xs={12}>
                  <Card
                    sx={{
                      p: 2,
                      border: "solid 1px #dcdcdc78",
                      mb: "8px",
                      overflowY: "auto",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Box>
                        <FormControlLabel
                          value={credit.value}
                          control={<Radio />}
                          sx={{ mr: 0 }}
                          onClick={() => setDuration(credit.value)}
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{ flex: 1, alignSelf: "center" }}
                        >
                          {credit?.month}
                          {credit?.month !== "1 month" ? "s" : null} plan
                        </Typography>
                        <Typography variant="subtitle2">
                          <span style={{ fontWeight: 600 }}>
                            {formatPoints(credit?.discountAmount)} Points
                          </span>
                          ({credit?.discount}% discount)
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </RadioGroup>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", pt: 1 }}>
        <Box sx={{ fontWeight: 700 }}>
          <Chip label={`Balance: ${brokerBalance} Points`} color="primary" />
        </Box>
        <Box sx={{ textAlign: "end" }}>
          <CustomButton
            variant="contained"
            size="small"
            ButtonText={!loadingStates ? "Subscribe" : "Loading..."}
            onClick={handleByPlanClick}
            disabled={loadingStates}
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default NoteSubscription;
