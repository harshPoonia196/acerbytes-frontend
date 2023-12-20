import { Tab, Tabs } from '@mui/material'
import { tabsClasses } from '@mui/material/Tabs'
import React from 'react'

function NavTabProfilePage({ value, handleChange, list }) {
    return (
        <Tabs
            value={value ? value : list[0].value}
            // onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="visible arrows tabs example fghj"
            sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                    '&.Mui-disabled': { opacity: 0.3 },
                },
                
            }}
        >
            {list.map((data,index) => <Tab key={data.hash} label={data.text} value={data.hash} onClick={handleChange(data.hash)}  sx={{
            marginLeft: index === 0 ? 0 : 'auto',
            marginRight: index === list.length - 1 ? 0 : 'auto',
          }}/>)}
        </Tabs>
    )
}

export default NavTabProfilePage