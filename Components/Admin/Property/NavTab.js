import React, { useState } from 'react'
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useRouter } from 'next/navigation';
import { listOfTabsInAddProperty } from 'utills/Constants';

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
