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

            <Box sx={{ backgroundColor: "white" }}>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        {dashboardInfo.pendingOrders &&
                            <Grid item xs={6} sm={4} md={2}>
                                <Card sx={{ p: 2, textAlign: 'center' }}>
                                    <Typography variant="h3">{`${dashboardInfo.pendingOrders}`}</Typography>
                                    <Typography variant="h6">Pending</Typography>
                                </Card>
                            </Grid>
                        }
                        {dashboardInfo.completedOrders &&
                            <Grid item xs={6} sm={4} md={2}>
                                <Card sx={{ p: 2, textAlign: 'center' }}>
                                    <Typography variant="h3">{`${dashboardInfo.completedOrders}`}</Typography>
                                    <Typography variant="h6">Completed</Typography>
                                </Card>
                            </Grid>
                        }
                    </Grid>
                </Container>
            </Box>
            <Container>
                <OrdersTable onDashboardDataUpdate={handleDashboardDataUpdate} />
            </Container>
        </>
    )
}

export default OrderRequest