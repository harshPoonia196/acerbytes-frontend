'use client'

import { Box, Card, Container, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react'
import CustomSearchInput from 'Components/CommonLayouts/SearchInput';
import CustomAdminBreadScrumbs from 'Components/CommonLayouts/CustomAdminBreadScrumbs';
import ManageConsultantTable from 'Components/Admin/ManageConsultant/ManageConsultantTable';
import InfoBox from 'Components/CommonLayouts/CommonHeader';

const page = () => {

    const [alignment, setAlignment] = React.useState('all');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <>
            <CustomAdminBreadScrumbs text='Manage consultants' />
            <InfoBox
                title="Anand Gupta(Admin)"
                subtitle="3,344 property consultant links are currently active"

            />
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
