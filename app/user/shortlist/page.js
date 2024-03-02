"use client";

import {
  Container,
  Grid,
  Card,
  Box,
  Typography,
} from "@mui/material";
import PropertyCard from "Components/PropertyList/PropertyCard";
import React, { useEffect, useRef, useState } from "react";
import CustomSearchInput from "Components/CommonLayouts/SearchInput";
import { getAllfavouriteProperty } from "api/Property.api";
import { useSnackbar } from "utills/SnackbarContext";
import Loading from "Components/CommonLayouts/Loading";

function ShortList() {
  const [alignment, setAlignment] = useState("asc");

  const [favouriteProperty, setfavouriteProperty] = useState([])
  const [isLoading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [focus, setFocus] = useState(false)
  const inputRef = useRef(null);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
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

  const getAllfavouritePropertyList = async (searchTerm) => {
    try {
      const querParams = {
        ...(searchTerm ? { search: searchTerm } : {})
      };
      setLoading(true);
      let res = await getAllfavouriteProperty(objectToQueryString(querParams));
      if (res.status === 200) {
        setfavouriteProperty(res?.data?.data);
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
    getAllfavouritePropertyList(debouncedSearchTerm)
    if (inputRef.current) {
      inputRef.current.focus();
      setFocus(true)
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchTerm]);


  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <>
      {isLoading && <Loading />}

      <Box sx={{ background: 'white', borderBottom: '1px solid whitesmoke', boxShadow: '1px 2px 2px -2px gainsboro!important' }}>
        <Container maxWidth='lg'>
          <Typography variant='h3' sx={{ my: 2, ml: 2 }}>
            My favourite Properties ({favouriteProperty?.length})
          </Typography>
          <Card>
            <CustomSearchInput value={searchTerm} onChange={handleSearch} inputRef={inputRef} autoFocus={focus} />
          </Card>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={0.25}>
              {favouriteProperty.map((property, index) => {
                return (
                  <Grid item xs={12} key={property._id}>
                    <PropertyCard isShortListPageCard propertyDetails={property?.propertyData} createdDate={property?.created_at} />
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ShortList;
