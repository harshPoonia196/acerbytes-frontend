import { useEffect, useState } from "react";
import {
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
import { ToasterMessages } from "utills/Constants";
import Loader from "Components/CommonLayouts/Loading";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import { listOfPages } from "Components/NavBar/Links";

function ActivateAdsPopup({ open, handleClose, SinglePropertyId, detailsGetProperty, brokerBalance, propertyUrl }) {

  const router = useRouter();
  const tempList = [
    { label: '1 month', value: '1' },
    { label: '2 months', value: '2' },
    { label: '3 months', value: '3' },
    { label: '4 months', value: '4' }
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

    const titleWords = formData.title.trim().split(/\s+/);
    const descriptionWords = formData.description.trim().split(/\s+/);
    if (!formData.title) {
      newErrors.title = 'Title is required.';
    } else if (titleWords.length >= 10) { // Check if title max to has 10 words
      newErrors.title = 'Title must be max up to 10 words.';
    }

    if (!formData.description) {
      newErrors.description = 'Description is required.';
    } else if (descriptionWords.length >= 50) {
      newErrors.description = 'Description must be max up to 50 words.';
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
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ flex: 1, alignSelf: { xs: 'start', sm: 'center' } }}>
            <Typography variant="h4" sx={{ fontWeight: 700, }}>
              Activate your link
            </Typography>
            <Typography variant="subtitle2"
              sx={{ alignSelf: "center", color: colors.GRAY, display: { xs: 'block', sm: 'none' } }}>
              Balance: {brokerBalance} points
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignSelf: 'end', }}>
            <Box sx={{ ml: 1, textAlign: 'end' }}>
              <CustomButton
                startIcon={<AddCardIcon fontSize="small" />}
                variant="outlined"
                size="small"
                onClick={() => router.push(listOfPages.consultantPaymentHistory)}
                ButtonText={"Add"}
              />
              <Typography variant="subtitle2"
                sx={{ alignSelf: "center", color: colors.GRAY, display: { xs: 'none', sm: 'block' } }}>
                Balance: {brokerBalance} points
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ minWidth: 300, }}>
        <Grid container spacing={2}>
          <NewInputFieldStructure isFull disabled isMultiline={true} label={'Your personalized link to share'} isEdit={true} value={propertyUrl ? propertyUrl : ""}
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
            ButtonText={isLoading ? 'Activating' : 'Activate'}
          />
          <Typography variant="subtitle2"
            sx={{ alignSelf: "center", color: colors.GRAY }}>
            10,000 points required
          </Typography>
        </Box>
      </DialogActions>
    </Dialog >
  );
}

export default ActivateAdsPopup;
