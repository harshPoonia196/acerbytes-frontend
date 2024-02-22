'use client'

import { Box, Card, Container, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react'
import CustomSearchInput from 'Components/CommonLayouts/SearchInput';
import CustomAdminBreadScrumbs from 'Components/CommonLayouts/CustomAdminBreadScrumbs';
import ConsultantLinksTable from 'Components/Admin/ConsultantLinks/ConsultantLinksTable';
import InfoBox from 'Components/CommonLayouts/CommonHeader';

const page = () => {

    const [alignment, setAlignment] = React.useState('all');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <>
            <CustomAdminBreadScrumbs text='Consultant links' />
            <InfoBox
        title="Anand Gupta(Admin)"
        subtitle="3,344 property consultant links are currently active"
        
      />
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
                        <ToggleButton size='small' value="all" sx={{ flex: 1, border: 'none' }}>All (10)</ToggleButton>
                        <ToggleButton size='small' value="active" sx={{ flex: 1, border: 'none' }}>Active (10)</ToggleButton>
                        <ToggleButton size='small' value="expired" sx={{ flex: 1, border: 'none' }}>Expired (10)</ToggleButton>
                        <ToggleButton size='small' value="expiringSoon" sx={{ flex: 1, border: 'none' }}>Expiring&nbsp;soon (10)</ToggleButton>
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
