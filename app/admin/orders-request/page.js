import { Box, Container, Typography } from '@mui/material'
import OrdersTable from 'Components/Admin/OrdersRequest/OrdersTable'

import CustomAdminBreadScrumbs from 'Components/CommonLayouts/CustomAdminBreadScrumbs'
import React from 'react'

function OrderRequest() {
    return (
        <>

            <CustomAdminBreadScrumbs text='Orders request' />

            <Container>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Orders request (Admin)
                </Typography>
                <OrdersTable />
            </Container>
        </>
    )
}

export default OrderRequest