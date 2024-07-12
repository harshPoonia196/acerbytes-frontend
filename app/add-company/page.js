"use client"

import { Container, Grid, Card, Box, Typography, Divider,
    Tabs,
    Tab,
    tabsClasses, Fab } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react'
import dynamic from "next/dynamic";
import LocationCard from "Components/Company/LocationCard";
const ImageCard = dynamic(
    () => import("Components/Company/ImageCard"),
    {
      ssr: false,
    }
  );
import ServicesCard from 'Components/Company/ServicesCard';
  
import throttle from "lodash/throttle";
 import SaveIcon from "@mui/icons-material/Save";
import CompanyDetails from 'Components/Company/CompanyDetails';

 const listOfPropertyDetailsTab = [
    {
      label: "Company Details",
      value: "companyDetails",
    },
    {
      label: "Location",
      value: "location",
    },
    {
      label: "Services",
      value: "services",
    },
    {
      label: "Marketing",
      value: "marketing",
    },
  ];

const formState = {
    company: {
        companyName: "",
    },
    location: {
        state: "",
        city: "",
        sector: "",
        sectionScore: 0,
        pointsGained: 0,
        area: "",
        pinCode: "",
        googleMapLink: "",
        longitude: "",
        latitude: "",
        assessment: {},
    },
    marketing: {
        image: "",
        logoImage: "",
        tagLine: "",
        description: "",
        metaDescription: "",
      },
}

const AddCompany = () => {

    const [activeState, setActiveState] = useState(null);

    
    const tabHeight = 200;
    const noop = () => { };

    function useThrottledOnScroll(callback, delay) {
        const throttledCallback = React.useMemo(
          () => (callback ? throttle(callback, delay) : noop),
          [callback, delay]
        );
      
        useEffect(() => {
          if (throttledCallback === noop) return undefined;
      
          window.addEventListener("scroll", throttledCallback);
          return () => {
            window.removeEventListener("scroll", throttledCallback);
            throttledCallback.cancel();
          };
        }, [throttledCallback]);
      }

    let itemsServer = listOfPropertyDetailsTab.map((tab) => {
        const hash = tab.value;
        return {
          text: tab.label,
          hash: hash,
          node: document.getElementById(hash),
        };
      });
    
      const itemsClientRef = useRef([]);

      useEffect(() => {
        itemsClientRef.current = itemsServer;
      }, [itemsServer]);
    
      const clickedRef = useRef(false);
      const unsetClickedRef = useRef(null);
    
      const findActiveIndex = React.useCallback(() => {
        // set default if activeState is null
        if (activeState === null) setActiveState(itemsServer[0].hash);
    
        // Don't set the active index based on scroll if a link was just clicked
        if (clickedRef.current) return;
    
        let active;
        for (let i = itemsClientRef.current.length - 1; i >= 0; i -= 1) {
          if (document.documentElement.scrollTop < 0) {
            active = { hash: null };
            break;
          }
    
          const item = itemsClientRef.current[i];
    
          if (
            item.node &&
            item.node.offsetTop <
            document.documentElement.scrollTop +
            document.documentElement.clientHeight / 8 +
            tabHeight
          ) {
            active = item;
            break;
          }
        }
    
        if (active && activeState !== active.hash) {
          setActiveState(active.hash);
        }
      }, [activeState, itemsServer]);
    
      //!` Corresponds to 10 frames at 60 Hz
      useThrottledOnScroll(itemsServer.length > 0 ? findActiveIndex : null, 166);
    
      const handleChange = (hash) => {
        // Used to disable findActiveIndex if the  scrolls due to a clickpage
        clickedRef.current = true;
        unsetClickedRef.current = setTimeout(() => {
          clickedRef.current = false;
        }, 1000);
    
        if (activeState !== hash) {
          setActiveState(hash);
    
          if (window)
            window.scrollTo({
              top:
                document.getElementById(hash)?.getBoundingClientRect().top +
                window.pageYOffset -
                tabHeight,
              behavior: "smooth",
            });
        }
      };
    
      useEffect(
        () => () => {
          clearTimeout(unsetClickedRef.current);
        },
        []
      );

    const defaultValue = itemsServer.length > 0 ? itemsServer[0].hash : undefined;

    const [selectOptions, setSelectOption] = useState({
        companyName: ['option1', 'option2'],
    });
    const [isEdit, setIsEdit] = useState(true);
    const [errors, setErrors] = useState({});
    const [editForm, setEditForm] = useState(false);
    const [form, setForm] = useState(formState);
    const [cities, setCities] = useState([]);
    const [hide, setHide] = useState([]);
    // const handleChange = () => {
    // }

    const handleSave = () => {
    }

    const checkMandatoryFields = () => {
    }

  return (
    <Box>
            
        <Box sx={{ 
            backgroundColor: "#fff",
            position: "sticky",
            top: {xs: 54, sm: 64},
            left: 0,
            right: 0,
            zIndex: 100,
            }}>
            
                <Tabs
                    value={activeState || defaultValue}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="visible arrows tabs example"
                    className="propertyTabs"
                    sx={{
                    [`& .${tabsClasses.scrollButtons}`]: {
                        "&.Mui-disabled": { opacity: 0.3 },
                    },
                    boxShadow: "-1px 8px 6px -6px gainsboro!important",
                    }}
                >
                    {itemsServer.map((current) => (
                    <Tab
                        key={current.hash}
                        label={current.text}
                        value={current.hash}
                        onClick={() => handleChange(current.hash)}
                    />
                    ))}
                </Tabs>
            
        </Box>
        <Container maxWidth="md">
            <Grid item xs={12}>
            <CompanyDetails 
                errors={errors}
                hide={hide}
                cities={cities}
                selectOptions={selectOptions}
                form={form}
                formState={formState}
                handleChange={handleChange}
                isEdit={isEdit}/>

            <LocationCard
                errors={errors}
                hide={hide}
                cities={cities}
                selectOptions={selectOptions}
                form={form}
                handleChange={handleChange}
                isEdit={isEdit}
            />
             <ServicesCard 
            errors={errors}
            hide={hide}
            selectOptions={selectOptions}
            form={form}
            handleChange={handleChange}
            isEdit={isEdit}/>

            <ImageCard 
            errors={errors}
            hide={hide}
            form={form}
            handleChange={handleChange}
            isEdit={isEdit} />
            
        </Grid>
        </Container>
        <Box
        sx={{
          position: "fixed",
          right: 16,
          bottom: 16,
          // display: { xs: "none", evmd: "flex" },
        }}
      >
        <Fab
          variant="extended"
          sx={{ justifyContent: "flex-start" }}
          onClick={handleSave}
        >
          <SaveIcon fontSize="small" sx={{ mr: 1 }} />
          Save
        </Fab>
      </Box>
    </Box>
  )
}

export default AddCompany