'use client'

import React, { useState } from "react";
import { Box, Container, Typography, Button, ToggleButton, ToggleButtonGroup, Card } from "@mui/material";
import MyLeadsTable from "Components/Consultant/ConsultantLeads/MyLeadsTable";
import UpdateLeadStatus from "Components/Consultant/ConsultantLeads/Modal/UpdateLeadStatus";

function MyLeads() {
  const [openUpdatePopup, setOpenUpdatePopup] = useState()
  const handleOpenUpdatePopup = () => {
    setOpenUpdatePopup(true)
  }

  const handleCloseUpdatePopup = () => {
    setOpenUpdatePopup(false)
  }

  const [alignment, setAlignment] = React.useState('all');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
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
          onChange={handleChange}
          aria-label="Platform"
          sx={{ display: 'flex' }}
        >
          <ToggleButton size='small' value="all" sx={{ flex: 1, border: 'none' }}>All (10)</ToggleButton>
          <ToggleButton size='small' value="active" sx={{ flex: 1, border: 'none' }}>Active (10)</ToggleButton>
        </ToggleButtonGroup>
      </Card>
      <Box>
        <Button onClick={handleOpenUpdatePopup}>Add update</Button>
      </Box>
      <MyLeadsTable />
    </Container>
  );
}

export default MyLeads;
