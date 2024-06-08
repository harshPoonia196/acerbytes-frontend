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

const RoleViewerDropdown = ({ row, setuserApproveStatusConfirmationDialog, isApproved}) => {
  const handleChange = (event) => {
    setuserApproveStatusConfirmationDialog(pre => ({...pre, data: {...pre.data, row: {...pre.data.row, role: event.target.value}}}));
  };

  return (
    <Box >
      {isApproved?.isApproved && (
      <FormControl size="small" variant="standard" sx={{ width: "100%" }}>
        <Typography variant="body" component="label" sx={{paddingBottom: "5px"}}>Role</Typography>
        <Select
          labelId="dropdown-label"
          id="dropdown"
          className="role-select"
          value={row?.role}
          onChange={handleChange}
          label="Select role"
          sx= {{ width: "100%" }}
        >
          {ROLES?.filter((rs) => rs.isVisible)?.map((rs) => {
            return <MenuItem value={rs.value}>{rs.label}</MenuItem>;
          })}
        </Select>
      </FormControl>
      )}
    </Box>
  );
};

const RoleConfirmationDialog = ({ open, handleAction, selectedRowData, setuserApproveStatusConfirmationDialog}) => {
  const handleClose = () => {
    handleAction(false);
  };

  const handleConfirm = () => {
    handleAction(true);
  };

  const dialogSize = selectedRowData?.data?.isApproved
    ? { height: '310px', width: '400px' }
    : { height: 'auto' };

  
  const paddingTopStyle = selectedRowData?.data?.isApproved
    ? { paddingTop: '40px' }
    : {paddingTop: '5px'};

  return (
    <Box >
      <Dialog open={open} onClose={handleClose} 
      sx={{
        '& .MuiDialog-paper': dialogSize,
      }}

      >
        <DialogTitle>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Confirmation</Typography>
        </DialogTitle>
        <DialogContent >
          <RoleViewerDropdown row={selectedRowData?.data?.row} setuserApproveStatusConfirmationDialog={setuserApproveStatusConfirmationDialog} isApproved={selectedRowData?.data}/>
          <DialogContentText sx={paddingTopStyle}>
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
