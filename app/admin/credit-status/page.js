"use client";

import { Box, Container, Typography, Card } from '@mui/material'
import CreditTable from 'Components/Admin/CreditStatus/CreditTable'

import CustomAdminBreadScrumbs from 'Components/CommonLayouts/CustomAdminBreadScrumbs'
import InfoBox from 'Components/CommonLayouts/CommonHeader'
// import CustomSearchInput from 'Components/CommonLayouts/SearchInput';
import React, { useState } from 'react'

function CreditStatus() {
    const [dashboardInfo, setDashboardInfo] = useState({});
    const [userDetails, setUserDetails] = useState({});

    const handleDashboardDataUpdate = ({ countInfo, userDetails }) => {
        setDashboardInfo(countInfo);
        setUserDetails(userDetails || {});
    }

    return (
        <>
            <CustomAdminBreadScrumbs text='Credit point status' />
            <InfoBox
                title={Object.keys(userDetails).length > 0 ? `${userDetails?.name?.firstName} ${userDetails?.name?.lastName}(${userDetails?.role})` : ""}
                subtitle={Object.keys(dashboardInfo).length > 0 ? `Consultants: ${dashboardInfo.count}` : ''}
            />
            <Container>
                <CreditTable onDashboardDataUpdate={handleDashboardDataUpdate} />
            </Container>
        </>
    )
}

export default CreditStatus