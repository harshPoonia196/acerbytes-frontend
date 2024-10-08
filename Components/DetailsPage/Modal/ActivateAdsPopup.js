import { useEffect, useState } from "react";
import {
  Grid,
  DialogActions,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { useRouter } from "next/navigation";
import AddCardIcon from "@mui/icons-material/AddCard";
import NewInputFieldStructure from "Components/CommonLayouts/NewInputFieldStructure";
import colors from "styles/theme/colors";
import NewSelectTextFieldStructure from "Components/CommonLayouts/NewSelectTextFieldStructure";
import { activeadCreate } from "api/Property.api";
import { useSnackbar } from "utills/SnackbarContext";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import { listOfPages } from "Components/NavBar/Links";
import { getBrokerBalance } from "api/Broker.api";
import dayjs from "dayjs";  // import dayjs for date manipulation

function ActivateAdsPopup({
  open,
  handleClose,
  propertyData,
  detailsGetProperty,
  brokerBalance,
  propertyUrl,
  setBrokerPoints,
  isFromUniqueUrl,
}) {
  const router = useRouter();

  const tempList = [
    { label: "1 month", value: "1" },
    { label: "2 months", value: "2" },
    { label: "3 months", value: "3" },
    { label: "4 months", value: "4" },
  ];

  const pointsMapping = {
    1: 2500,
    2: 4500,
    3: 6000,
    4: 7000,
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "1",
  });
  const [pointsRequired, setPointsRequired] = useState(
    pointsMapping[formData.duration]
  );
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const storedUserDataString = localStorage.getItem("userDetails");
  const storedUserData = JSON.parse(storedUserDataString);
  const userId = storedUserData?._id;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "duration") {
      setPointsRequired(pointsMapping[value]);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title) {
      newErrors.title = "Title is required.";
    } else if (!formData.duration) {
      newErrors.duration = "Duration is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  useEffect(() => {
    if (
      propertyData?.marketing?.tagLine ||
      propertyData?.propertyData?.marketing?.tagLine
    ) {
      setFormData({
        ...formData,
        title:
          propertyData?.marketing?.tagLine ||
          propertyData?.propertyData?.marketing?.tagLine,
      });
    }
  }, [propertyData]);

  const handleActivateClick = async () => {
    setSubmitAttempted(true);
    if (!validateForm()) {
      return;
    }
    const adData = {
      broker_id: userId,
      property_id: isFromUniqueUrl
        ? propertyData?.property_id
        : propertyData._id,
      title: formData.title,
      description: formData.description,
      durationInMonths: formData.duration,
    };
    try {
      setLoading(true);
      const response = await activeadCreate(adData);
      if (response.status == 200) {
        showTostMessages(response?.data.message, "success");
        detailsGetProperty(isFromUniqueUrl ? false : true);
        handleClose();
        getBrokerPointBalance();
      }
    } catch (error) {
      showTostMessages(
        error?.response?.data?.message ||
        error?.message ||
        "Error generating order number request",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const getBrokerPointBalance = async () => {
    try {
      const response = await getBrokerBalance();
      if (response.status == 200) {
        setBrokerPoints(response?.data?.data?.balance || 0);
      }
    } catch (error) {
      showTostMessages(
        error?.response?.data?.message ||
        error?.message ||
        "Error getbroker balance request",
        "error"
      );
    }
  };

  const { openSnackbar } = useSnackbar();
  const showTostMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  const calculateNewExpiryDate = () => {
    const currentExpiryDate = dayjs(propertyData?.expired_at);
    const newExpiryDate = currentExpiryDate.add(parseInt(formData.duration), 'month');
    return newExpiryDate.format('MMMM D, YYYY');
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle onClose={handleClose}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1, alignSelf: { xs: "start", sm: "center" } }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {isFromUniqueUrl ? "Extend" : "Activate"} your link
            </Typography>
            <Typography sx={{fontSize:'12px'}}>
              {isFromUniqueUrl && `till ${calculateNewExpiryDate()}`}
            </Typography>
            {/* <Typography
              variant="subtitle2"
              sx={{
                alignSelf: "center",
                color: colors.GRAY,
                display: { xs: "block", sm: "none" },
              }}
            >
              Balance: {brokerBalance} points
            </Typography> */}
          </Box>
          {/* <Box sx={{ display: "flex", alignSelf: { xs: "center", sm: "end" } }}>
            <Box sx={{ ml: 1, textAlign: "end" }}>
              
            </Box>
          </Box> */}
        </Box>
      </DialogTitle>
      <DialogContent sx={{ minWidth: 300 }}>
        <Grid container spacing={2}>
          <NewInputFieldStructure
            className="activeLinkURL"
            isFull
            disabled
            isMultiline={true}
            label={"Your personalized link to share"}
            isEdit={true}
            value={propertyUrl ? propertyUrl : ""}
          />
          <NewInputFieldStructure
            label="Title"
            isFull
            variant="outlined"
            name="title"
            error={submitAttempted && !!errors.title}
            helperText={submitAttempted && errors.title ? errors.title : ""}
            value={formData.title}
            onChange={handleInputChange}
          />
          <NewInputFieldStructure
            label="Description"
            isFull
            multiline
            variant="outlined"
            name="description"
            error={submitAttempted && !!errors.description}
            helperText={
              submitAttempted && errors.description ? errors.description : ""
            }
            value={formData.description}
            onChange={handleInputChange}
          />
          <NewSelectTextFieldStructure
            label="Duration (Months)"
            isEdit={true}
            full
            variant="outlined"
            name="duration"
            error={submitAttempted && !!errors.duration}
            helperText={
              submitAttempted && errors.duration ? errors.duration : ""
            }
            value={formData.duration}
            handleChange={handleInputChange}
            list={tempList}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            textAlign: "end",
            paddingTop: "10px",
            justifyContent: "space-between",
            display: "flex",
            width: "100%",
          }}
        >
          <Box sx={{ml: 0, textAlign: "left"}}>
            <CustomButton
              startIcon={<AddCardIcon fontSize="small" />}
              variant="outlined"
              size="small"
              onClick={() =>
                router.push(listOfPages.consultantPaymentHistory)
              }
              ButtonText={"Add points"}
            />
            <Typography
              variant="subtitle2"
              sx={{
                alignSelf: "center",
                color: colors.GRAY,
                display: { xs: "block", sm: "block" },
              }}
            >
              Balance: {brokerBalance} points
            </Typography>
          </Box>

          <Box>
            <CustomButton
              startIcon={<DoneIcon fontSize="small" />}
              variant="contained"
              size="small"
              onClick={handleActivateClick}
              disabled={isLoading}
              ButtonText={isLoading ? "Activating" : isFromUniqueUrl ? "Extend" : "Activate"}
            />

            <Typography
              variant="subtitle2"
              sx={{ alignSelf: "center", color: colors.GRAY }}
            >
              {pointsRequired.toLocaleString()} points required
            </Typography>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default ActivateAdsPopup;
