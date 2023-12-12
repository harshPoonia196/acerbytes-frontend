import { Tab, Tabs } from '@mui/material'
import { tabsClasses } from '@mui/material/Tabs'
import { listOfProfileTab } from 'Components/CommonLayouts/CommonUtils'
import { useRouter } from 'next/navigation'
import React from 'react'

function NavTabProfilePage({ value, handleChange }) {
    const router = useRouter()
    return (
        <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="visible arrows tabs example"
            sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                    '&.Mui-disabled': { opacity: 0.3 },
                },
            }}
        >
            {listOfProfileTab.map(data => <Tab label={data.label} value={data.value} onClick={() => router.push(`#${data.value}`)} />)}
        </Tabs>
    )
}

export default NavTabProfilePage