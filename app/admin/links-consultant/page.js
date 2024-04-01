'use client'

import { Card, Container, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CustomAdminBreadScrumbs from 'Components/CommonLayouts/CustomAdminBreadScrumbs';
import ConsultantLinksTable from 'Components/Admin/ConsultantLinks/ConsultantLinksTable';
import InfoBox from 'Components/CommonLayouts/CommonHeader';
import { useAuth } from 'utills/AuthContext';
import { capitalLizeName } from 'utills/CommonFunction';

const page = () => {
		const { userDetails } = useAuth();
        const [alignment, setAlignment] = useState('');
		const name = userDetails?.name?.firstName && userDetails?.name?.lastName ? `${userDetails.name.firstName} ${userDetails.name.lastName}` : "";
        const [dashboardInfo, setDashboardInfo] = useState({ noOfAll: 0, noOfActive: 0, noOfExpired: 0, noOfExpiringSoon: 0 });

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const handleDashboardDataUpdate = ({ countInfo }) => {
        setDashboardInfo(countInfo);
      }

    useEffect(() => {
       
    }, [dashboardInfo]);

    return (
        <>
            <CustomAdminBreadScrumbs text='Consultant links' />
            <InfoBox
                title={`${capitalLizeName(name)} (${capitalLizeName(userDetails?.role)})`}
                subtitle={`${dashboardInfo?.noOfActive} property consultant links are currently active`}
        
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
                        <ToggleButton size='small' value="" sx={{ flex: 1, border: 'none', padding: '10px' }}>All ({dashboardInfo?.noOfAll})</ToggleButton>
                        <ToggleButton size='small' value="Active" sx={{ flex: 1, border: 'none', padding: '10px' }}>Active ({dashboardInfo?.noOfActive})</ToggleButton>
                        <ToggleButton size='small' value="Expired" sx={{ flex: 1, border: 'none', padding: '10px' }}>Expired ({dashboardInfo?.noOfExpired})</ToggleButton>
                        <ToggleButton size='small' value="Expiring Soon" sx={{ flex: 1, border: 'none' }}>Expiring&nbsp;soon ({dashboardInfo?.noOfExpiringSoon})</ToggleButton>
                    </ToggleButtonGroup>
                </Card>
                <ConsultantLinksTable onDashboardDataUpdate={handleDashboardDataUpdate} alignmentValue={alignment}/>
            </Container>
        </>
    )
}

export default page
