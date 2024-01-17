import React, { useState } from 'react'
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { listOfTabsInAddProperty } from 'utills/CommonFunction';
import { useRouter } from 'next/navigation';

const NavTab = ({ value, handleChange, list }) => {

  const router = useRouter()

  return (

    <Tabs
      value={value ? value : listOfTabsInAddProperty[0].value}
      // onChange={handleChange}
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
        list.map(data => <Tab key={data.hash} label={data.text} value={data.hash} onClick={handleChange(data.hash)} />)
      }
    </Tabs>
  )
}

export default NavTab
