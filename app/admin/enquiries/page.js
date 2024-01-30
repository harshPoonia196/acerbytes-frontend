'use client'

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import EnquiriesTable from "Components/Admin/Enquiries/EnquiriesTable";
import CustomAdminBreadScrumbs from "Components/CommonLayouts/CustomAdminBreadScrumbs";

function Enquiries() {
  return (
    <>

      <CustomAdminBreadScrumbs text='List of leads' />

      <Container>
        <Typography variant="h6" sx={{ mb: 2 }}>
          List of Enquiries (Admin)
        </Typography>
        <EnquiriesTable />
      </Container>
    </>
  );
}

export default Enquiries;
