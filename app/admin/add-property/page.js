"use client";

import {
    Box,
    Button,
    Container,
    Grid,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import NavTab from "Components/Admin/Property/NavTab";
import throttle from "lodash/throttle";
import { useSearchParams } from 'next/navigation'
import { makeStyles, withStyles } from "@mui/styles";
import LocationCard from 'Components/Admin/Property/SubComponents/LocationCard';
import ProjectCard from 'Components/Admin/Property/SubComponents/ProjectCard';
import BankCard from 'Components/Admin/Property/SubComponents/BankCard';
import FacilitiesCard from 'Components/Admin/Property/SubComponents/FacilitiesCard';
import LandscapeCard from 'Components/Admin/Property/SubComponents/LandscapeCard';
import FloorPlanCard from 'Components/Admin/Property/SubComponents/FloorPlanCard';
import RegulatoryCard from 'Components/Admin/Property/SubComponents/RegulatoryCard';
import BuilderPriceCard from 'Components/Admin/Property/SubComponents/BuilderPriceCard';
import ResalePriceCard from 'Components/Admin/Property/SubComponents/ResalePriceCard';
import InvestmentCard from 'Components/Admin/Property/SubComponents/InvestmentCard';
import MarketingCard from 'Components/Admin/Property/SubComponents/MarketingCard';
import PropertyConsultantsCard from "Components/Admin/Property/SubComponents/PropertyConsultantsCard";
import OverallAssessmentCard from "Components/Admin/Property/SubComponents/OverallAssessmentCard";
import CustomAdminBreadScrumbs from "Components/CommonLayouts/CustomAdminBreadScrumbs";
import { detailsProperty } from "api/Property.api";
import { listOfTabsInAddProperty } from "utills/Constants";

const tabHeight = 116;

const useStyles = makeStyles((theme) => ({
    demo2: {
        backgroundColor: "#fff",
        position: "sticky",
        top: 54,
        left: 0,
        right: 0,
        zIndex: 100,
        [theme.breakpoints?.up('sm')]: {
            top: 64,
        },
        marginBottom: '16px'
    },
}));

const noop = () => { };

function useThrottledOnScroll(callback, delay) {
    const throttledCallback = React.useMemo(
        () => (callback ? throttle(callback, delay) : noop),
        [callback, delay]
    );

    React.useEffect(() => {
        if (throttledCallback === noop) return undefined;

        window.addEventListener("scroll", throttledCallback);
        return () => {
            window.removeEventListener("scroll", throttledCallback);
            throttledCallback.cancel();
        };
    }, [throttledCallback]);
}

function AddProperty() {
    const router = useSearchParams()
    const [activeState, setActiveState] = React.useState(null);
    const detailsPropertyId = router.get('id')
    let itemsServer = listOfTabsInAddProperty.map((tab) => {
        const hash = tab.value;
        return {
            text: tab.label,
            hash: hash,
            node: document.getElementById(hash),
        };
    });

    const itemsClientRef = React.useRef([]);
    React.useEffect(() => {
        itemsClientRef.current = itemsServer;
    }, [itemsServer]);

    const clickedRef = React.useRef(false);
    const unsetClickedRef = React.useRef(null);
    const findActiveIndex = React.useCallback(() => {
        // set default if activeState is null
        if (activeState === null) setActiveState(itemsServer[0].hash);

        // Don't set the active index based on scroll if a link was just clicked
        if (clickedRef.current) return;

        let active;
        for (let i = itemsClientRef.current.length - 1; i >= 0; i -= 1) {
            // No hash if we're near the top of the page
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

    useThrottledOnScroll(itemsServer.length > 0 ? findActiveIndex : null, 166);

    const handleClick = (hash) => () => {
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
let getProp = async()=>{
    try {
        let res = await detailsProperty(detailsPropertyId);
        if (res.status === 200) {
          setForm({...res.data?.data})
        }
      } catch (error) {
        console.log('see',error)
      }
}
    React.useEffect(
        () => {
getProp()
          return () => {
            clearTimeout(unsetClickedRef.current);
        }
        },[]
    );

    const classes = useStyles();

    const [isEdit, setIsEdit] = useState(true);

    const [form, setForm] = useState({
        overview: {
            builder: '',
            projectName: '',
            projectCategory: '',
            projectType: [],
            phase: '',
            launchYear: '',
            completionYear: '',
            status: '',
            constructionProgress: '',
        },
        regulatoryClearance: {
            reraApproved: '',
            reraNumber: '',
            cc: '',
            oc: '',
            authorityRegistration: '',
            governmentLoan: '',
            privateBankLoan: '',
            fresh: '',
            resale: '',
        },
        layout: {
            numberOfBuildings: '',
            layoutType: [],
            maxFloors: '',
            minFloors: '',
            totalUnits: '',
            area: '',
            greenArea: '',
            unitDensity: '',
            greenDensity: '',
            constructionQuality: 0,
            interiorQuality: 0,
        },
        unitsPlan: [
            {
                propertyType: "dsd",
                propertyLayout: "dsd",
                name: "dssd",
                areaUnit: "dsd",
                areaValue: "dsd",
                bsp: "dsd",
                applicableMonth: "sds",
                applicableYear: "sds"
            }
        ],

        amenitiesData: {
            Basic: {
                Gym: {
                    isApplicable: true,
                    rating: 0,
                },
                Yoga: {
                    isApplicable: true,
                    rating: 0,
                },
                "Swimming pool": {
                    isApplicable: true,
                    rating: 0,
                },
                Club: {
                    isApplicable: true,
                    rating: 0,
                },
                "Fitness center": {
                    isApplicable: true,
                    rating: 0,
                },
                SPA: {
                    isApplicable: true,
                    rating: 0,
                },
            },
            Expected: {
                Pool: {
                    isApplicable: true,
                    rating: 0,
                },
                Yoga: {
                    isApplicable: true,
                    rating: 0,
                },
                "Party hall": {
                    isApplicable: true,
                    rating: 0,
                },
                "Indoor games": {
                    isApplicable: true,
                    rating: 0,
                },
                Spa: {
                    isApplicable: true,
                    rating: 0,
                },
                Clubhouse: {
                    isApplicable: true,
                    rating: 0,
                },
                Jacuzzi: {
                    isApplicable: true,
                    rating: 0,
                },
                Theatre: {
                    isApplicable: true,
                    rating: 0,
                },
                "Barbeque Lawn": {
                    isApplicable: true,
                    rating: 0,
                },
                "Jogging track": {
                    isApplicable: true,
                    rating: 0,
                },
                "Covered Sitting": {
                    isApplicable: true,
                    rating: 0,
                },
                Garden: {
                    isApplicable: true,
                    rating: 0,
                },
                "Wi-fi": {
                    isApplicable: true,
                    rating: 0,
                },
            },
            Desired: {
                Theatre: {
                    isApplicable: true,
                    rating: 0,
                },
                "Barbeque Lawn": {
                    isApplicable: true,
                    rating: 0,
                },
                "Jogging track": {
                    isApplicable: true,
                    rating: 0,
                },
                "Covered Sitting": {
                    isApplicable: true,
                    rating: 0,
                },
                Garden: {
                    isApplicable: true,
                    rating: 0,
                },
                Yoga: {
                    isApplicable: true,
                    rating: 0,
                },
                SPA: {
                    isApplicable: true,
                    rating: 0,
                },
                "Swimming pool": {
                    isApplicable: true,
                    rating: 0,
                },
                Club: {
                    isApplicable: true,
                    rating: 0,
                },
            },
            Unique: {
                Library: {
                    isApplicable: true,
                    rating: 0,
                },
                "Kids play area": {
                    isApplicable: true,
                    rating: 0,
                },
                "Back up": {
                    isApplicable: true,
                    rating: 0,
                },
                "Wi-fi": {
                    isApplicable: true,
                    rating: 0,
                },
                "Gas line": {
                    isApplicable: true,
                    rating: 0,
                },
                "Shopping mart": {
                    isApplicable: true,
                    rating: 0,
                },
            },
        },
        location: {
            state: "",
            city: "",
            sector: '',
            area: "",
            pinCode: "",
            googleMapLink: "",
            longitude: "",
            latitude: "",
        },
        valueForMoney: {
            appTillNow: 0,
            expectedFurtherApp: 0,
            forEndUse: 0
        },
        consultants: [
            {
                id: "",
                name: "",
                profilePic: "",
                rating: 0,
                ratingTag: "",
                clientsServed: 0,
                number: ""
            }
        ],
        marketing: {
            tagLine: "",
            description: ""
        }
    })


    const handleChange = async (e, firstKeyName, secondKeyName, thirdKeyName) => {
        let value = e?.target ? thirdKeyName === 'checked' ? e.target.checked : e.target.value : e
        await setForm((prev) => ({
            ...prev,
            [firstKeyName]: !secondKeyName
                ? value
                : {
                    ...prev?.[firstKeyName],
                    [secondKeyName]: !thirdKeyName
                        ? value
                        : {
                            ...prev?.[firstKeyName]?.[secondKeyName],
                            [thirdKeyName]: value,
                        },
                },
        }))
    }

    console.log(form)

    return (
        <>
            <nav className={classes.demo2}>
                <CustomAdminBreadScrumbs text='Add Property' />
                <NavTab value={activeState} handleChange={handleClick} list={itemsServer} />
            </nav>



            <Container>
                <div className="container">
                    <Grid container spacing={2} sx={{ flex: 1, overflow: "auto" }}>
                        {/* <ProjectCard form={form} handleChange={handleChange} isEdit={isEdit} /> */}
                        <RegulatoryCard form={form} handleChange={handleChange} isEdit={isEdit} />
                        <LandscapeCard form={form} handleChange={handleChange} isEdit={isEdit} />
                        <FloorPlanCard form={form} handleChange={handleChange} isEdit={isEdit} />
                        {/* <FacilitiesCard form={form} isEdit={isEdit} /> */}
                        <LocationCard form={form} handleChange={handleChange} isEdit={isEdit} />
                        {/* <ResalePriceCard isEdit={isEdit} />
                        <BuilderPriceCard isEdit={isEdit} /> */}
                        <InvestmentCard form={form} handleChange={handleChange} isEdit={isEdit} />
                        <PropertyConsultantsCard isEdit={isEdit} />
                        <OverallAssessmentCard isEdit={isEdit} />
                        {/* <BankCard isEdit={isEdit} /> */}
                        <MarketingCard isEdit={isEdit} />
                        <Grid item xs={12} sx={{ textAlign: 'end' }}>
                            <Button variant='contained'>Save</Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    );
}

export default AddProperty;
