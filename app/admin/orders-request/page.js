"use client";
import { Box, Container, Typography, Card, Grid } from '@mui/material'
import OrdersTable from 'Components/Admin/OrdersRequest/OrdersTable'

import CustomAdminBreadScrumbs from 'Components/CommonLayouts/CustomAdminBreadScrumbs'
import InfoBox from 'Components/CommonLayouts/CommonHeader'
// import CustomSearchInput from 'Components/CommonLayouts/SearchInput'
import React, { useState } from 'react'

function OrderRequest() {
    const [dashboardInfo, setDashboardInfo] = useState({});
    const [userDetails, setUserDetails] = useState({});

    const handleDashboardDataUpdate = ({ countInfo, userDetails }) => {
        setDashboardInfo(countInfo);
        setUserDetails(userDetails || {});
    }

    return (
        <>
            <CustomAdminBreadScrumbs text='Orders request' />

            <InfoBox dataList={[{ label: 'Pending', value: dashboardInfo.pendingOrders },
            { label: 'Completed', value: dashboardInfo.completedOrders }]}/>

            <Container>
                <OrdersTable onDashboardDataUpdate={handleDashboardDataUpdate} />
            </Container>
        </>
    )
}

export default OrderRequest