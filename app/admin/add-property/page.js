"use client";

import {
    Container,
    Grid,
    Box,
    Card,
    Typography,
    Tabs,
    Tab,
    tabsClasses
} from "@mui/material";
import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LeftSideLink from "Components/Admin/Property/LeftSideLink";
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
import ConstructionCard from 'Components/Admin/Property/SubComponents/ConstructionCard';
import BuilderPriceCard from 'Components/Admin/Property/SubComponents/BuilderPriceCard';
import ResalePriceCard from 'Components/Admin/Property/SubComponents/ResalePriceCard';
import InvestmentCard from 'Components/Admin/Property/SubComponents/InvestmentCard';
import MarketingCard from 'Components/Admin/Property/SubComponents/MarketingCard';

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

    // Corresponds to 10 frames at 60 Hz
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
        <Container>
            <nav className={classes.demo2}>
                <NavTab value={activeState} handleChange={handleClick} list={itemsServer} />
            </nav>
            <div className="container">
                <Grid container spacing={2} sx={{ flex: 1, overflow: "auto" }}>
                    <ProjectCard isEdit={isEdit} />
                    <LocationCard isEdit={isEdit} />
                    <LandscapeCard isEdit={isEdit} />
                    <FloorPlanCard isEdit={isEdit} />
                    <RegulatoryCard isEdit={isEdit} />
                    <ConstructionCard isEdit={isEdit} />
                    <BuilderPriceCard isEdit={isEdit} />
                    <ResalePriceCard isEdit={isEdit} />
                    <InvestmentCard isEdit={isEdit} />
                    <BankCard isEdit={isEdit} />
                    <FacilitiesCard isEdit={isEdit} />
                    <MarketingCard isEdit={isEdit} />
                </Grid>
            </div>
        </Container>

    );
}

export default AddProperty;
