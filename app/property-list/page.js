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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import React, { useEffect, useRef, useState } from "react";
import {
  getAllOptionData,
  getAllOptions,
  getAllProperty,
  getLocations,
} from "api/Property.api";
import { useSnackbar } from "utills/SnackbarContext";
import Loader from "Components/CommonLayouts/Loading";
import {
  DEBOUNCE_TIMER,
  PAGINATION_LIMIT,
  PAGINATION_LIMIT_OPTIONS,
} from "Components/config/config";
import NewMultiSelectAutoCompleteInputStructure from "Components/CommonLayouts/NewMultiSelectAutoCompleteInputStructure";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import NewAutoCompleteInputStructure from "Components/CommonLayouts/NewAutoCompleteInputStructure";
import colors from "styles/theme/colors";
import {
  objectToQueryString,
  transformDocuments,
  transformDocumentsLocation,
} from "utills/CommonFunction";
import { debounce } from "lodash";

function PropertyList() {
  const [alignment, setAlignment] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(PAGINATION_LIMIT);

  const [property, setProperty] = useState([]);
  const [count, setCount] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = debounce(performSearch, DEBOUNCE_TIMER);
  const [focus, setFocus] = useState(false);
  const inputRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [propertyvalue, setPropertyvalue] = useState("");
  const [buttonColor, setButtonColor] = useState("");
  const [selectOption, setSelectOption] = useState({});
  const [isDisablePropertyType, setIsDisablePropertyType] = useState(true);
  const [isDisableLayoutType, setIsDisableLayoutType] = useState(true);
  const [locationData, setLocationData] = useState([]);
  const [cities, setCities] = useState([]);
  const [layoutTypeApplicable, setLayoutTypeApplicable] = useState([]);
  const [locationDisable, setLocationDisable] = useState(true);
  const [selectedCity, setSelectedCity] = useState([]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFocus(true);
  };

  const getUserPropertyList = async (
    pageOptions,
    searchTerm,
    selectedOptions,
    alignment,
    propertyvalue
  ) => {
    try {
      setLoading(true);
      let data = {};
      Object.keys(selectedOptions).forEach((key) => {
        const value = selectedOptions[key];
        if (Array.isArray(value) && value.length > 0) {
          data[key] = value.map((option) => option.value);
        } else if (
          !Array.isArray(value) &&
          value !== undefined &&
          value !== null
        ) {
          // For single-select scenarios or when value is directly usable and not an empty selection
          // Check for non-array values that are not undefined or null, then wrap in an array
          data[key] = [value];
        }
      });
      let querParams = {
        ...pageOptions,
        ...(searchTerm ? { search: searchTerm } : {}),
        ...(data ? { searchParams: JSON.stringify(data) } : {}),
        sortBy: alignment,
        key: propertyvalue,
      };
      if (Object.keys(data).length === 0) {
        delete querParams["searchParams"];
      }
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

  const getAllOptionDataList = async () => {
    try {
      let res = await getAllOptions();
      if (res.status === 200) {
        let transform = transformDocuments(res.data.data);
        setSelectOption({ ...transform });
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

  const getLocationsCall = async () => {
    try {
      let res = await getLocations();
      if (res.status === 200) {
        let transformLocation = transformDocumentsLocation(res.data.data);
        setLocationData({ ...transformLocation });
        setCities(Object.keys(transformLocation));
      } else {
        console.log("err");
      }
    } catch (err) {
      openSnackbar("Error getting location  details", "error");
    }
  };

  const handleOptionChange = (key, value) => {
    // unitType
    if (key === "city") {
      setLocationDisable(false);
      setSelectedCity(value);
    } else if (key === "category") {
      setIsDisablePropertyType(false);
    } else if (key === "propertyType") {
      setIsDisableLayoutType(false);
      setLayoutTypeApplicable(value);
    }
    const updatedValue = (prevOptions) => {
      const tempObje = { ...prevOptions };
      if (key === "category") {
        delete tempObje.propertyType;
        delete tempObje.unitType;
      } else if (key === "city") {
        delete tempObje.location;
      } else if (key === "propertyType") {
        delete tempObje.unitType;
      }
      return {
        ...tempObje,
        [key]: value,
      };
    };
    if (value) {
      setSelectedOptions((prevOptions) => {
        return updatedValue(prevOptions);
      });
    } else {
      setSelectedOptions((prevOptions) => {
        const newOptions = { ...prevOptions };
        delete newOptions[key];
        return newOptions;
      });
    }
  };

  const { openSnackbar } = useSnackbar();
  const showToaterMessages = (message, severity) => {
    openSnackbar(message, severity);
  };

  function performSearch() {
    const pageOptions = {
      pageLimit,
      page: currentPage,
    };

    getUserPropertyList(
      pageOptions,
      searchTerm,
      selectedOptions,
      alignment,
      propertyvalue
    );
  }

  useEffect(() => {
    // const pageOptions = {
    //   pageLimit,
    //   page: currentPage,
    // };

    // getUserPropertyList(
    //   pageOptions,
    //   searchTerm,
    //   selectedOptions,
    //   alignment,
    //   propertyvalue
    // );
    if (inputRef.current) {
      inputRef.current.focus();
    }
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [
    currentPage,
    searchTerm,
    pageLimit,
    selectedOptions,
    alignment,
    propertyvalue,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedOptions, alignment, propertyvalue]);

  useEffect(() => {
    getAllOptionDataList();
    getLocationsCall();
  }, []);

  const handleChangePage = (event, newPage) => {
    const page = newPage + 1;
    setCurrentPage(page);
    const pageOptions = {
      pageLimit,
      page,
    };
    getUserPropertyList(
      pageOptions,
      searchTerm,
      selectedOptions,
      alignment,
      propertyvalue
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setPageLimit(parseInt(event.target.value, 10));
    setCurrentPage(1);
    const pageOptions = {
      pageLimit,
      page: 1,
    };
    getUserPropertyList(
      pageOptions,
      searchTerm,
      selectedOptions,
      alignment,
      propertyvalue
    );
  };

  const handleChange = (event, value) => {
    if (value === "dec") {
      setAlignment(-1);
    } else {
      setAlignment(1);
    }
  };

  const handleChangeData = (event, value) => {
    setButtonColor(value);
    setPropertyvalue(value);
    if (value === "price" || value === "area" || value === "completion") {
      setAlignment(1);
    } else {
      setAlignment(-1);
    }
  };

  const handleChangeAllData = (event, value) => {
    const newAlignment = value === "dec" ? -1 : 1;
    setAlignment(newAlignment);
    setButtonColor("");
    const pageOptions = {
      pageLimit,
      page: 1,
    };
    setPropertyvalue("");
    getUserPropertyList(
      pageOptions,
      searchTerm,
      selectedOptions,
      newAlignment,
      propertyvalue
    );
  };

  return (
    <>
      <>
        {isLoading && <Loader />}
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
            <NewAutoCompleteInputStructure
              xs={18}
              sm={12}
              md={6}
              label="Category"
              list={selectOption?.projectCategory}
              handleChange={(event, value) =>
                handleOptionChange("category", value)
              }
              value={selectedOptions.projectCategory}
            />
            {/* Flat,shop */}
            <NewAutoCompleteInputStructure
              xs={18}
              sm={12}
              md={6}
              label="Property type"
              disabled={isDisablePropertyType}
              list={
                selectedOptions?.category === "Commercial"
                  ? selectOption?.commercialProjectType
                  : selectOption?.residentialProjectType
              }
              handleChange={(event, value) =>
                handleOptionChange("propertyType", value)
              }
              value={
                selectedOptions?.propertyType
                  ? selectedOptions?.propertyType
                  : ""
              }
            />
            {/* 1BHK, 2BHK */}
            <NewAutoCompleteInputStructure
              xs={18}
              sm={12}
              md={6}
              label="Layout type"
              disabled={isDisableLayoutType}
              list={
                selectOption?.layoutTypeApplicable?.includes(
                  selectedOptions?.propertyType
                )
                  ? selectOption.layoutType
                  : ""
              }
              handleChange={(event, value) =>
                handleOptionChange("unitType", value)
              }
              value={selectedOptions.unitType ? selectedOptions.unitType : ""}
            />
            {/* Noida,gurgoan */}
            <NewAutoCompleteInputStructure
              xs={18}
              sm={12}
              md={6}
              label="City"
              list={cities}
              handleChange={(event, value) => handleOptionChange("city", value)}
              value={selectedOptions.city}
            />
            {/* Sector/area */}
            <NewAutoCompleteInputStructure
              xs={18}
              sm={12}
              md={6}
              label="Location"
              disabled={locationDisable}
              list={selectedCity ? locationData[selectedCity] : []}
              handleChange={(event, value) =>
                handleOptionChange("location", value)
              }
              value={selectedOptions.location ? selectedOptions.location : ""}
            />
            <NewAutoCompleteInputStructure
              xs={18}
              sm={12}
              md={6}
              label="Status"
              list={selectOption?.status}
              handleChange={(event, value) =>
                handleOptionChange("status", value)
              }
              value={selectedOptions.status}
            />
            <Grid item xs={36} sm={18} sx={{ alignSelf: "center" }}>
              <Typography
                variant="subtitle2"
                sx={{ alignSelf: "center", color: colors.GRAY }}
              >
                Sort by
              </Typography>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChangeData}
                aria-label="Platform"
                sx={{ display: "flex" }}
                size="small"
              >
                <ToggleButton
                  value="score"
                  selected={buttonColor === "score"}
                  sx={{ flex: 1 }}
                >
                  Score <ArrowUpwardIcon fontSize="small" />{" "}
                  <ArrowDownwardIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton
                  value="price"
                  selected={buttonColor === "price"}
                  sx={{ flex: 1 }}
                >
                  Price <ArrowUpwardIcon fontSize="small" />{" "}
                  <ArrowDownwardIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton
                  value="area"
                  selected={buttonColor === "area"}
                  sx={{ flex: 1 }}
                >
                  Area <ArrowUpwardIcon fontSize="small" />{" "}
                  <ArrowDownwardIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton
                  value="completion"
                  selected={buttonColor === "completion"}
                  sx={{ flex: 1 }}
                >
                  Completion <ArrowUpwardIcon fontSize="small" />{" "}
                  <ArrowDownwardIcon fontSize="small" />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={36} sm={18} sx={{ alignSelf: "center" }}>
              <Typography
                variant="subtitle2"
                sx={{ alignSelf: "center", color: colors.GRAY }}
              >
                Ascending / Descending
              </Typography>
              <ToggleButtonGroup
                color="primary"
                value={alignment === 1 ? "asc" : "dec"}
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
                <CustomSearchInput
                  value={searchTerm}
                  onChange={handleSearch}
                  inputRef={inputRef}
                  autoFocus={focus}
                />
              </Card>
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
    </>
  );
}

export default PropertyList;
