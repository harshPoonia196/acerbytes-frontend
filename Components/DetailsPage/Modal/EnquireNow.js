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
import { countries, enquiryFormKey, enquiryFormOpen, propertyRedirectKey } from "utills/Constants";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import { getAllOptions, getCities } from "api/Property.api";

function EnquireNow(props) {
  const { open, handleClose, handleAction, submitEnquiry, submitEnquiryUnath } = props;
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
  const [allCountryCodeOptions, setAllCountryCodeOptions] = React.useState([]);

  React.useEffect(() => {
    let userDetail = getLoggedInUser();
    if (userDetail) {
      setFormData((formData) => ({
        ...formData,
        firstName: userDetail?.name?.firstName || "",
        lastName: userDetail?.name?.lastName || "",
        countryCode: userDetail?.phone?.countryCode || countries[0]?.value,
        number: userDetail?.phone?.number,
      }));
      clearItem(enquiryFormKey);
    } else {
      userDetail = getItem(enquiryFormKey);
      setFormData((formData) => ({
        ...formData,
        firstName: userDetail?.firstName || "",
        lastName: userDetail?.lastName || "",
        countryCode: userDetail?.countryCode || countries[0]?.value,
        number: userDetail?.number,
      }));
    }
    getDropdownOptions();
  }, [open]);

  const getDropdownOptions = async () => {
    try {
      const allOptionsResponse = await getAllOptions();
      if (allOptionsResponse?.data?.data?.length > 0) {
        const countryCodeOptions = allOptionsResponse?.data?.data?.find(rs => rs.name == "Country code")?.childSub || []
        setAllCountryCodeOptions(countryCodeOptions);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
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
            countryCodeOptions={allCountryCodeOptions || []}
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
                  setItem(enquiryFormOpen, true);
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
                if (token) {
                  submitEnquiry({
                    ...formData,
                    brokerCollectionId: props?.brokerCollectionId || "",
                  });
                } else {
                  submitEnquiryUnath({
                    ...formData,
                    brokerCollectionId: props?.brokerCollectionId || "",
                  });
                  setItem(enquiryFormKey, formData);
                  handleAction();
                }
                handleClose();
              }}
              disabled={
                !formData?.countryCode ||
                formData?.number?.length !== 10 ||
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
