"use client";

import {
  Container,
  Grid,
  Card,
  InputBase,
  Box,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  TablePagination
} from "@mui/material";
import PropertyCard from "Components/PropertyList/PropertyCard";
import SearchIcon from "@mui/icons-material/Search";
import SelectTextFields from "Components/CommonLayouts/SelectTextFields";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import React, { useEffect, useRef, useState } from "react";
import { getAllProperty } from "api/Property.api";
import { useSnackbar } from "utills/SnackbarContext";
import Loader from "Components/CommonLayouts/Loading";
import {
  PAGINATION_LIMIT,
  PAGINATION_LIMIT_OPTIONS,
} from "Components/config/config";

function PropertyList() {
  const [alignment, setAlignment] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(PAGINATION_LIMIT + 7);

  const [property, setProperty] = useState([])
  const [count, setCount] = useState([])
  const [isLoading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [focus, setFocus] = useState(false)
  const inputRef = useRef(null);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term)
  };

  const objectToQueryString = (obj) => {
    const queryString = Object.keys(obj)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
      )
      .join("&");

    return queryString;
  };

  const getUserPropertyList = async (pageOptions, searchTerm) => {
    try {
      setLoading(true);
      const querParams = {
        ...pageOptions,
        ...(searchTerm ? { search: searchTerm } : {})
      };
      let res = await getAllProperty(objectToQueryString(querParams));
      if (res.status === 200) {
        setProperty(res.data?.data?.properties || {});
        setCount(res.data?.data);
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
        error?.message ||
        "Error fetching state list",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const { openSnackbar } = useSnackbar();
  const showToaterMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  useEffect(() => {
    const pageOptions = {
      pageLimit,
      page: currentPage,
    };

    getUserPropertyList(pageOptions, searchTerm)
    if (inputRef.current) {
      inputRef.current.focus();
      setFocus(true)
    }
  }, [searchTerm, currentPage, pageLimit]);

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm]);

  const handleChangePage = (event, newPage) => {
    const page = newPage + 1;
    setCurrentPage(page);
    const pageOptions = {
      pageLimit,
      page,
    };
    getUserPropertyList(pageOptions, searchTerm)
  };

  const handleChangeRowsPerPage = (event) => {
    setPageLimit(parseInt(event.target.value, 10));
    setCurrentPage(1);
    const pageOptions = {
      pageLimit,
      page: 1,
    };
    getUserPropertyList(pageOptions, searchTerm)

  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <>
      {isLoading ? <Loader /> : <>
        <Container maxWidth="lg">
          <Card sx={{ mb: 2 }}>
            <Grid container sx={{ display: "flex", flexDirection: "row-reverse" }}>
              <Grid item xs={12} sm={6}>
                <Card sx={{ boxShadow: "none" }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30144.970768064195!2d72.8535903!3d19.1899016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6ee06ebad2b%3A0x9c288235c433657d!2sInfiniti%20Mall!5e0!3m2!1sen!2sin!4v1694174929476!5m2!1sen!2sin"
                    style={{ border: 0 }}
                    height="100%"
                    width="100%"
                    loading="lazy"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card
                  sx={{
                    p: 2,
                    height: "100%",
                    boxShadow: "none",
                  }}
                >
                  <Typography variant="h2">Noida</Typography>
                  <Typography variant="caption">
                    Noida's strategic location, robust infrastructure, and
                    flourishing business environment have contributed to its status
                    as a vibrant and attractive real estate destination in the NCR
                    region.
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Card>

          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    flex: 1,
                    pl: 2,
                    borderRadius: "8px",
                  }}
                >
                  <InputBase
                    placeholder="Search"
                    type="text"
                    inputProps={{ "aria-label": "Search..." }}
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearch}
                    inputRef={inputRef}
                    autoFocus={focus}
                  />
                  <IconButton type="submit" aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <SelectTextFields label="Sort by" />
            </Grid>
            <Grid item xs={6} sm={3}>
              <SelectTextFields label="Filter by" />
            </Grid>
            <Grid item xs={6} sm={3} sx={{ alignSelf: "center" }}>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                sx={{ display: "flex" }}
                size="small"
              >
                <ToggleButton value="asc" sx={{ flex: 1 }}>
                  <ArrowUpwardIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton value="dec" sx={{ flex: 1 }}>
                  <ArrowDownwardIcon fontSize="small" />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={0.25}>
                {property?.map((propertyDetails) => (
                  <Grid item xs={12}>
                    <PropertyCard isShortListPageCard propertyDetails={propertyDetails} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid sx={{ marginLeft: "auto", marginRight: "0" }}>
              <TablePagination
                rowsPerPageOptions={PAGINATION_LIMIT_OPTIONS}
                component="div"
                count={count?.totalCount}
                rowsPerPage={pageLimit}
                page={currentPage - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />

            </Grid>
          </Grid>
        </Container>
      </>}
    </>
  );
}

export default PropertyList;
