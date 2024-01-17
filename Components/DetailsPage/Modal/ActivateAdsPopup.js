import {
  Button,
  Grid,
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  ListItem,
  List,
  Checkbox,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Radio,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";

function ActivateAdsPopup({ open, handleClose }) {
  const router = useRouter();

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle onClose={handleClose}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Activate your link
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ minWidth: 300, }}>
        <Grid container spacing={2}>
          <NewInputFieldStructure label={'Your personalized link to share'} isEdit={false} value={'https://dsjdjusdi.com'} />
          <NewInputFieldStructure label='Title (10 words)' isFull defaultValue={'The Resident Tower Noida'} />
          <NewInputFieldStructure label='Description (50 words)' isFull multiline defaultValue={'The Resident Tower Noida'} />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box sx={{ flex: 1 }}>
          <Button
            startIcon={<DoneIcon fontSize="small" />}
            variant="outlined"
            onClick={() => {
              handleClose();
            }}
          >
            Get credits
          </Button>
        </Box>
        <Box sx={{ textAlign: "end" }}>
          <Button
            startIcon={<DoneIcon fontSize="small" />}
            variant="contained"
            onClick={() => {
              handleClose();
            }}
          >
            Activate
          </Button>
        </Box>
      </DialogActions>
    </Dialog >
  );
}

export default ActivateAdsPopup;
