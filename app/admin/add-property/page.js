"use client";

import {
    Container,
    Grid,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import NavTab from "Components/Admin/Property/NavTab";
import { listOfTabsInAddProperty } from "Components/CommonLayouts/CommonUtils";
import throttle from "lodash/throttle";
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

    const [activeState, setActiveState] = React.useState(null);

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

    React.useEffect(
        () => () => {
            clearTimeout(unsetClickedRef.current);
        },
        []
    );

    const classes = useStyles();

    const [isEdit, setIsEdit] = useState(true);

    return (
        <>
            <nav className={classes.demo2}>
                <NavTab value={activeState} handleChange={handleClick} list={itemsServer} />
            </nav>
            <Container>
                <div className="container">
                    <Grid container spacing={2} sx={{ flex: 1, overflow: "auto" }}>
                        <ProjectCard isEdit={isEdit} />
                        <RegulatoryCard isEdit={isEdit} />
                        <LandscapeCard isEdit={isEdit} />
                        <FloorPlanCard isEdit={isEdit} />
                        <FacilitiesCard isEdit={isEdit} />
                        <LocationCard isEdit={isEdit} />
                        <ResalePriceCard isEdit={isEdit} />
                        <BuilderPriceCard isEdit={isEdit} />
                        <InvestmentCard isEdit={isEdit} />
                        <PropertyConsultantsCard isEdit={isEdit} />
                        <OverallAssessmentCard isEdit={isEdit} />
                        {/* <BankCard isEdit={isEdit} /> */}
                        <MarketingCard isEdit={isEdit} />
                    </Grid>
                </div>
            </Container>
        </>
    );
}

export default AddProperty;
