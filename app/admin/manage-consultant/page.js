'use client'

import React from 'react'
import CustomAdminBreadScrumbs from 'Components/CommonLayouts/CustomAdminBreadScrumbs';
import ManageConsultantTable from 'Components/Admin/ManageConsultant/ManageConsultantTable';

const page = () => {

    const [alignment, setAlignment] = React.useState('all');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <>
            <CustomAdminBreadScrumbs text='Manage consultants' />
            <ManageConsultantTable />
        </>
    )
}

export default page
