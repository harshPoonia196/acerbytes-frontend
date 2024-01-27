import { Box, Container, Typography } from '@mui/material'
import CreditTable from 'Components/Admin/CreditStatus/CreditTable'

import CustomAdminBreadScrumbs from 'Components/CommonLayouts/CustomAdminBreadScrumbs'
import React from 'react'

function CreditStatus() {
    return (
        <>
            <CustomAdminBreadScrumbs text='Credit point status' />
            <Container>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Credit point status (Admin)
                </Typography>

                <CreditTable />
            </Container>
        </>
    )
}

export default CreditStatus