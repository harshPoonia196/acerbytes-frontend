import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const NavTab = () => {

    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
      }

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
        <Tab label="Project" />
        <Tab label="Location" />
        <Tab label="Landscape" />
        <Tab label="Floor plans" />
        <Tab label="Regulatory" />
        <Tab label="Construction" />
        <Tab label="Builder price" />
        <Tab label="Resale price" />
        <Tab label="Investment" />
        <Tab label="Bank" />
        <Tab label="Facilities" />
        <Tab label="Near by" />
        <Tab label="Landmarks" />
        <Tab label="Marketing" />
      </Tabs>
    </>
  )
}

export default NavTab
