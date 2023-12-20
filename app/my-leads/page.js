import React from "react";
import { Container, Typography } from "@mui/material";
import MyLeadsTable from "Components/ConsultantLeads/MyLeadsTable";

function MyLeads() {
  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 2 }}>
        My Leads
      </Typography>
      <MyLeadsTable />
    </Container>
  );
}

export default MyLeads;
