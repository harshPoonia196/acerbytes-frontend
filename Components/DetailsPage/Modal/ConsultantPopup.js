import { useState } from "react";
import {
  DialogActions,
  Dialog,
  DialogContent,
  Typography,
  Box,
  Card,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  DialogTitle,
  Chip,
} from "@mui/material";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import { BuyConsultantPoints } from "utills/Constants";
import { useSnackbar } from "utills/SnackbarContext";
import { PropertyPlanPoints } from "api/Property.api";
import { getBrokerBalance } from "api/Broker.api";
import { useAuth } from "utills/AuthContext";
import AddCardIcon from "@mui/icons-material/AddCard";
import { listOfPages } from "Components/NavBar/Links";
import { useRouter } from "next/navigation";
import { formatPoints } from "utills/CommonFunction";

function ConsultantPopup({
  open,
  handleClose,
  detailsPropertyId,
  detailsGetProperty,
  brokerBalance,
}) {
  const { setBrokerPoints } = useAuth();
  const [loadingStates, setLoadingStates] = useState(false);
  const [currentPlan, setCurrentPlan] = useState({});
  const router = useRouter();
  const { openSnackbar } = useSnackbar();

  const showTostMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  const handleByPlanClick = async () => {
    const { duration } = currentPlan;

    if (duration) {
      const adData = { durationInMonths: duration };
      try {
        setLoadingStates(true);
        const response = await PropertyPlanPoints(detailsPropertyId, adData);
        if (response.status == 200) {
          showTostMessages(response?.data.message, "success");
          detailsGetProperty();
          getBrokerPointBalance();
          handleClose();
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
    }
  };

  const getBrokerPointBalance = async () => {
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
        "& .MuiDialog-paper": {
          borderRadius: "8px !important",
          overflowY: "auto",
        },
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
            Request for purchase plan
          </Typography>
          
        </Box>
      </DialogTitle>
      <DialogContent
        sx={{ maxWidth: "100%", width: "100%", overflowY: "auto" }}
      >
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          // onChange={}
        >
          <Grid container spacing={1}>
            {BuyConsultantPoints?.map((credit, index) => {
              
              return (
                <>
                  <Grid item xs={12}>
                    <Card
                      sx={{
                        p: 2,
                        border: "solid 1px #dcdcdc78",
                        mb: "8px",
                        overflowY: "auto",
                        cursor: "pointer"
                      }}
                      style={{ borderColor: credit?.value === currentPlan.duration ? '#276ef1': '#dcdcdc78'}}
                      onClick={() =>
                        setCurrentPlan({ duration: credit.value, points: credit.discountAmount })
                      }>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <FormControlLabel
                          onClick={() =>
                            setCurrentPlan({ duration: credit.value, points: credit.discountAmount })
                          }
                          value={credit.value}
                          checked={credit?.value === currentPlan.duration}
                          control={<Radio />}
                          disabled={loadingStates}
                          sx={{ mr: 0 }}
                        />
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
                              {formatPoints(credit?.discountAmount)} Points{" "}
                            </span>
                            ({credit?.discount}% discount)
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </RadioGroup>
      </DialogContent>
      <DialogActions
        sx={{ justifyContent: "space-between", alignItems: "flex-start", pt: 1 }}
      >
        <Box>
        <CustomButton
            startIcon={<AddCardIcon fontSize="small" />}
            variant="outlined"
            size="small"
            onClick={() => router.push(listOfPages.consultantPaymentHistory)}
            ButtonText={"Add points"}
          />
        <Typography variant="body2"
          sx={{ marginRight: "10px", alignSelf: "flex-start", mt: 1 }}> 
          Balance: {brokerBalance} points</Typography>
        </Box>
        <Box sx={{ textAlign: "right"}}>
        <CustomButton
          variant="contained"
          size="small"
          disabled={loadingStates}
          ButtonText={!loadingStates ? "Buy Now" : "Loading..."}
          onClick={handleByPlanClick}
        />
        {currentPlan.points && <Typography variant="body2" sx={{mt: 1}}>Selected Points: {formatPoints(currentPlan.points)}</Typography>}
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default ConsultantPopup;
