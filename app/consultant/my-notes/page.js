"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Card,
} from "@mui/material";
import UpdateLeadStatus from "Components/Consultant/ConsultantLeads/Modal/UpdateLeadStatus";
import MyLeadsStatus from "Components/Consultant/ConsultantLeads/MyLeadsStatus";
import { listOfPages } from "Components/NavBar/Links";
import { useRouter } from "next/navigation";
import CustomConsultantBreadScrumbs from "Components/CommonLayouts/CustomConsultantBreadScrumbs";
import InfoBox from "Components/CommonLayouts/CommonHeader";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
function MyNotes() {
  const router = useRouter();

  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const handleOpenUpdatePopup = () => {
    setOpenUpdatePopup(true);
  };

  const handleCloseUpdatePopup = () => {
    setOpenUpdatePopup(false);
  };

  const [alignment, setAlignment] = React.useState("notes");

  const handleChange = (event, newAlignment) => {
    newAlignment != null && setAlignment(newAlignment);
  };

  return (
    <>
      <CustomConsultantBreadScrumbs text="My notes" />
      <InfoBox
        title="Anand Gupta(Admin)"
        subtitle="3,344 property consultant links are currently active"
        
      />
      <Container>
        <Typography variant="h6" sx={{ mb: 2 }}>
          My Leads
        </Typography>
        <UpdateLeadStatus
          open={openUpdatePopup}
          handleClose={handleCloseUpdatePopup}
        />
        <Card sx={{ mb: 2 }}>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            aria-label="Platform"
            sx={{ display: "flex" }}
          >
            <ToggleButton
              size="small"
              value="all"
              sx={{ flex: 1, border: "none" }}
              onClick={() => {
                router.push(listOfPages.consultantMyLeads);
              }}
            >
              All (10)
            </ToggleButton>
            <ToggleButton
              size="small"
              value="notes"
              sx={{ flex: 1, border: "none" }}
            >
              Notes (10)
            </ToggleButton>
          </ToggleButtonGroup>
        </Card>
        <Box sx={{ textAlign: "end", mb: 2 }}>
          <CustomButton
            variant="outlined"
            size="small"
            onClick={handleOpenUpdatePopup}
            ButtonText={"Add notes"}
          />
        </Box>
        <MyLeadsStatus />
      </Container>
    </>
  );
}

export default MyNotes;
