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
import SuggestedLeadsTable from "Components/Consultant/ConsultantSuggestedLeads/SuggestedLeadsTable";

function MyLeads() {
  const { userDetails } = useAuth();

  const router = useRouter();
  const [leadsCount, setLeadsCount] = useState("");

  return (
    <>
      <CustomConsultantBreadScrumbs text="Suggested Leads" />
      <InfoBox
        dataList={[{ label: 'Suggested Leads', value: leadsCount }]}
        label={'My Suggested Leads'}
      />
      <Container>
        <Box sx={{ textAlign: 'end', mb: 2 }}>

        </Box>
        <SuggestedLeadsTable setLeadsCount={setLeadsCount} /> 
      </Container>
    </>
  );
}

export default MyLeads;
