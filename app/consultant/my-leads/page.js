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
import MyLeadsTable from "Components/Consultant/ConsultantLeads/MyLeadsTable";
import UpdateLeadStatus from "Components/Consultant/ConsultantLeads/Modal/UpdateLeadStatus";
import MyLeadsStatus from "Components/Consultant/ConsultantLeads/MyLeadsStatus";
import { listOfPages } from "Components/NavBar/Links";
import { useRouter } from "next/navigation";
import CustomConsultantBreadScrumbs from "Components/CommonLayouts/CustomConsultantBreadScrumbs";
import InfoBox from "Components/CommonLayouts/CommonHeader";
import CustomButton from "Components/CommonLayouts/Loading/LoadingButton";
import { useAuth } from 'utills/AuthContext';

function MyLeads() {
  const { userDetails } = useAuth();

  const router = useRouter();
  const [leadsCount, setLeadsCount] = useState("");
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const handleOpenUpdatePopup = () => {
    setOpenUpdatePopup(true);
  };

  const handleCloseUpdatePopup = () => {
    setOpenUpdatePopup(false);
  };

  const [alignment, setAlignment] = React.useState("all");

  const handleChange = (event, newAlignment) => {
    newAlignment != null && setAlignment(newAlignment);
  };

  return (
    <>
      <CustomConsultantBreadScrumbs text="My leads" />
      <InfoBox
        dataList={[{ label: 'Leads', value: leadsCount }]}
        label={'My Leads'}
        button={<CustomButton variant="contained" size="small" onClick={handleOpenUpdatePopup} ButtonText={"Add Notes"} />}
      />
      <Container>
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
            >
              All (10 static)
            </ToggleButton>
            <ToggleButton
              size="small"
              value="notes"
              sx={{ flex: 1, border: "none" }}
              onClick={() => {
                router.push(listOfPages.consultantMyNotes);
              }}
            >
              Notes (10 static)
            </ToggleButton>
          </ToggleButtonGroup>
        </Card>
        <Box sx={{ textAlign: 'end', mb: 2 }}>

        </Box>
        {alignment === "all" ? <MyLeadsTable setLeadsCount={setLeadsCount} /> : <MyLeadsStatus />}
      </Container>
    </>
  );
}

export default MyLeads;
