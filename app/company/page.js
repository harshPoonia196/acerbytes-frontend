"use client"

import Image from 'next/image'
import React, {useState, useEffect, useRef} from 'react'
import {
    Card,
    Container,
    CardActionArea,
    Typography,
    Box,
    Chip,
    Divider,
    Tabs,
    Tab,
    tabsClasses,
    Grid,
    Avatar,
    Button,
    Rating
  } from "@mui/material";
 import Demo from '../../public/images/company.webp'  
 import throttle from "lodash/throttle";
 import PhoneIcon from '@mui/icons-material/Phone';

 const listOfPropertyDetailsTab = [
    {
      label: "Listing",
      value: "companyDetails",
    },
    {
      label: "Links",
      value: "links",
    },
    {
      label: "About",
      value: "about",
    },
    {
      label: "Services",
      value: "services",
    },
    {
      label: "Team",
      value: "team",
    },
    {
      label: "Enquires",
      value: "enquires",
    },
    {
      label: "Credit points",
      value: "creditPoints",
    },
  ];

const Company = () => {
    
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
  return (
    <Box>
        
            <Box sx={{ }}>
                <Card>
                    <Container maxWidth="md" sx={{p:'0 !important'}}>
                        <Image src={Demo} style={{width: '100%'}}/>
                    </Container>
                </Card> 
            </Box>
            
            <Divider sx={{boxShadow: "-1px 8px 6px -6px gainsboro!important"}} />
            <Box sx={{ 
                backgroundColor: "#fff",
                position: "sticky",
                top: {xs: 54, sm: 64},
                left: 0,
                right: 0,
                zIndex: 100,
                }}>
                  
                    <Card sx={{ p: 2, boxShadow: "-1px 8px 6px -6px gainsboro!important" }}>
                    <Container maxWidth="md" sx={{padding: '0 !important'}}> 
                      <Box>
                          <Box sx={{ display: "flex" }}>
                          <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: "flex", gap: 2 }}>
                                  <Avatar
                                      alt="Remy Sharp"
                                      src="/static/images/avatar/1.jpg"
                                      sx={{ width: 100, height: 100 }}
                                  />
                              <Box>
                                  <Typography
                                  variant="h2"
                                  sx={{
                                      fontWeight: "700 !important",
                                      display: { xs: "none", sm: "block" },
                                  }}
                                  >
                                  Company Title
                                  </Typography>
                                  
                                  <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                                      <Typography variant='body1'>Ratings: 4</Typography> 
                                      <br/>
                                      <Rating
                                          readOnly
                                          size="small"
                                          name="hover-feedback"
                                          precision={0.5}
                                          value={4}
                                      />
                                  </Box>
                              </Box>
                              </Box>
                          </Box>
                          <Box
                              sx={{
                              gap: 1,
                              }}
                          >
                              <Button
                                  sx={{ mt: 1, ml: 1 }}
                                  variant="contained"
                                  startIcon={<PhoneIcon />}
                              >
                                  Contact
                              </Button>
                                  
                              
                          </Box>
                          </Box>
                          
                      </Box>
                      </Container>
                    </Card>
                    <Container maxWidth="md" sx={{padding: '0 !important'}}> 
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
                    </Container>
                   
            </Box>
            <Box>
                <Container maxWidth="md" sx={{p:'0 !important'}}>
                    <Grid container spacing={2} id="companyDetails" sx={{mt: 1}}>
                        <Grid item sm={6}>
                            <Card sx={{p:2}}>
                                <Typography variant='h2'>Title</Typography>
                                <Typography variant="body1">Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
                                <Typography variant="body1">It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
                            </Card>
                        </Grid>
                        <Grid item sm={6}>
                            <Card sx={{p:2}}>
                                <Typography variant='h2'>Title</Typography>
                                <Typography variant="body1">Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
                                <Typography variant="body1">It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} id="overview" sx={{mt: 1, pb: 2}}>
                        <Grid item sm={6}>
                            <Card sx={{p:2}}>
                                <Typography variant='h2'>Title</Typography>
                                <Typography variant="body1">It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
                            </Card>
                        </Grid>
                    </Grid> 
                </Container>
            </Box>
        </Box>
  )
}

export default Company