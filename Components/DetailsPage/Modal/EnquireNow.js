import InputField from "Components/CommonLayouts/InputField";
import {
  Button,
  Grid,
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";

function EnquireNow({ open, handleClose, handleAction }) {
  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle onClose={handleClose}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Enquire about <span style={{ color: "gray" }}>Godrej Woods</span>
        </Typography>
        <Typography variant="body1">
          Connect with professional property consultants only
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <InputField label="Full name" />
          <InputField label="Email" />
          <InputField label="Phone number" />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "end",
          }}
        >
          <Box>
            <Button sx={{ mr: 2 }} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleAction();
                handleClose();
              }}
            >
              Submit
            </Button>
          </Box>
          <Typography variant="caption" sx={{ flex: 1, mt: 1 }}>
            Your information is safe, we don't spam you
          </Typography>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default EnquireNow;
