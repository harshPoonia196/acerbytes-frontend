"use client";

import {
    Container,
    Grid,
    Box,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LeftSideLink from "Components/Admin/Property/LeftSideLink";
import RightSideMainSection from "Components/Admin/Property/RightSideMainSection";

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
            <Box
                sx={{
                    display: "flex",
                    gap: "16px",
                    height: `calc(100vh - 100px)`,
                }}
            >
                <Box sx={{ width: "240px", height: "100%", overflow: "hidden", p: 1 }}>
                    <LeftSideLink value={pageLinkToggleAlignment} handleChange={handleChangePageLinkToggle} />
                </Box>
                <Grid container spacing={2} sx={{ flex: 1, overflow: "auto" }}>
                    <RightSideMainSection />
                </Grid>
            </Box>
        </Container>
    );
}

export default AddProperty;
