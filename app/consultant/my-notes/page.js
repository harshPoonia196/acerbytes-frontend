"use client";

import React, { useEffect, useState } from "react";
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
        dataList={[{ label: 'Notes', value: '100' }]}
        label={'My Notes'}
        button={<CustomButton
          variant="contained"
          size="small"
          onClick={handleOpenUpdatePopup}
          ButtonText={"Add notes"}
        />}
      />
      <Container>
        <UpdateLeadStatus
          open={openUpdatePopup}
          handleClose={handleCloseUpdatePopup}
        />
        {/* <Card sx={{ mb: 2 }}>
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
              All (10 static)
            </ToggleButton>
            <ToggleButton
              size="small"
              value="notes"
              sx={{ flex: 1, border: "none" }}
            >
              Notes (10 static)
            </ToggleButton>
          </ToggleButtonGroup>
        </Card> */}
        <MyLeadsStatus />
      </Container>
    </>
  );
}

export default MyNotes;
