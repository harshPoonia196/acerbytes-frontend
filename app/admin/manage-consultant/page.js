'use client'

import React from 'react'
import CustomAdminBreadScrumbs from 'Components/CommonLayouts/CustomAdminBreadScrumbs';
import ManageConsultantTable from 'Components/Admin/ManageConsultant/ManageConsultantTable';
import { getLoggedInUser } from 'utills/utills'

const page = () => {
    const [alignment, setAlignment] = React.useState('all'),

        user = getLoggedInUser(),
        handleChange = (event, newAlignment) => {
            setAlignment(newAlignment);
        };

    return (
        <>
            <CustomAdminBreadScrumbs text='Manage consultants' />
            <ManageConsultantTable user={user} />
        </>
    )
}

export default page
