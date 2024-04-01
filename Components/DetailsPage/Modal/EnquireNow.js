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
import { useParams, useRouter } from "next/navigation";
import {
  clearItem,
  getItem,
  getLoggedInUser,
  isLoggedIn,
  setItem,
} from "utills/utills";
import React from "react";
import NewPhoneInputFieldStructure from "Components/CommonLayouts/NewPhoneInputFieldStructure";
import { enquiryFormKey, propertyRedirectKey } from "utills/Constants";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";

function EnquireNow(props) {
  const { open, handleClose, handleAction, submitEnquiry } = props;
  const router = useRouter();

  const token = isLoggedIn();

  const param = useParams();

  const paramData = (paramValue) => {
    if (paramValue) {
      const parts = paramValue.split("-");
      if (parts.length > 0) {
        return parts[parts.length - 1];
      }
    }
    return ""; // Default value if not found
  };

  const initialState = {
    // adId: paramData(param?.projectdetails) || paramData(param?.id),
    firstName: "",
    lastName: "",
    countryCode: "91",
    number: "",
  };
  const [formData, setFormData] = React.useState(initialState);
  React.useEffect(() => {
    let userDetail = getLoggedInUser();
    if (userDetail) {
      setFormData((formData) => ({
        ...formData,
        firstName: userDetail?.name?.firstName || "",
        lastName: userDetail?.name?.lastName || "",
        countryCode: userDetail?.phone?.countryCode,
        number: userDetail?.phone?.number,
      }));
    } else {
      userDetail = getItem(enquiryFormKey);
      setFormData((formData) => ({
        ...formData,
        firstName: userDetail?.firstName || "",
        lastName: userDetail?.lastName || "",
        countryCode: userDetail?.countryCode,
        number: userDetail?.number,
      }));
    }
  }, [open]);

  const onChangeHandler = (e, field) => {
    if (e?.persist) {
      e.persist();
    }
    setFormData((prevData) => {
      return { ...prevData, [field]: e?.target?.value };
    });
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }}
      open={open}
      onClose={() => {
        clearItem(enquiryFormKey);
        handleClose();
      }}
    >
      <DialogTitle onClose={handleClose}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Enquire about <span style={{ color: "gray" }}>{props?.propertyData?.overview?.projectName}</span>
        </Typography>
        <Typography variant="body1">
          Connect with professional property consultants only
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <InputField
            halfSm
            label="First name"
            disabled={token}
            value={formData?.firstName}
            handleChange={(e) => onChangeHandler(e, "firstName")}
            required={true}
          />
          <InputField
            halfSm
            label="Last name"
            disabled={token}
            value={formData?.lastName}
            handleChange={(e) => onChangeHandler(e, "lastName")}
            required={true}
          />
          <NewPhoneInputFieldStructure
            label="Phone number"
            isEdit={true}
            disabled={token}
            value1={formData?.countryCode}
            value2={formData?.number}
            handleSelect={(e) => {
              onChangeHandler(e, "countryCode");
            }}
            handleChange={(e) => onChangeHandler(e, "number")}
            required={true}
          />
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
            {token ? (
              <span></span>
            ) : (
              <CustomButton
                startIcon={<GoogleIcon />}
                variant="outlined"
                sx={{ mr: 2 }}
                onClick={() => {
                  setItem(enquiryFormKey, formData);
                  if (param?.projectdetails) {
                    setItem(propertyRedirectKey, param?.projectdetails);
                  } else if (param?.id) {
                    setItem(propertyRedirectKey, "/details/" + param?.id);
                  }
                  router.push("/login");
                }}
                ButtonText={"Existing user, Sign In"}
              />
            )}
            <CustomButton
              startIcon={<DoneIcon />}
              variant="contained"
              onClick={() => {
                console.log("formData: ", formData);
                if (token) {
                  submitEnquiry(formData);
                } else {
                  setItem(enquiryFormKey, formData);
                  handleAction();
                }
                handleClose();
              }}
              disabled={
                !formData?.countryCode ||
                !formData?.number ||
                !formData?.firstName ||
                !formData?.lastName
              }
              ButtonText={"Submit"}
            />
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
