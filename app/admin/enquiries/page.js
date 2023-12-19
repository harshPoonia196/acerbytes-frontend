import React from "react";
import { Container, Typography } from "@mui/material";
import EnquiriesTable from "Components/Admin/Enquiries/EnquiriesTable";

function Enquiries() {
  return (
    <Container>
      <Typography variant="h6" sx={{ mb: 2 }}>
        List of Enquiries (Admin)
      </Typography>
      <EnquiriesTable />
    </Container>
  );
}

export default Enquiries;
