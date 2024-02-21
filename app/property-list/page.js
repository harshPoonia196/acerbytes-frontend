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
  TablePagination,
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
import NewMultiSelectAutoCompleteInputStructure from "Components/CommonLayouts/NewMultiSelectAutoCompleteInputStructure";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";

function PropertyList() {
  const [alignment, setAlignment] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(PAGINATION_LIMIT + 7);

  const [property, setProperty] = useState([]);
  const [count, setCount] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [focus, setFocus] = useState(false);
  const inputRef = useRef(null);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFocus(true);
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
        ...(searchTerm ? { search: searchTerm } : {}),
      };
      let res = await getAllProperty(objectToQueryString(querParams));
      if (res.status === 200) {
        setProperty(res.data?.data || []);
        setCount(res.data);
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

    getUserPropertyList(pageOptions, debouncedSearchTerm);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [debouncedSearchTerm, currentPage, pageLimit]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const handleChangePage = (event, newPage) => {
    const page = newPage + 1;
    setCurrentPage(page);
    const pageOptions = {
      pageLimit,
      page,
    };
    getUserPropertyList(pageOptions, searchTerm);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageLimit(parseInt(event.target.value, 10));
    setCurrentPage(1);
    const pageOptions = {
      pageLimit,
      page: 1,
    };
    getUserPropertyList(pageOptions, searchTerm);
  };

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Container maxWidth="lg">
            <Card sx={{ mb: 2 }}>
              <Grid
                container
                sx={{ display: "flex", flexDirection: "row-reverse" }}
              >
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
                      flourishing business environment have contributed to its
                      status as a vibrant and attractive real estate destination
                      in the NCR region.
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Card>

            <Grid container spacing={2} columns={36}>
              {/* commercial,residential */}{" "}
              {/*please delete this after done and same for all below*/}
              <NewMultiSelectAutoCompleteInputStructure label="Category" />
              {/* Flat,shop */}
              <NewMultiSelectAutoCompleteInputStructure label="Property type" />
              {/* 1BHK, 2BHK */}
              <NewMultiSelectAutoCompleteInputStructure label="Unit type" />
              {/* Noida,gurgoan */}
              <NewMultiSelectAutoCompleteInputStructure label="City" />
              {/* Sector/area */}
              <NewMultiSelectAutoCompleteInputStructure label="Location" />
              <NewMultiSelectAutoCompleteInputStructure label="Status" />
              <Grid container spacing={1}>
                <Grid
                  item
                  xs={18}
                  sm={6}
                  md={5.9}
                  sx={{ alignSelf: "center", m: "1rem" }}
                >
                  <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    sx={{ display: "flex" }}
                    size="small"
                  >
                    <ToggleButton value="score" sx={{ flex: 1 }}>
                      Score
                    </ToggleButton>
                    <ToggleButton value="price" sx={{ flex: 1 }}>
                      Price
                    </ToggleButton>
                    <ToggleButton value="area" sx={{ flex: 1 }}>
                      Area
                    </ToggleButton>
                    <ToggleButton value="completion" sx={{ flex: 1 }}>
                      Completion
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>

                {/* Toggle buttons for sorting order */}
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={5.7}
                  sx={{ alignSelf: "center", mt: "0.1rem" }}
                >
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
                      Low to high
                    </ToggleButton>
                    <ToggleButton value="dec" sx={{ flex: 1 }}>
                      <ArrowDownwardIcon fontSize="small" />
                      High to low
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Grid>
              {/* <Grid item xs={18} sx={{ alignSelf: "center" }}>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                sx={{ display: "flex" }}
                size="small"
              >
                <ToggleButton value="score" sx={{ flex: 1 }}>
                  Score
                </ToggleButton>
                <ToggleButton value="price" sx={{ flex: 1 }}>
                  Price
                </ToggleButton>
                <ToggleButton value="area" sx={{ flex: 1 }}>
                  Area
                </ToggleButton>
                <ToggleButton value="completion" sx={{ flex: 1 }}>
                  Completion
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={18} sx={{ alignSelf: "center" }}>
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
                  Low to high
                </ToggleButton>
                <ToggleButton value="dec" sx={{ flex: 1 }}>
                  <ArrowDownwardIcon fontSize="small" />
                  High to low
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid> */}
              <Grid item xs={36}>
                <Card>
                  <CustomSearchInput
                    value={searchTerm}
                    onChange={handleSearch}
                    ref={inputRef}
                    autoFocus={focus}
                  />
                </Card>
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
              <Grid item xs={36}>
                <Grid container spacing={0.25}>
                  {property?.map((propertyDetails) => (
                    <Grid item xs={12}>
                      <PropertyCard
                        createdDate={propertyDetails?.created_at}
                        isShortListPageCard={propertyDetails?.isFav}
                        propertyDetails={propertyDetails}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid sx={{ marginLeft: "auto", marginRight: "0" }}>
                <TablePagination
                  sx={{
                    overflow: "hidden",
                  }}
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
        </>
      )}
    </>
  );
}

export default PropertyList;
