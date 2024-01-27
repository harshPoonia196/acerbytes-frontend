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
import PaymentIcon from '@mui/icons-material/Payment';
import DoneIcon from "@mui/icons-material/Done";
import { useRouter } from "next/navigation";
import AddCardIcon from '@mui/icons-material/AddCard';
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import colors from "styles/theme/colors";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";

function ActivateAdsPopup({ open, handleClose }) {
  const router = useRouter();

  const tempList = [
    { label: '1 month', value: '1 month' },
    { label: '2 months', value: '2 months' },
    { label: '3 months', value: '3 months' },
    { label: '4 months', value: '4 months' }
  ]

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle onClose={handleClose}>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, flex: 1, alignSelf: 'center' }}>
            Activate your link
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'end' }}>
              <Button
                startIcon={<PaymentIcon fontSize="small" />}
                variant="outlined"
                size="small"
              >
                35,000
              </Button>
              <Typography variant="subtitle2"
                sx={{ alignSelf: "center", color: colors.GRAY }}>
                Your balance
              </Typography>
            </Box>
            <Box sx={{ ml: 1 }}>
              <Button
                startIcon={<AddCardIcon fontSize="small" />}
                variant="outlined"
                size="small"
                onClick={() => {
                  handleClose();
                }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ minWidth: 300, }}>
        <Grid container spacing={2}>
          <NewInputFieldStructure label={'Your personalized link to share'} isEdit={false} value={'https://dsjdjusdi.com'} />
          <NewInputFieldStructure label='Title (10 words)' isFull defaultValue={'The Resident Tower Noida'} />
          <NewInputFieldStructure label='Description (50 words)' isFull multiline defaultValue={'The Resident Tower Noida'} />
          <NewSelectTextFieldStructure label='Duration (Months)' isEdit={true} variant='standard'
            list={tempList}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box sx={{ textAlign: "end" }}>
          <Button
            startIcon={<DoneIcon fontSize="small" />}
            variant="contained"
            size="small"
            onClick={() => {
              handleClose();
            }}
          >
            Activate
          </Button>
          <Typography variant="subtitle2"
            sx={{ alignSelf: "center", color: colors.GRAY }}>
            10,000 points
          </Typography>
        </Box>
      </DialogActions>
    </Dialog >
  );
}

export default ActivateAdsPopup;
