"use client";

import {
  Container,
  Grid,
  Card,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  TablePagination,
  Button,
  Box
} from "@mui/material";
import PropertyCard from "Components/PropertyList/PropertyCard";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useRef, useState } from "react";
import {
  getAllOptions,
  getAllProperty,
  getLocations,
  propertyByCity,
} from "api/Property.api";
import { useSnackbar } from "utills/SnackbarContext";
import Loader from "Components/CommonLayouts/Loading";
import {
  DEBOUNCE_TIMER,
  PAGINATION_LIMIT,
  PAGINATION_LIMIT_OPTIONS,
} from "utills/Constants";
import NewAutoCompleteInputStructure from "Components/CommonLayouts/NewAutoCompleteInputStructure";
import colors from "styles/theme/colors";
import {
  objectToQueryString,
  transformDocuments,
  transformDocumentsLocation,
} from "utills/CommonFunction";
import { debounce } from "lodash";
import NoDataCard from "Components/CommonLayouts/CommonDataCard";
import CustomSearch from "Components/CommonLayouts/CustomSearch";

function PropertyList({ params }) {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [alignment, setAlignment] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(50);

  const [property, setProperty] = useState([]);
  const [count, setCount] = useState({});
  const [isLoading, setLoading] = useState({ loader1: true, loader2: true });
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = debounce(performSearch, DEBOUNCE_TIMER);
  const inputRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState(
    {}
  );
  const [propertyvalue, setPropertyvalue] = useState("");
  const [selectOption, setSelectOption] = useState({});
  const [isDisablePropertyType, setIsDisablePropertyType] = useState(true);
  const [isDisableLayoutType, setIsDisableLayoutType] = useState(true);
  const [locationData, setLocationData] = useState([]);
  const [cities, setCities] = useState([]);
  const [layoutTypeApplicable, setLayoutTypeApplicable] = useState([]);
  const [locationDisable, setLocationDisable] = useState(true);
  const [selectedCity, setSelectedCity] = useState(
    params.location ? [decodeURIComponent(params.location)] : []
  );

  const handleSearchButtonClick = () => {
    performSearch();
    setCurrentPage(1);
  };


  const getUserPropertyList = async (
    pageOptions,
    // searchTerm,
    selectedOptions,
    alignment,
    propertyvalue
  ) => {
    try {
      setLoading(res => ({ ...res, loader1: true }));
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
      if (userDetails?._id) {
        querParams.brokerId = userDetails?._id;
      }
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
      setLoading(res => ({ ...res, loader1: false }));
    }
  };

  const getAllOptionDataList = async () => {
    try {
      let res = await getAllOptions();
      if (res.status === 200) {
        let transform = transformDocuments(res.data.data);
        setSelectOption({ ...transform });
        if (params.location && transform?.builder.includes(decodeURIComponent(params.location))) {
          setSelectedOptions((pre => ({ ...pre, builder: decodeURIComponent(params.location) })));
        }
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
        error?.message ||
        "Error fetching state list",
        "error"
      );
    }
  };

  const getLocationsCall = async (newdata) => {
    try {
      let res = await getLocations();
      if (res.status === 200) {
        const filteredCityDetails = res?.data?.data?.filter(cityDetail =>
          newdata?.some(item => item.city === cityDetail.city));
        let transformLocation = transformDocumentsLocation(filteredCityDetails);
        setLocationData({ ...transformLocation });
        if (params.location && Object.keys(transformLocation).includes(decodeURIComponent(decodeURIComponent(params.location)))) {
          setSelectedOptions({ city: decodeURIComponent(params.location) });
          setLocationDisable(false);
        } else {
          let a = Object.keys(transformLocation)
          for (let index = 0; index < a.length; index++) {
            const element = transformLocation[a[index]];
            if (element.includes(decodeURIComponent(params.location))) {
              setSelectedOptions({
                city: a[index],
                location: decodeURIComponent(params.location)
              });
              setLocationDisable(false);
            }
          }
        }
        setCities(Object.keys(transformLocation));
      } else {
        console.log("err");
      }
    } catch (err) {
      openSnackbar("Error getting location  details", "error");
    }
  };

  const getAllPropertyByCity = async () => {
    try {
      setLoading(res => ({ ...res, loader2: true }));
      let res = await propertyByCity();
      if (res.status === 200) {
        getLocationsCall(res.data.data);
      } else {
        console.log("err");
      }
    } catch (error) {
      showToaterMessages(
        error?.response?.data?.message ||
        error?.message ||
        "Error fetching state list",
        "error"
      );
    } finally {
      setLoading(res => ({ ...res, loader2: false }));
    }
  };

  const handleOptionChange = (key, value) => {
    // unitType
    if (key === "city") {
      setLocationDisable(false);
      setSelectedCity(value);
    } else if (key === "category") {
      setIsDisablePropertyType(false);
      setIsDisableLayoutType(true);
    } else if (key === "propertyType" && selectedOptions.category === 'Residential') {
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

  const handleReset = () => {
    setSearchTerm("");
    setSelectedOptions({});
    setAlignment(-1);
    setPropertyvalue("");
    setIsDisablePropertyType(true);
    setIsDisableLayoutType(true);
    setLocationDisable(true);
    setSelectedCity([]);
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
      // searchTerm,
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
    // searchTerm,
    pageLimit,
    selectedOptions,
    alignment,
    propertyvalue,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedOptions, alignment, propertyvalue]);

  useEffect(() => {
    getAllOptionDataList();
    // getLocationsCall();
    getAllPropertyByCity();
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
      // searchTerm,
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
      // searchTerm,
      selectedOptions,
      alignment,
      propertyvalue
    );
  };

  const handleChangeData = (event, value) => {
    setPropertyvalue(value);
    if (value !== propertyvalue) {
      setAlignment(-1);
    } else {
      if (alignment == 1) {
        setAlignment(-1);
      } else {
        setAlignment(1);
      }
    }
  };

  const getFilterFields = () => {
    return (
      <>
        <NewAutoCompleteInputStructure
          xs={12} md={12}
          label="Builder"
          list={selectOption?.builder}
          handleChange={(event, value) =>
            handleOptionChange("builder", value)
          }
          value={selectedOptions.builder ? selectedOptions.builder : ""}
          clearable
        />
        <NewAutoCompleteInputStructure
          xs={12} md={12}
          label="Category"
          list={selectOption?.projectCategory}
          handleChange={(event, value) =>
            handleOptionChange("category", value)
          }
          value={selectedOptions.category ? selectedOptions.category : ""}
          clearable
        />
        <NewAutoCompleteInputStructure
          xs={12} md={12}
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
          clearable
        />
        <NewAutoCompleteInputStructure
          xs={12} md={12}
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
          clearable
        />
        <NewAutoCompleteInputStructure
          xs={12} md={12}
          label="City"
          list={cities}
          handleChange={(event, value) =>
            handleOptionChange("city", value)
          }
          value={selectedOptions.city ? selectedOptions.city : ""}
          clearable
        />
        <NewAutoCompleteInputStructure
          xs={12} md={12}
          label="Location"
          disabled={locationDisable}
          list={selectedCity ? locationData[selectedCity] : []}
          handleChange={(event, value) =>
            handleOptionChange("location", value)
          }
          value={selectedOptions.location ? selectedOptions.location : ""}
          clearable
        />
        <NewAutoCompleteInputStructure
          xs={12} md={12}
          label="Status"
          list={selectOption?.status}
          handleChange={(event, value) =>
            handleOptionChange("status", value)
          }
          value={selectedOptions.status ? selectedOptions.status : ""}
          clearable
        />
      </>
    )
  }


  return (
    <>
      <>
        {(isLoading?.loader1 || isLoading?.loader2) && <Loader />}
        {

        }
        <Container maxWidth="lg" sx={{ height: "100%" }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Card sx={{ display: { xs: 'none', md: 'block' }, pl: 2, pt:2, pr:1, width: 220, height: "max-content", overflowY: "scroll" }}>
              <Grid container spacing={2}>
                {getFilterFields()}
                <Grid item xs={12} sx={{ alignSelf: "center" }}>
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
                    sx={{ display: "flex"}}
                    size="small"
                    orientation="vertical"
                  >
                    <ToggleButton
                      value="score"
                      selected={propertyvalue === "score"}
                      sx={{ flex: 1, justifyContent: "flex-start" }}
                    >
                      Score{" "}
                      {propertyvalue === "score" &&
                        (alignment === -1 ? (
                          <ArrowDownwardIcon fontSize="small" />
                        ) : (
                          <ArrowUpwardIcon fontSize="small" />
                        ))}
                    </ToggleButton>
                    <ToggleButton
                      value="price"
                      selected={propertyvalue === "price"}
                      sx={{ flex: 1, justifyContent: "flex-start" }}
                    >
                      Price{" "}
                      {propertyvalue === "price" &&
                        (alignment === -1 ? (
                          <ArrowDownwardIcon fontSize="small" />
                        ) : (
                          <ArrowUpwardIcon fontSize="small" />
                        ))}
                    </ToggleButton>
                    <ToggleButton
                      value="area"
                      selected={propertyvalue === "area"}
                      sx={{ flex: 1, justifyContent: "flex-start"}}
                    >
                      Area{" "}
                      {propertyvalue === "area" &&
                        (alignment === -1 ? (
                          <ArrowDownwardIcon fontSize="small" />
                        ) : (
                          <ArrowUpwardIcon fontSize="small" />
                        ))}
                    </ToggleButton>
                    <ToggleButton
                      value="completion"
                      selected={propertyvalue === "completion"}
                      sx={{ flex: 1, justifyContent: "flex-start" }}
                    >
                      Completion{" "}
                      {propertyvalue === "completion" &&
                        (alignment === -1 ? (
                          <ArrowDownwardIcon fontSize="small" />
                        ) : (
                          <ArrowUpwardIcon fontSize="small" />
                        ))}
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
                <Grid
                  item
                  xs={36}
                  sm={36}
                  md={6}
                  sx={{ textAlign: "end", alignSelf: "end" }}
                >
                  <Button
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "white",
                      background: colors?.BLACK,
                      "&:hover": {
                        backgroundColor: colors?.BLACK,
                        boxShadow: "none",
                      },
                    }}
                    startIcon={<CloseIcon />}
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </Card>
            <Box sx={{ flex: 1 }}>




              <Grid container spacing={2}>
                {params.location && (<Grid item xs={36}>
                  <Card>
                    <Grid
                      container
                      sx={{ display: "flex", flexDirection: "row-reverse" }}
                    >
                      {/* <Grid item xs={12} sm={6}>
                  <Card sx={{ boxShadow: "none" }}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m12!1m12!1m3!1d30144.970768064195!2d72.8535903!3d19.1299016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6ee06ebad2b%3A0x9c288235c433657d!2sInfiniti%20Mall!5e0!3m2!1sen!2sin!4v1694174929476!5m2!1sen!2sin"
                      style={{ border: 0 }}
                      height="100%"
                      width="100%"
                      loading="lazy"
                    />
                  </Card>
                </Grid> */}

                      <Grid item xs={12}>
                        <Card
                          sx={{
                            p: 2,
                            height: "100%",
                            boxShadow: "none",
                          }}
                        >
                          <Typography variant="h2">
                            {decodeURIComponent(params.location)}
                          </Typography>
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
                </Grid>)
                }
                <Grid item xs={36}>
                  <Card>
                    <CustomSearch
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value.toLowerCase())}
                      onSearchButtonClick={handleSearchButtonClick}
                      inputRef={inputRef}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSearchButtonClick();
                        }
                      }}
                    />
                  </Card>
                </Grid>
                <Grid item xs={36}>
                  {count?.totalCount === 0 ? (
                    <NoDataCard />
                  ) : (
                    <Grid container spacing={1}>
                      {property?.map((propertyDetails) => (
                        <Grid item xs={12} key={propertyDetails?.id}>
                          <PropertyCard
                            createdDate={propertyDetails?.created_at}
                            isShortListPageCard={propertyDetails?.isFav}
                            propertyDetails={propertyDetails}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Grid>
                <Grid item xs={36} sx={{ marginLeft: "auto", marginRight: "0" }}>
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
            </Box>
          </Box>
        </Container>
      </>
    </>
  );
}

export default PropertyList;
