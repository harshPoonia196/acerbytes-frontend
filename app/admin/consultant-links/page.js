'use client'

import { Box, Card, Container, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react'
import CustomSearchInput from 'Components/CommonLayouts/SearchInput';
import CustomAdminBreadScrumbs from 'Components/CommonLayouts/CustomAdminBreadScrumbs';
import ConsultantLinksTable from 'Components/Admin/ConsultantLinks/ConsultantLinksTable';

const page = () => {

    const [alignment, setAlignment] = React.useState('all');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <>
            <Box sx={{ backgroundColor: "white" }}>
                <Container
                    maxWidth="lg"
                    sx={{ pb: "0 !important" }}
                >
                    <CustomAdminBreadScrumbs text='Consultant links' />
                    <Box sx={{ py: 4 }}>
                        <Typography variant="h2" sx={{ color: "#000" }}>
                            Hi, Anand Gupta (Admin)
                        </Typography>
                        <Typography variant="h2" sx={{ color: "#000" }}>
                            3,344 property consultant links are currently active
                        </Typography>
                    </Box>
                </Container>
            </Box>
            <Container>
                <Card sx={{ mb: 2 }}>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                        sx={{
                            display: 'flex',
                            overflowX: 'auto',
                        }}
                    >
                        <ToggleButton size='small' value="all" sx={{ flex: 1, border: 'none' }}>All(10)</ToggleButton>
                        <ToggleButton size='small' value="active" sx={{ flex: 1, border: 'none' }}>Active(10)</ToggleButton>
                        <ToggleButton size='small' value="expired" sx={{ flex: 1, border: 'none' }}>Expired(10)</ToggleButton>
                        <ToggleButton size='small' value="expiringSoon" sx={{ flex: 1, border: 'none' }}>Expiring&nbsp;soon(10)</ToggleButton>
                    </ToggleButtonGroup>
                </Card>
                <Card sx={{ mb: 2 }}>
                    <CustomSearchInput />
                </Card>
                <ConsultantLinksTable />
            </Container>
        </>
    )
}

export default page
