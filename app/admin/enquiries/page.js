'use client'

import React, { useState } from "react";
import { Box, Container, Typography, Card, Grid, ToggleButtonGroup, ToggleButton } from "@mui/material";
import EnquiriesTable from "Components/Admin/Enquiries/EnquiriesTable";
import CustomAdminBreadScrumbs from "Components/CommonLayouts/CustomAdminBreadScrumbs";
import InfoBox from "Components/CommonLayouts/CommonHeader";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import { useAuth } from 'utills/AuthContext';
import { LEADS_TAB } from "utills/Constants";

function Enquiries() {
  const [search, setSearch] = useState("");
  const [counts, setCounts] = useState({ leadCounts: 0, pending: 0, reviewed: 0 });
  const [alignment, setAlignment] = useState(''),
    [page, setPage] = useState(0),

    handleSearch = (e) => {
      e.persist();
      setSearch(e.target.value);
    },

    handleChange = (event, newAlignment) => {
      setPage(0);
      setAlignment(newAlignment);
    }

  return (
    <>
      <CustomAdminBreadScrumbs text='List of leads' />
      <InfoBox dataList={[{ label: 'Leads', value: counts.leadCounts }, { label: 'Pending', value: counts.pending }, { label: 'Reviewed', value: counts.reviewed }]} />
      <Container sx={{ paddingBottom: "0px !important"}}>
        <Card sx={{ mb: 0 }}>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            sx={{
              display: 'flex',
              overflowX: 'auto',
            }}
          >
            {LEADS_TAB.map((tab => <ToggleButton size='small' value={tab.value} sx={{ flex: 1, border: 'none', padding: '10px' }}>{tab.label}</ToggleButton>))}
          </ToggleButtonGroup>
        </Card>
      </Container>
      <Container>
        <Card sx={{ mb: 2 }}>
          <CustomSearchInput value={search} onChange={handleSearch} />
        </Card>
        <EnquiriesTable search={search} setCounts={setCounts} alignment={alignment} page={page} setPage={setPage}/>
      </Container>
    </>
  );
}

export default Enquiries;
