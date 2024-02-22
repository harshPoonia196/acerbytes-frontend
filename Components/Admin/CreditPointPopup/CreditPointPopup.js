import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import InputField from "Components/CommonLayouts/InputField";
import NewAutoCompleteInputStructure from "Components/CommonLayouts/NewAutoCompleteInputStructure";
import { getConsultantsPersons, getSalesPersons } from "api/Admin.api";
import React from "react";
import { useSnackbar } from "utills/SnackbarContext";
import Loading from "Components/CommonLayouts/Loading";
import { generateRandorOrderNumber } from "api/Broker.api";

function AdminCreditPointsPopup({ open, brokerId, handleClose, handleSubmit }) {
  const [isLoading, setLoading] = React.useState(false);
  const [salesPersons, setSalesPersons] = React.useState([]);
  const [consultantList, setConsultantsList] = React.useState([]);
  const [creditInfo, setCreditInfo] = React.useState({
    brokerGoogleID: brokerId || "",
  });

  const { openSnackbar } = useSnackbar();

  const showToaterMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  React.useEffect(() => {
    if (open) {
      getSalesPersonsList();
      getConsultantList();
      generateOrderNumber();
      setCreditInfo({});
    }
  }, [open == true]);

  const getSalesPersonsList = async () => {
    try {
      setLoading(true);
      const response = await getSalesPersons();
      if (response.status == 200) {
        setSalesPersons(response?.data?.data);
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error creating order request",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const generateOrderNumber = async () => {
    try {
      setLoading(true);
      const response = await generateRandorOrderNumber();
      if (response.status == 200) {
        const randomNumber = response?.data?.data;
        updateCreditInfo({
          target: {
            name: "orderNumber",
            value:
              typeof randomNumber === "string"
                ? randomNumber.toUpperCase()
                : "",
          },
        });
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error creating order request",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const getConsultantList = async () => {
    try {
      setLoading(true);
      const response = await getConsultantsPersons();
      if (response.status == 200) {
        setConsultantsList(response?.data?.data);
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error creating order request",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateCreditInfo = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    console.log({
      key,
      value,
    });
    setCreditInfo({
      ...creditInfo,
      [key]: value,
    });
  };

  const saveHandler = () => {
    if (
      !isNaN(parseInt(creditInfo.approvedPoints)) &&
      !isNaN(parseInt(creditInfo.approvedPayment))
    ) {
      handleSubmit({
        approvedPayment: creditInfo.approvedPayment,
        approvedPoints: creditInfo.approvedPoints,
        salesPerson: creditInfo.salesPerson,
        brokerGoogleID: creditInfo.brokerGoogleID,
        orderNumber: creditInfo.orderNumber,
      });
    }
  };

  const validateFields = () => {
    if (
      !(
        creditInfo.brokerGoogleID &&
        creditInfo.approvedPoints &&
        creditInfo.approvedPayment &&
        creditInfo.salesPerson
      )
    ) {
      return true;
    }
    return false;
  };

  const consultantInfo = consultantList?.find(
    (rs) => rs._id == creditInfo.brokerGoogleID
  )?.name;

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle onClose={handleClose}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Add credit for Consultant
        </Typography>
        <Typography variant="body1">
          Potential to buy leads from the panel
        </Typography>
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Loading />
        ) : (
          <Grid container spacing={2}>
            <InputField
              type="number"
              name="approvedPayment"
              label="Enter received payment"
              handleChange={updateCreditInfo}
            />
            <InputField
              type="number"
              name="approvedPoints"
              label="Enter assigned points"
              handleChange={updateCreditInfo}
            />
            <NewAutoCompleteInputStructure
              label="Select Consultant"
              handleChange={(e, newValue) =>
                updateCreditInfo({
                  target: {
                    name: "brokerGoogleID",
                    value: newValue?.value ? newValue?.value : "",
                  },
                })
              }
              value={{
                label: `${consultantInfo?.firstName} ${consultantInfo?.lastName}`,
                value: creditInfo?.brokerGoogleID,
              }}
              list={consultantList?.map((rs) => {
                return {
                  label: `${rs.name?.firstName} ${rs.name?.lastName}`,
                  value: rs._id,
                };
              })}
            />
            <NewAutoCompleteInputStructure
              label="Select Sales person"
              handleChange={(e, newValue) =>
                updateCreditInfo({
                  target: {
                    name: "salesPerson",
                    value: newValue?.value ? newValue?.value : "",
                  },
                })
              }
              list={salesPersons?.map((rs) => {
                return {
                  label: `${rs.name?.firstName} ${rs.name?.lastName}`,
                  value: rs.googleID,
                };
              })}
            />
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button variant="outlined" sx={{ mr: 2 }} onClick={handleClose}>
            Close
          </Button>
          <Button
            disabled={validateFields()}
            variant="contained"
            onClick={() => {
              saveHandler();
            }}
          >
            Submit
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default AdminCreditPointsPopup;
