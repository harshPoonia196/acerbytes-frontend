import { useEffect, useState } from "react";
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
import { ToasterMessages } from "Components/Constants";
import Loader from "Components/CommonLayouts/Loading";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";

function ActivateAdsPopup({ open, handleClose, SinglePropertyId, detailsGetProperty }) {

  const router = useRouter();
  const tempList = [
    { label: '1 month', value: '1 month' },
    { label: '2 months', value: '2 months' },
    { label: '3 months', value: '3 months' },
    { label: '4 months', value: '4 months' }
  ]

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: ''
  });
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const storedUserDataString = localStorage.getItem('userDetails');
  const storedUserData = JSON.parse(storedUserDataString);
  const userId = storedUserData?._id;



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title) {
      newErrors.title = 'Title is required.';
    }

    if (!formData.description) {
      newErrors.description = 'Description is required.';
    }
    if (!formData.duration) {
      newErrors.duration = 'Duration is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm()
  }, [formData])

  const handleActivateClick = async () => {
    setSubmitAttempted(true);
    if (!validateForm()) {
      return;
    }
    const adData = {
      broker_id: userId,
      property_id: SinglePropertyId._id,
      title: formData.title,
      description: formData.description,
      durationInMonths: formData.duration

    }
    try {
      setLoading(true);
      const response = await activeadCreate(adData);
      if (response.status == 200) {
        showToaterMessages(response?.data.message, "success");
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
              <CustomButton
                startIcon={<PaymentIcon fontSize="small" />}
                variant="outlined"
                size="small"
              ButtonText={"35,000"}
                
              />
              <Typography variant="subtitle2"
                sx={{ alignSelf: "center", color: colors.GRAY }}>
                Your balance
              </Typography>
            </Box>
            <Box sx={{ ml: 1 }}>
              <CustomButton
                startIcon={<AddCardIcon fontSize="small" />}
                variant="outlined"
                size="small"
                onClick={() => {
                  handleClose();
                }}
              
                ButtonText={"Add"}
              />
            </Box>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ minWidth: 300, }}>
        <Grid container spacing={2}>
          <NewInputFieldStructure label={'Your personalized link to share'} isEdit={false} value={'https://dsjdjusdi.com'}
          />
          <NewInputFieldStructure label='Title (10 words)' isFull
            name="title"
            error={submitAttempted && !!errors.title}
            helperText={submitAttempted && errors.title ? errors.title : ''}
            value={formData.title}
            onChange={handleInputChange}
          />
          <NewInputFieldStructure label='Description (50 words)' isFull multiline
            name="description"
            error={submitAttempted && !!errors.description}
            helperText={submitAttempted && errors.description ? errors.description : ''}
            value={formData.description}
            onChange={handleInputChange}
          />
          <NewSelectTextFieldStructure label='Duration (Months)' isEdit={true} variant='standard'
            name="duration"
            error={submitAttempted && !!errors.duration}
            helperText={submitAttempted && errors.duration ? errors.duration : ''}
            value={formData.duration}
            handleChange={handleInputChange}
            list={tempList}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box sx={{ textAlign: "end" }}>
          <CustomButton
            startIcon={<DoneIcon fontSize="small" />}
            variant="contained"
            size="small"
            onClick={handleActivateClick}
            disabled={isLoading}
          
            ButtonText={isLoading ? <Loader /> : 'Activate'}
          />
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
