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
import { activeadCreate } from "api/Property.api";
import { useSnackbar } from "utills/SnackbarContext";
import { useState } from "react";
import { ToasterMessages } from "Components/Constants";
import Loader from "Components/CommonLayouts/Loading";

function ActivateAdsPopup({ open, handleClose, SinglePropertyId, detailsGetProperty }) {

  const router = useRouter();
  const tempList = [
    { label: '1 month', value: '1 month' },
    { label: '2 months', value: '2 months' },
    { label: '3 months', value: '3 months' },
    { label: '4 months', value: '4 months' }
  ]

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [isLoading, setLoading] = useState(false);

  const storedUserDataString = localStorage.getItem('userDetails');
  const storedUserData = JSON.parse(storedUserDataString);
  const userId = storedUserData._id;



  const handleActivateClick = async () => {
    const adData = {
      broker_id: userId,
      property_id: SinglePropertyId._id,
      title: title,
      description: description,
      durationInMonths: duration

    }
    try {
      setLoading(true);
      const response = await activeadCreate(adData);
      if (response.status == 200) {
        showToaterMessages(ToasterMessages.PROFILE_UPDATE_SUCCESS, "success");
        detailsGetProperty()
        handleClose()
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
        error?.message ||
        "Error generating order number request",
        "error"
      );
    } finally {
      setLoading(false);
    }

  }
  const { openSnackbar } = useSnackbar();
  const showToaterMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

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
      <DialogContent sx={{ minWidth: 300,}}>
        <Grid container spacing={2}>
          <NewInputFieldStructure label={'Your personalized link to share'} isEdit={false} value={'https://dsjdjusdi.com'} />
          <NewInputFieldStructure label='Title (10 words)' isFull  onChange={(e) => setTitle(e.target.value)} />
          <NewInputFieldStructure label='Description (50 words)' isFull multiline onChange={(e) => setDescription(e.target.value)} />
          <NewSelectTextFieldStructure label='Duration (Months)' isEdit={true} variant='standard' 
            list={tempList} handleChange={(e) => setDuration(e.target.value)} 
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box sx={{ textAlign: "end" }}>
          <Button
            startIcon={<DoneIcon fontSize="small" />}
            variant="contained"
            size="small"
            onClick={handleActivateClick}
            disabled={isLoading}
          >
           {isLoading ?  <Loader /> : 'Activate'} 
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
