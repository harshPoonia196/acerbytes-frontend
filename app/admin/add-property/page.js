"use client";

import {
    Container,
    Grid,
    Box,
    Card,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LeftSideLink from "Components/Admin/Property/LeftSideLink";
import RightSideMainSection from "Components/Admin/Property/RightSideMainSection";
import NavTab from "Components/Admin/Property/NavTab";

function AddProperty() {

    const router = useRouter()

    const [pageLinkToggleAlignment, setPageLinkToggleAlignment] = React.useState("location");

    const handleChangePageLinkToggle = (event, newAlignment) => {
        if (newAlignment != null) {
            setPageLinkToggleAlignment(newAlignment);
            router.push(`#${newAlignment}`)
        }
    };


    return (
        <Container>

         <NavTab/>


            <Box
                sx={{
                    display: "flex",
                    gap: "16px",
                    height: `calc(100vh - 100px)`,
                    mt:'1rem'
                }}
            >
                <Grid container spacing={2} sx={{ flex: 1, overflow: "auto" }}>
                    <RightSideMainSection />
                </Grid>
            </Box>
        </Container>
    );
}

export default AddProperty;
