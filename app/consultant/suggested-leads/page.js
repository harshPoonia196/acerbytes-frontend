"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
} from "@mui/material";
import CustomConsultantBreadScrumbs from "Components/CommonLayouts/CustomConsultantBreadScrumbs";
import InfoBox from "Components/CommonLayouts/CommonHeader";
import SuggestedLeadsTable from "Components/Consultant/ConsultantSuggestedLeads/SuggestedLeadsTable";

function MyLeads() {
  const [leadsCount, setLeadsCount] = useState("");

  return (
    <>
      <CustomConsultantBreadScrumbs text="Suggested Leads" />
      <InfoBox
        dataList={[{ label: 'Suggested Leads', value: leadsCount }]}
        label={'My Suggested Leads'}
      />
      <Container>
        <SuggestedLeadsTable setLeadsCount={setLeadsCount} />
      </Container>
    </>
  );
}

export default MyLeads;
