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
  InputAdornment,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import DoneIcon from "@mui/icons-material/Done";
import { useRouter } from "next/navigation";
import NewPhoneInputField from "Components/CommonLayouts/NewPhoneInputField";

function EnquireNow({ open, handleClose, handleAction }) {
  const router = useRouter();

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
          <InputField halfSm label="First name" />
          <InputField halfSm label="Last name" />
          <NewPhoneInputField label="Phone number" />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box sx={{ flex: 1, textAlign: "end" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              startIcon={<GoogleIcon />}
              variant="outlined"
              sx={{ mr: 2 }}
              onClick={() => router.push("/login")}
            >
              Existing user, Sign In
            </Button>
            <Button
              startIcon={<DoneIcon />}
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
