'use client'

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import EnquiriesTable from "Components/Admin/Enquiries/EnquiriesTable";
import CustomAdminBreadScrumbs from "Components/CommonLayouts/CustomAdminBreadScrumbs";
import InfoBox from "Components/CommonLayouts/CommonHeader";
function Enquiries() {
  return (
    <>

      <CustomAdminBreadScrumbs text='List of leads' />
      <InfoBox
        title="Anand Gupta(Admin)"
        subtitle="3,344 property consultant links are currently active"
        pagename="pagename"
      />
      <Container>
        <Typography variant="h6" sx={{ mb: 2,mt:1 }}>
          List of Enquiries (Admin)
        </Typography>
        <EnquiriesTable />
      </Container>
    </>
  );
}

export default Enquiries;
