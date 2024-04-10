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
import { disablePersonalizeAdsOption } from "utills/Constants";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";

function DisableActivateAdsPopup({ open, handleClose }) {
  const router = useRouter();

  const [checked, setChecked] = useState('');

  const handleToggle = (value) => () => {
    // console.log(value)
    setChecked(value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle onClose={handleClose}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Don't show personal link
        </Typography>
      </DialogTitle>
      <DialogContent>
        <List dense sx={{ width: '100%', minWidth: 250, bgcolor: 'background.paper' }}>
          {disablePersonalizeAdsOption.map((value) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem
                key={value}
                secondaryAction={
                  <Radio
                    checked={checked === value}
                    edge="end"
                    value={value}
                    onChange={handleToggle(value)}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                }
                disablePadding
                sx={{ border: '1px solid whitesmoke', }}
              >
                <ListItemButton sx={{ paddingRight: '16px !important', paddingLeft: '16px !important' }} onClick={handleToggle(value)}>
                  <ListItemText id={labelId} primary={<Typography variant='h6'>{value}</Typography>} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Box sx={{ textAlign: "end" }}>
          <CustomButton
            startIcon={<DoneIcon fontSize="small" />}
            variant="contained"
            onClick={() => {
              handleClose();
            }}
            ButtonText={"Update"}
          />
        </Box>
      </DialogActions>
    </Dialog >
  );
}

export default DisableActivateAdsPopup;
