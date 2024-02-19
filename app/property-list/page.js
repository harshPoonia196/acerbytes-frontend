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
import NewMultiSelectAutoCompleteInputStructure from "Components/CommonLayouts/NewMultiSelectAutoCompleteInputStructure";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";


function PropertyList() {

  const [alignment, setAlignment] = useState(1);
  console.log(alignment)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(PAGINATION_LIMIT + 7);

  const [property, setProperty] = useState([])
  const [count, setCount] = useState([])
  const [isLoading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [focus, setFocus] = useState(false)
  const inputRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  const [projectCategory, setProjectCategory] = useState([
    { label: "Residential", value: "Residential" },
    { label: "Luxury flats", value: "Luxury flats" },
  ]);

  const [propertyTypes, setPropertyTypes] = useState([
    { label: "Shop", value: "Shop" },
    { label: "Restaurant", value: "Restaurant" },
    { label: "Pent house", value: "Pent house" },
    { label: "Flat", value: "Flat" },
    { label: "Land", value: "Land" },
    { label: "Retail space", value: "Retail space" },
    { label: "Studio apartment", value: "Studio apartment" },
    { label: "Food court", value: "Food court" },
    { label: "Builder floor", value: "Builder floor" },
    { label: "Villa", value: "Villa" },
    { label: "Independent house", value: "Independent house" }
  ]);

  const [status, setStatus] = useState([
    { label: "completed", value: "completed" },
    { label: "RERA approved", value: "RERA approved" },
    { label: "Launch", value: "Launch" },
    { label: "Under construction", value: "Under construction" },
    { label: "CC", value: "CC" },
    { label: "OC", value: "OC" },
    { label: "Delivered", value: "Delivered" },
    { label: "Registeration", value: "Registeration" },
    { label: "Resale", value: "Resale" },
    { label: "Residential", value: "Residential" },
    { label: "Commercial", value: "Commercial" }
  ]);

  const [unitType, setUnitType] = useState([
    { label: "1 BHK", value: "1 BHK" },
    { label: "2 BHK", value: "2 BHK" },
    { label: "3 BHK", value: "3 BHK" },
    { label: "4 BHK", value: "4 BHK" },
    { label: "5 BHK", value: "5 BHK" },
    { label: "6 BHK", value: "6 BHK" },
    { label: "7 BHK", value: "7 BHK" },
    { label: "8 BHK", value: "8 BHK" },
    { label: "9 BHK", value: "9 BHK" },
    { label: "10 BHK", value: "10 BHK" },
    { label: "11 BHK", value: "11 BHK" },
   
  ]);

  const [city, setCity] = useState([
    { label: "bangalore", value: "bangalore" },
    { label: "haidrabad", value: "haidrabad" },
  ]);

  const [location, setLocation] = useState([
    { label: "Andhra", value: "Andhra" },
    { label: "Andhra", value: "Andhra" },
    { label: "Gujarat", value: "Gujarat" },
  ]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term)
    setFocus(true)
  };

  const objectToQueryString = (obj) => {
    const queryString = Object.keys(obj)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
      )
      .join("&");

    return queryString;
  };

  const getUserPropertyList = async (pageOptions, searchTerm, selectedOptions, alignment) => {
    try {
      const data = {}
      Object.keys(selectedOptions).map(item=> data[item] = selectedOptions[item].value)
      setLoading(true);
      const querParams = {
        ...pageOptions,
        ...(searchTerm ? { search: searchTerm } : {}),
        ...(data ? {searchParams: JSON.stringify(data)} : {}),
        sortBy: alignment, 

      };
      console.log(querParams)
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

    getUserPropertyList(pageOptions, debouncedSearchTerm, selectedOptions, alignment)
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [debouncedSearchTerm, currentPage, pageLimit, selectedOptions, alignment]);

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedOptions]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); 

    return () => clearTimeout(timerId);
  }, [searchTerm, selectedOptions]);

  const handleChangePage = (event, newPage) => {
    const page = newPage + 1;
    setCurrentPage(page);
    const pageOptions = {
      pageLimit,
      page,
    };
    getUserPropertyList(pageOptions, searchTerm, selectedOptions, alignment)
  };

  const handleChangeRowsPerPage = (event) => {
    setPageLimit(parseInt(event.target.value, 10));
    setCurrentPage(1);
    const pageOptions = {
      pageLimit,
      page: 1,
    };
    getUserPropertyList(pageOptions, searchTerm, selectedOptions, alignment)

  };

  const handleChange = (event, value) => {
    if(value === "dec"){
      setAlignment(-1);
    }else{
      setAlignment(1);
    }
  };

  const handleOptionChange = (key, value) => {
    if(value){
      setSelectedOptions(prevOptions => ({
        ...prevOptions,
        [key]: value,
      }));
    }else{
      setSelectedOptions(prevOptions => {
        delete prevOptions[key]
        return ({
        ...prevOptions,
      })});
    }

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

          <Grid container spacing={2} columns={36}>
            {/* commercial,residential */} {/*please delete this after done and same for all below*/}
            <NewMultiSelectAutoCompleteInputStructure label="Category"  list={projectCategory} handleChange={(event, value)=> handleOptionChange("category", value[0])} value={selectedOptions.category ? [selectedOptions.category] : []}/>
            {/* Flat,shop */}
            <NewMultiSelectAutoCompleteInputStructure label="Property type" list={propertyTypes} handleChange={(event, value)=> handleOptionChange("propertyType", value[0])} value={selectedOptions.propertyType ? [selectedOptions.propertyType] : []}/>
            {/* 1BHK, 2BHK */}
            <NewMultiSelectAutoCompleteInputStructure label="Unit type" list={unitType} handleChange={(event, value)=> handleOptionChange("unitType", value[0])} value={selectedOptions.unitType ? [selectedOptions.unitType] : []}/>
            {/* Noida,gurgoan */}
            <NewMultiSelectAutoCompleteInputStructure label="City" list={city} handleChange={(event, value)=> handleOptionChange("city", value[0])} value={selectedOptions.city ? [selectedOptions.city] : []}/>
            {/* Sector/area */}
            <NewMultiSelectAutoCompleteInputStructure label="Location" list={location} handleChange={(event, value)=> handleOptionChange("location", value[0])} value={selectedOptions.location ? [selectedOptions.location] : []}/>
            <NewMultiSelectAutoCompleteInputStructure label="Status" list={status} handleChange={(event, value)=> handleOptionChange("status", value[0])} value={selectedOptions.status ? [selectedOptions.status] : []}/>
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
                value={alignment === 1 ? "asc" : "dec" }
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
            <Grid item xs={36}>
              <Card>
                <CustomSearchInput value={searchTerm}  onChange={handleSearch} ref={inputRef}  autoFocus={focus}/>
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
                    <PropertyCard createdDate={propertyDetails?.created_at} isShortListPageCard={propertyDetails?.isFav} propertyDetails={propertyDetails} />
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