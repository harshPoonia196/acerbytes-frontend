"use client";

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import HistoryCard from "Components/Consultant/PaymentHistory/HistoryCard";
import CustomConsultantBreadScrumbs from "Components/CommonLayouts/CustomConsultantBreadScrumbs";
import ConsultantAddCreditPopup from "Components/Consultant/PaymentHistory/Modal/ConsultantAddCreditPopup";
import AddCardIcon from "@mui/icons-material/AddCard";
import { useAuth } from "utills/AuthContext";
import { getBrokerBalance, getPaymentHisotryList } from "api/Broker.api";
import { useSnackbar } from "utills/SnackbarContext";
import Loading from "Components/CommonLayouts/Loading";
import { listOfPages } from "Components/NavBar/Links";
import InfoBox from "Components/CommonLayouts/CommonHeader";

function PaymentHistory(props) {
  const { setBrokerPoints, brokerBalance, userDetails } = useAuth();
  const [openAddCredit, setOpenAddCredit] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [initialMount, setInitialMount] = React.useState(true);

  const handleOpenAddCredit = () => {
    setOpenAddCredit(true);
  };

  const handleCloseAddCredit = () => {
    setOpenAddCredit(false);
  };

  React.useEffect(() => {
    // This block will run only on initial mount
    if (initialMount) {
      setInitialMount(false);
      return;
    }

    if (userDetails && Object.keys(userDetails).length) {
      getBrokerPaymentHistory();

      window.location?.pathname !== listOfPages.consultantPaymentHistory &&
        getBrokerpointBalance();
    }
  }, [userDetails && Object.keys(userDetails).length, initialMount]);
  const { openSnackbar } = useSnackbar();

  const showToaterMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  const getBrokerPaymentHistory = async () => {
    try {
      setLoading(true);
      const response = await getPaymentHisotryList();
      if (response.status == 200) {
        setPaymentHistory(response?.data?.data);
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error payment history request",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const getBrokerpointBalance = async () => {
    try {
      const response = await getBrokerBalance();
      if (response.status == 200) {
        setBrokerPoints(response?.data?.data?.balance || 0);
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
          error?.message ||
          "Error getbroker balance request",
        "error"
      );
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <ConsultantAddCreditPopup
        open={openAddCredit}
        handleClose={handleCloseAddCredit}
      />
      <CustomConsultantBreadScrumbs text="Payment history" />
      <InfoBox
        title="Anand Gupta(Admin)"
        subtitle="3,344 property consultant links are currently active"
        pagename="pagename"
      />
      <Box sx={{ backgroundColor: "white" }}>
        <Container>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3">Balance: {brokerBalance}</Typography>
              <Typography variant="h6" sx={{ flex: 1, alignSelf: "center" }}>
                My payment and points credit history
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box>
                <Button
                  startIcon={<AddCardIcon />}
                  size="small"
                  variant="contained"
                  onClick={handleOpenAddCredit}
                >
                  Add credits
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container>
        {paymentHistory?.map((history, index) => {
          return <HistoryCard history={history} key={index} />;
        })}
      </Container>
    </>
  );
}

export default PaymentHistory;
