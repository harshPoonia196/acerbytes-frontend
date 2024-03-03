import { Box, Container, Typography, Card } from '@mui/material'
import OrdersTable from 'Components/Admin/OrdersRequest/OrdersTable'

import CustomAdminBreadScrumbs from 'Components/CommonLayouts/CustomAdminBreadScrumbs'
import InfoBox from 'Components/CommonLayouts/CommonHeader'
// import CustomSearchInput from 'Components/CommonLayouts/SearchInput'
import React from 'react'

function OrderRequest() {
    return (
        <>
            <CustomAdminBreadScrumbs text='Orders request' />
            <InfoBox
                title="Anand Gupta(Admin)"
                subtitle="3,344 property consultant links are currently active"
            />
            <Container>
                <OrdersTable />
            </Container>
        </>
    )
}

export default OrderRequest