import React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogActions, Grid, Button, Typography } from '@mui/material';
import CircularProgressSpinner from "Components/DetailsPage/CircularProgressSpinner"; 
import colors from "styles/theme/colors";

const ExpiredLinkModal = ({ open, onClose, onDetailsClick, progressCount, pageName }) => {
  return (
    <Dialog open={open}>
      <DialogContent sx={{ padding: "25px 30px !important", minWidth: "415px" }}>
        <Grid sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <CircularProgressSpinner value={progressCount} />
          <DialogContentText>
            <Typography variant="body2">
              Link is not available please check {pageName? pageName: ''}
            </Typography>
          </DialogContentText>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{
            fontWeight: 600,
            color: "white",
            backgroundColor: colors?.BLACK,
            "&:hover": {
              backgroundColor: colors?.BLACK,
              boxShadow: "none",
            },
          }}
          onClick={onDetailsClick}
        >
          {pageName} Page
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpiredLinkModal;
