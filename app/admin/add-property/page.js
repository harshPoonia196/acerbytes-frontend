"use client";

import {
    Container,
    Grid,
    Box,
    Card,
} from "@mui/material";
import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LeftSideLink from "Components/Admin/Property/LeftSideLink";
import RightSideMainSection from "Components/Admin/Property/RightSideMainSection";
import NavTab from "Components/Admin/Property/NavTab";
import { listOfTabsInAddProperty } from "Components/CommonLayouts/CommonUtils";
import { throttle } from 'lodash';

function AddProperty() {

    const router = useRouter()

    const [pageLinkToggleAlignment, setPageLinkToggleAlignment] = React.useState(listOfTabsInAddProperty[0].value);

    const handleChangePageLinkToggle = (event, newAlignment) => {
        if (newAlignment != null) {
            setPageLinkToggleAlignment(newAlignment);
            router.push(`#${newAlignment}`)
        }
    };

    const sectionRef = useRef([])

    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const newAlignment = entry.target.getAttribute('id');
                    setPageLinkToggleAlignment(newAlignment);
                }
            })

            console.log(entries)
        }, {
            root: null, // Set root to null to use the viewport as the root
            rootMargin: "0px", // Set rootMargin to "0px" to trigger when the top of the section approaches the top of the viewport
            threshold: 1.0, // Set threshold to 1.0 to trigger when the section is fully visible
        })

        sectionRef.current.forEach(section => {
            observer.observe(section)
        })

        return () => {
            // Cleanup observer when component is unmounted
            observer.disconnect();
        };

    }, [])

    const refCallback = useCallback((element) => {
        if (element) {
            sectionRef.current.push(element)
        }
    })

    return (
        <Container>

            <NavTab value={pageLinkToggleAlignment} handleChange={handleChangePageLinkToggle} />

            <Box
                sx={{
                    display: "flex",
                    gap: "16px",
                    height: `calc(100vh - 160px)`,
                    mt: '1rem'
                }}
            >
                <Grid container spacing={2} sx={{ flex: 1, overflow: "auto" }}>
                    <RightSideMainSection refCallback={refCallback} />
                </Grid>
            </Box>
        </Container>
    );
}

export default AddProperty;
