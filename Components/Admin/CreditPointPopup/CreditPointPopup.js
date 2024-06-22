import {
  Box,
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
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";

function AdminCreditPointsPopup({ open, brokerId, handleClose, handleSubmit }) {
  const [isLoading, setLoading] = React.useState(false);
  const [salesPersons, setSalesPersons] = React.useState([]);
  const [consultantList, setConsultantsList] = React.useState([]);
  const [creditInfo, setCreditInfo] = React.useState({
    brokerGoogleID: brokerId || "",
  });

  const { openSnackbar } = useSnackbar();

  const showTostMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  React.useEffect(() => {
    getSalesPersonsList();
    getConsultantList();
    generateOrderNumber();
  }, [open]);

  const getSalesPersonsList = async () => {
    try {
      setLoading(true);
      const response = await getSalesPersons();
      if (response.status == 200) {
        setSalesPersons(response?.data?.data);
      }
    } catch (error) {
      showTostMessages(
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
      const isReset = true;
      if (response.status == 200) {
        const randomNumber = response?.data?.data;
        updateCreditInfo(
          {
            target: {
              name: "orderNumber",
              value:
                typeof randomNumber === "string"
                  ? randomNumber.toUpperCase()
                  : "",
            },
          },
          isReset
        );
      }
    } catch (error) {
      showTostMessages(
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
      showTostMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error creating order request",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateCreditInfo = (event, isReset) => {
    const key = event.target.name;
    const value = event.target.value;

    console.log({
      key,
      value,
    });
    if (isReset) {
      setCreditInfo({
        brokerGoogleID: brokerId || "",
        [key]: value,
      });
    } else {
      setCreditInfo({
        ...creditInfo,
        [key]: value,
      });
    }
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
      handleClose();
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

  const salesPersonInfo = salesPersons?.find(
    (rs) => rs.googleID == creditInfo.salesPerson
  )?.name;

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { borderRadius: "8px !important" } }}
      open={open}
      onClose={handleClose}
      className="creditPopup"
    >
      <DialogTitle onClose={handleClose}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Add Credit points for Consultant
        </Typography>
        <Typography variant="body1">
          Credit Points are required to buy services on AcreBytes
        </Typography>
      </DialogTitle>
      <DialogContent>
        {isLoading && <Loading />}
        <Grid container spacing={2}>
          <InputField
            type="number"
            name="approvedPayment"
            value={creditInfo.approvedPayment}
            label="Enter received payment"
            isAmount={true}
            handleChange={updateCreditInfo}
            halfSm
          />
          <InputField
            type="number"
            name="approvedPoints"
            value={creditInfo.approvedPoints}
            label="Enter assigned points"
            isPoint={true}
            handleChange={updateCreditInfo}
            halfSm
          />
          <NewAutoCompleteInputStructure
            label="Select Property Consultant"
            variant="standard"
            handleChange={(e, newValue) =>
              updateCreditInfo({
                target: {
                  name: "brokerGoogleID",
                  value: newValue?.value ? newValue?.value : "",
                },
              })
            }
            value={{
              label: consultantInfo?.firstName
                ? `${consultantInfo?.firstName} ${consultantInfo?.lastName} - ${consultantInfo?._id}`
                : "",
              value: creditInfo?.brokerGoogleID,
            }}
            list={consultantList?.map((rs) => {
              return {
                label: `${rs.name?.firstName} ${rs.name?.lastName}`,
                value: rs._id,
              };
            })}
            className="creditPopup-textfield"
          />
          <NewAutoCompleteInputStructure
            label="Select Sales person"
            variant="standard"
            handleChange={(e, newValue) =>
              updateCreditInfo({
                target: {
                  name: "salesPerson",
                  value: newValue?.value ? newValue?.value : "",
                },
              })
            }
            value={{
              label: salesPersonInfo?.firstName
                ? `${salesPersonInfo?.firstName} ${salesPersonInfo?.lastName}`
                : "",
              value: creditInfo?.salesPerson,
            }}
            list={salesPersons?.map((rs) => {
              return {
                label: `${rs.name?.firstName} ${rs.name?.lastName}`,
                value: rs.googleID,
              };
            })}
            className="creditPopup-textfield"
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CustomButton
            variant="outlined"
            sx={{ mr: 2 }}
            onClick={handleClose}
            ButtonText={"Close"}
          />
          <CustomButton
            disabled={validateFields()}
            variant="contained"
            onClick={saveHandler}
            ButtonText={"Submit"}
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default AdminCreditPointsPopup;
