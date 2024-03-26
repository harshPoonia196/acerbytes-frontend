import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import CustomButton from "./Loading/LoadingButton";
import { ROLES } from "utills/Constants";

const RoleViewerDropdown = ({ row, setuserApproveStatusConfirmationDialog}) => {
  const handleChange = (event) => {
    setuserApproveStatusConfirmationDialog(pre => ({...pre, data: {...pre.data, row: {...pre.data.row, role: event.target.value}}}));
  };

  return (
    <Box >
      <FormControl size="small" variant="standard" >
        <Typography variant="body" component="label" sx={{paddingBottom: "5px"}}>Role</Typography>
        <Select
          labelId="dropdown-label"
          id="dropdown"
          className="role-select"
          value={row?.role}
          onChange={handleChange}
          label="Select role"
        >
          {ROLES?.filter((rs) => rs.isVisible)?.map((rs) => {
            return <MenuItem value={rs.value}>{rs.label}</MenuItem>;
          })}
        </Select>
      </FormControl>

    </Box>
  );
};

const RoleConfirmationDialog = ({ open, handleAction, selectedRowData, setuserApproveStatusConfirmationDialog }) => {
  const handleClose = () => {
    handleAction(false);
  };

  const handleConfirm = () => {
    handleAction(true);
  };

  return (
    <Box >
      <Dialog open={open} onClose={handleClose} 
      sx={{
        '& .MuiDialog-paper': {height: '310px', width: "400px" }, 
      }}

      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent >
          <RoleViewerDropdown row={selectedRowData?.data?.row} setuserApproveStatusConfirmationDialog={setuserApproveStatusConfirmationDialog}/>
          <DialogContentText sx={{paddingTop: "40px"}}>
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
    </Box>
  );
};

export default RoleConfirmationDialog;
