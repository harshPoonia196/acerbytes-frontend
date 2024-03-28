'use client'

import { Card, Container, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useState } from 'react'
import CustomAdminBreadScrumbs from 'Components/CommonLayouts/CustomAdminBreadScrumbs';
import ConsultantLinksTable from 'Components/Admin/ConsultantLinks/ConsultantLinksTable';
import InfoBox from 'Components/CommonLayouts/CommonHeader';
import { useAuth } from 'utills/AuthContext';
import { capitalLizeName } from 'utills/CommonFunction';

const page = () => {
		const { userDetails } = useAuth();
        const [alignment, setAlignment] = useState('');
		const [count, setCount] = useState(0);
		const name = userDetails?.name?.firstName && userDetails?.name?.lastName ? `${userDetails.name.firstName} ${userDetails.name.lastName}` : "";
        const [activeCount, setActiveCount] = useState(0);
        const [expiredCount, setExpiredCount] = useState(0);

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <>
            <CustomAdminBreadScrumbs text='Consultant links' />
            <InfoBox
                title={`${capitalLizeName(name)} (${capitalLizeName(userDetails?.role)})`}
                subtitle={`${count && count} property consultant links are currently active`}
        
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
                        <ToggleButton size='small' value="" sx={{ flex: 1, border: 'none', padding: '10px' }}>All ({count && count})</ToggleButton>
                        <ToggleButton size='small' value="Active" sx={{ flex: 1, border: 'none', padding: '10px' }}>Active ({activeCount})</ToggleButton>
                        <ToggleButton size='small' value="Expired" sx={{ flex: 1, border: 'none', padding: '10px' }}>Expired ({expiredCount})</ToggleButton>
                        {/* <ToggleButton size='small' value="Expiring Soon" sx={{ flex: 1, border: 'none' }}>Expiring&nbsp;soon (10)</ToggleButton> */}
                    </ToggleButtonGroup>
                </Card>
                <ConsultantLinksTable setCount={setCount} alignmentValue={alignment} setActiveCount={setActiveCount} setExpiredCount={setExpiredCount}/>
            </Container>
        </>
    )
}

export default page
