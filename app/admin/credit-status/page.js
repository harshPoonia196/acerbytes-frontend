import { Box, Container, Typography } from '@mui/material'
import OrdersTable from 'Components/Admin/OrdersRequest/OrdersTable'
import CustomAdminBreadScrumbs from 'Components/CommonLayouts/CustomAdminBreadScrumbs'
import React from 'react'

function CreditStatus() {
    return (
        <>
            <CustomAdminBreadScrumbs text='Credit status' />
            <Container>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Credit status (Admin)
                </Typography>
                <OrdersTable />
            </Container>
        </>
    )
}

export default CreditStatus