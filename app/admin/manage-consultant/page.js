'use client'

import { Box, Card, Container, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react'
import CustomSearchInput from 'Components/CommonLayouts/SearchInput';
import CustomAdminBreadScrumbs from 'Components/CommonLayouts/CustomAdminBreadScrumbs';
import ManageConsultantTable from 'Components/Admin/ManageConsultant/ManageConsultantTable';


const page = () => {

    const [alignment, setAlignment] = React.useState('all');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <>
            <CustomAdminBreadScrumbs text='Manage consultants' />
            <Box sx={{ backgroundColor: "white" }}>
                <Container
                    maxWidth="lg"
                >
                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ color: "#000" }}>
                            Hi, Anand Gupta (Admin)
                        </Typography>
                        <Typography variant="h2" sx={{ color: "#000" }}>
                            Manage Consultants
                        </Typography>
                    </Box>
                </Container>
            </Box>
            <Container>
                <Card sx={{ mb: 2 }}>
                    <CustomSearchInput />
                </Card>
                <ManageConsultantTable />
            </Container>
        </>
    )
}

export default page
