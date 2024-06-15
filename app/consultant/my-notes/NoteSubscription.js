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
  const { setBrokerPoints, brokerBalance } = useAuth(),
    [loadingStates, setLoadingStates] = useState({}),
    { openSnackbar } = useSnackbar(),
    showTostMessages = (message, severity) => {
      openSnackbar(message, severity);
    },
    handleByPlanClick = async (duration, index) => {
      const adData = { months: duration };
      try {
        setLoadingStates((prevStates) => ({ ...prevStates, [index]: true }));
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
        setLoadingStates((prevStates) => ({ ...prevStates, [index]: false }));
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

  const [subscribeItem, setSubscribeItem] = useState({});

  const handleChange = (event) => {
    setSubscribeItem({ value: event.target.value });
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
            Request for Plan Subscribe
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
          value={subscribeItem.value}
          onChange={handleChange}
  >
          <Grid container spacing={1} >
          {BuyConsultantsNotePoints?.map((credit, index) => {
            return (
              <>
                <Grid item xs={12}>
                  <Card sx={{ p: 1 }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Box>
                        <FormControlLabel value={credit.value} control={<Radio />} style={{ marginRight: "0px", marginLeft: "5px"}} />
                      </Box>
                      <Box>
                      <Typography
                          variant="body1"
                          sx={{ flex: 1, alignSelf: "center" }}
                        >
                          {credit?.month}{credit?.month !== "1 month" ? "s": null} plan
                        </Typography>
                        <Typography variant="subtitle2">
                      <span style={{ fontWeight: 600 }}>
                        {formatPoints(credit?.discountAmount)} Points
                      </span>{" "}
                      ({credit?.discount}% discount)
                    </Typography>
                      </Box>
                      {/* <Box>
                        <CustomButton
                          variant="contained"
                          size="small"
                          onClick={() => handleByPlanClick(credit.value, index)}
                          disabled={loadingStates[index] || false}
                          ButtonText={loadingStates[index] ? 'Loading...' : `Subscribe`}
                        />
                      </Box> */}
                      </Box>
                    </Card>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </RadioGroup>
      </DialogContent>
      <DialogActions sx={{justifyContent: 'space-between', pt: 1}}>
        <Box sx={{ fontWeight: 700}}>
          <Chip label={`Balance: ${brokerBalance} Points`} color="primary"></Chip> 
        </Box>
        <Box sx={{ textAlign: "end" }}>
          <CustomButton
            variant="contained"
            size="small"
            ButtonText={`Subscribe`}
          />
          {/* <CustomButton
            variant="contained"
            onClick={() => {
              handleClose();
            }}
            ButtonText={"Close"}
          />{" "} */}
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default NoteSubscription;
