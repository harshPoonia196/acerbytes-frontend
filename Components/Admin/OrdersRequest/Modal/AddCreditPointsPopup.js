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
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import NewAutoCompleteInputStructure from "Components/CommonLayouts/NewAutoCompleteInputStructure";
import React from "react";
import { formatAmount, formatPoints } from "utills/CommonFunction";

function AddCreditPointsPopup({ open, handleClose, info, handleSubmit }) {
  const [receivedPayment, setReceivedPayment] = React.useState("");
  const [assignedPoints, setAssignedPoints] = React.useState("");
  const [salesPerson, setSalesPerson] = React.useState("");

  React.useEffect(() => {
    if (open == true) {
      if (info?.approvedPayment) {
        setReceivedPayment(info?.approvedPayment);
      }
      if (info?.approvedPoints) {
        setAssignedPoints(info?.approvedPoints);
      }
      if (info?.salesPerson) {
        setSalesPerson(info?.salesPerson);
      }
    }
  }, [open]);
  const handleChange = (event) => {
    setReceivedPayment(event.target.value);
  };

  const handlePointsChange = (event) => {
    setAssignedPoints(event.target.value);
  };

  const handleSelectSalesPerson = (value) => {
    setSalesPerson(value);
  };

  const saveHandler = () => {
    if (
      !isNaN(parseInt(receivedPayment)) &&
      !isNaN(parseInt(assignedPoints)) &&
      salesPerson
    ) {
      handleSubmit({
        receivedPayment,
        assignedPoints,
        salesPerson,
      });
      handleClose();
    }
  };
  const salesPersonInfo = info?.salesPersons?.find(
    (rs) => rs.googleID === salesPerson
  );

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle onClose={handleClose}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Add Credit points for <span style={{ color: "gray" }}>{info?.name}</span>
        </Typography>
        <Typography variant="body1">
          Credit Points are required to buy services on AcreBytes
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Points : {formatPoints(info?.points)} pts
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Amount : {formatAmount(info?.amount)}
            </Typography>
          </Grid>
          <InputField
            type="text"
            label="Enter received payment"
            handleChange={handleChange}
            value={receivedPayment}
            isAmount={true}
            halfSm
          />
          <InputField
            type="text"
            label="Enter assigned points"
            handleChange={handlePointsChange}
            value={assignedPoints}
            isPoint={true}
            halfSm
          />
          <NewAutoCompleteInputStructure
            label="Select Sales person"
            handleChange={(e, newValue) =>
              handleSelectSalesPerson(newValue?.value ? newValue?.value : "")
            }
            variant='standard'
            value={
              salesPersonInfo
                ? {
                  label:
                    `${salesPersonInfo?.name?.firstName} ${salesPersonInfo?.name?.lastName}` ||
                    "",
                  value: salesPersonInfo?.googleID || "",
                }
                : null
            }
            list={info?.salesPersons?.map((rs) => {
              return {
                label: `${rs.name?.firstName} ${rs.name?.lastName}`,
                value: rs.googleID,
              };
            })}
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
          <CustomButton
            // startIcon={<GoogleIcon />}
            variant="outlined"
            sx={{ mr: 2 }}
            onClick={handleClose}
            ButtonText={"Close"}
          />
          <CustomButton
            // startIcon={<DoneIcon />}
            variant="contained"
            onClick={() => {
              saveHandler();
            }}
            ButtonText={"Update"}
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default AddCreditPointsPopup;
