'use client'

import React, { useEffect, useRef, useState } from "react";
import { Container, Typography, Card, Box } from "@mui/material";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import PropertyListTable from "Components/Admin/PropertyList/PropertyListTable";
import CustomAdminBreadScrumbs from "Components/CommonLayouts/CustomAdminBreadScrumbs";
import InfoBox from "Components/CommonLayouts/CommonHeader";
import { DEBOUNCE_TIMER } from "utills/Constants";

function PropertyList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [count, setCount] = useState(0);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, DEBOUNCE_TIMER);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  return (
    <>

      <CustomAdminBreadScrumbs text='Property list' />
      <InfoBox
        title="Anand Gupta(Admin)"
        subtitle="3,344 property consultant links are currently active"

      />
      <Container>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {count && count} Properties listed
        </Typography>
        <Card sx={{ mb: 2 }}>
          <CustomSearchInput value={searchTerm} onChange={handleSearch} />
        </Card>
        <PropertyListTable searchText={debouncedSearchTerm} setCount={setCount} />
      </Container>
    </>
  );
}

export default PropertyList;
