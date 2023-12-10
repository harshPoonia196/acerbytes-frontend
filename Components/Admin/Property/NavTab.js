import React, { useState } from 'react'
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { listOfTabsInAddProperty } from 'Components/CommonLayouts/CommonUtils';
import { useRouter } from 'next/navigation';

const NavTab = ({ value, handleChange }) => {

  const router = useRouter()

  return (
    <>
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
        {
          listOfTabsInAddProperty.map(data => <Tab label={data.label} value={data.value} onClick={() => router.push(`#${data.value}`)} />)
        }
      </Tabs>
    </>
  )
}

export default NavTab
