import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CustomButton from "./Loading/LoadingButton";

const ConfirmationDialog = ({ open, handleAction }) => {
  const handleClose = () => {
    handleAction(false);
  };

  const handleConfirm = () => {
    handleAction(true);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to perform this action?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={handleClose} color="primary"
            ButtonText={"No"}
          />
          <CustomButton onClick={handleConfirm} color="primary" autoFocus
            ButtonText={"Yes"}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmationDialog;
