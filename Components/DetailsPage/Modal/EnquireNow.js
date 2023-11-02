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
          <InputField label="Full name" />
          <InputField label="Email" />
          <InputField
            label="Phone number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91 </InputAdornment>
              ),
            }}
          />
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
            <Button
              startIcon={<GoogleIcon />}
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
