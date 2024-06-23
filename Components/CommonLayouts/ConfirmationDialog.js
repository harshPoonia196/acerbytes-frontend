import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import CustomButton from "./Loading/LoadingButton";

const ConfirmationDialog = ({ open, handleAction, text }) => {
  const handleClose = () => {
    handleAction(false);
  };

  const handleConfirm = () => {
    handleAction(true);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle onClose={handleClose}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Confirmation
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {text ? (
            <p dangerouslySetInnerHTML={{ __html: text }} />
          ) : (
            "Are you sure you want to perform this action ?"
          )}
        </Typography>
      </DialogContent>
      <DialogActions>
        <CustomButton
          variant="contained"
          onClick={handleClose}
          ButtonText={"No"}
        />
        <CustomButton
          variant="contained"
          onClick={handleConfirm}
          autoFocus
          ButtonText={"Yes"}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
