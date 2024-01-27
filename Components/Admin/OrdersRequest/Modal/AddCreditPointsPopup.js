import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import InputField from "Components/CommonLayouts/InputField";
import React from "react";

function AddCreditPointsPopup({ open, handleClose, info, handleSubmit }) {
  const [receivedPayment, setReceivedPayment] = React.useState("");

  const handleChange = (event) => {
    setReceivedPayment(event.target.value);
  };

  const saveHandler = () => {
    if (!isNaN(parseInt(receivedPayment))) {
      handleSubmit(receivedPayment);
      handleClose();
    }
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle onClose={handleClose}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Add credit for <span style={{ color: "gray" }}>{info?.name}</span>
        </Typography>
        <Typography variant="body1">
          Potential to buy leads from the panel
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Points : {info?.points}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Amount : {info?.amount}
            </Typography>
          </Grid>
          <InputField
            type="number"
            label="Enter received payment"
            handleChange={handleChange}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            // startIcon={<GoogleIcon />}
            variant="outlined"
            sx={{ mr: 2 }}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            // startIcon={<DoneIcon />}
            variant="contained"
            onClick={() => {
              saveHandler();
            }}
          >
            Submit
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default AddCreditPointsPopup;
