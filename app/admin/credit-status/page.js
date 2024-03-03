import { Box, Container, Typography, Card } from '@mui/material'
import CreditTable from 'Components/Admin/CreditStatus/CreditTable'

import CustomAdminBreadScrumbs from 'Components/CommonLayouts/CustomAdminBreadScrumbs'
import InfoBox from 'Components/CommonLayouts/CommonHeader'
// import CustomSearchInput from 'Components/CommonLayouts/SearchInput';
import React from 'react'

function CreditStatus() {
    return (
        <>
            <CustomAdminBreadScrumbs text='Credit point status' />
            <InfoBox
                title="Anand Gupta(Admin)"
                subtitle="3,344 property consultant links are currently active"
            />
            <Container>
                <CreditTable />
            </Container>
        </>
    )
}

export default CreditStatus