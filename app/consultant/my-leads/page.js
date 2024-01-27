'use client'

import React, { useState } from "react";
import { Box, Container, Typography, Button, ToggleButton, ToggleButtonGroup, Card } from "@mui/material";
import MyLeadsTable from "Components/Consultant/ConsultantLeads/MyLeadsTable";
import UpdateLeadStatus from "Components/Consultant/ConsultantLeads/Modal/UpdateLeadStatus";
import MyLeadsStatus from "Components/Consultant/ConsultantLeads/MyLeadsStatus";
import { listOfPages } from "Components/NavBar/Links";
import { useRouter } from "next/navigation";
import CustomConsultantBreadScrumbs from 'Components/CommonLayouts/CustomConsultantBreadScrumbs';

function MyLeads() {

  const router = useRouter()

  const [openUpdatePopup, setOpenUpdatePopup] = useState()
  const handleOpenUpdatePopup = () => {
    setOpenUpdatePopup(true)
  }

  const handleCloseUpdatePopup = () => {
    setOpenUpdatePopup(false)
  }

  const [alignment, setAlignment] = React.useState('all');

  const handleChange = (event, newAlignment) => {
    newAlignment != null &&
      setAlignment(newAlignment);
  };

  return (

    <>
      <CustomConsultantBreadScrumbs text='My leads' />
      <Container>
        <Typography variant="h6" sx={{ mb: 2 }}>
          My Leads
        </Typography>
        <UpdateLeadStatus open={openUpdatePopup} handleClose={handleCloseUpdatePopup} />
        <Card sx={{ mb: 2 }}>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            aria-label="Platform"
            sx={{ display: 'flex' }}
          >
            <ToggleButton size='small' value="all" sx={{ flex: 1, border: 'none' }}>All (10)</ToggleButton>
            <ToggleButton size='small' value="notes" sx={{ flex: 1, border: 'none' }}
              onClick={() => { router.push(listOfPages.consultantMyNotes) }}>Notes (10)</ToggleButton>
          </ToggleButtonGroup>
        </Card>
        <Box sx={{ textAlign: 'end', mb: 2 }}>
          <Button variant="outlined" size="small" onClick={handleOpenUpdatePopup}>Add notes</Button>
        </Box>
        {alignment === 'all' ? <MyLeadsTable /> : <MyLeadsStatus />}
      </Container>
    </>
  );
}

export default MyLeads;
