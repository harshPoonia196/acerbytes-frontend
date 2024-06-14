"use client";

import { Box, Card, Container, Divider, Grid, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import BrokerCard from 'Components/BrokersPage/BrokerCard';
import CustomSearchInput from 'Components/CommonLayouts/SearchInput';
import { useSnackbar } from "utills/SnackbarContext";
import { getBrokersList, getBrokerCityList } from "api/Property.api"
import { debounce } from "lodash";
import { DEBOUNCE_TIMER } from 'utills/Constants';
import NoDataCard from 'Components/CommonLayouts/CommonDataCard';
import SelectTextFields from 'Components/CommonLayouts/SelectTextFields';
import { Padding } from '@mui/icons-material';

const page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = debounce(performSearch, DEBOUNCE_TIMER);
  const [initialMount, setInitialMount] = useState(true);
  const [brokersList, setBrokersList] = useState({ rows: [], totalCount: 0 });
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [city, setCity] = useState("all")

  useEffect(() => {
    getList()
  }, [city])

  useEffect(() => {
    if (initialMount) {
      brokerCityList()
      setInitialMount(false);
      return;
    }

    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm])

  const { openSnackbar } = useSnackbar(),
    showToaterMessages = (message, severity) => {
      openSnackbar(message, severity);
    };

  const getList = async () => {
    try {
      const { data: { data: { data = [], totalCount = 0 } }, status } = await getBrokersList(searchTerm, city);
      setBrokersList({ rows: data, totalCount })
    } catch (error) {
      showToaterMessages(error.message, "error");
    }
  }


  const brokerCityList = async () => {
    try {
      const { data: { data: { data = [] } } } = await getBrokerCityList(),
        cities = [{ label: 'All', value: 'all' }];
      for (let i = 0; i < data.length; i++) {
        const city_data = { label: data[i], value: data[i] };
        cities.push(city_data);
      }
      setCitiesOptions(cities);
    } catch (error) {
      showToaterMessages(error.message, "error");
    }
  }

  function performSearch() {
    getList()
  }

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  },

    handleCityChange = (event) => {
      setCity(event.target.value)
    }


  return (
    <>
      <Box sx={{
        background: 'white', borderBottom: '1px solid whitesmoke', boxShadow: '1px 2px 2px -2px gainsboro!important', position: "sticky",
        top: { xs: 54, sm: 64 }, zIndex: 100
      }}>
        <Container maxWidth='evmd'>
          <Typography variant='h3' sx={{ mb: 2, ml: 2 }}>
            Consultants ({brokersList.totalCount})
          </Typography>


          <Grid sx={{ display: "flex", gap: '2%', mb: 2 }}>
            <Card sx={{ width: '49%' }}>
              <CustomSearchInput sx={{ mt: 1 }} value={searchTerm}
                onChange={handleSearch}
              />
            </Card>
            <Card sx={{ width: '49%' }} className={'select_city_consultant'}>
              <SelectTextFields
                sx={{ mt: 1 }}
                // isEdit={true}
                label="Select City"
                name={"city"}
                value={city}
                handleChange={(e) =>
                  handleCityChange(e)
                }
                list={citiesOptions}
              />
            </Card>
          </Grid>

        </Container>
      </Box>

      <Container maxWidth='evmd'>
        <Grid container spacing={2}>
          {brokersList?.rows?.map((broker) => {

            const type = broker.businessType,
              profilePicture = broker?.brokerPic?.[0]?.profilePicture ?? '';
            broker = { ...broker, type, profilePicture }

            return (
              <Grid item xs={12} key={broker.fullName}>
                <BrokerCard type={'View Reviews'}  showRating={true} broker={broker} noReview hasReviews={true} allBroker={true}/>
              </Grid>
            )
          }
          )}
        </Grid>
        {!brokersList?.rows.length ? <div sx={{ PaddingTop: "16px" }}><NoDataCard title={"No data found"} /></div> : null}
      </Container>
    </>
  )
}

export default page
