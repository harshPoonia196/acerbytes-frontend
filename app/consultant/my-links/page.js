"use client";

import { Box, Card, Container } from '@mui/material'
import React from 'react'
import CustomSearchInput from 'Components/CommonLayouts/SearchInput';
import MyLinksTable from 'Components/Consultant/ConsultantLinks/MyLinksTable';
import CustomConsultantBreadScrumbs from 'Components/CommonLayouts/CustomConsultantBreadScrumbs';

const page = () => {

    return (
        <Container>
            <Box sx={{ backgroundColor: "white" }}>
                <Container
                    maxWidth="lg"
                >
                    <CustomConsultantBreadScrumbs text='Make links' />
                </Container>
            </Box>
            <Card sx={{ mb: 2 }}>
                <CustomSearchInput />
            </Card>
            <MyLinksTable />
        </Container>
    )
}

export default page
