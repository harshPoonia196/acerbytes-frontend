'use client'

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import EnquiriesTable from "Components/Admin/Enquiries/EnquiriesTable";
import CustomBreadScrum from "Components/CommonLayouts/CustomBreadScrumbs";

function Enquiries() {
  return (
    <>
      <Box sx={{ backgroundColor: "white" }}>
        <Container
          maxWidth="lg"
          sx={{ pb: "0 !important" }}
        >
          <CustomBreadScrum text='List of leads' />
        </Container>
      </Box>
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
