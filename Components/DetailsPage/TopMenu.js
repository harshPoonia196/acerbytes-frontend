import React from 'react'
import { ToggleButtonGroup, ToggleButton } from '@mui/material'
import { listOfTabsInProperty } from 'Components/CommonLayouts/CommonUtils'
import { useRouter } from 'next/navigation'

function TopMenu({ value, handleChange }) {

    const router = useRouter()

    return (
        <ToggleButtonGroup
            color="primary"
            value={value}
            exclusive
            fullWidth
            onChange={handleChange}
            aria-label="Platform"
        >
            {
                listOfTabsInProperty.map((current) => (
                    <ToggleButton
                        sx={{
                            // justifyContent: 'flex-start'
                        }}
                        fullWidth
                        size="small"
                        value={current.value}
                        onClick={() => router.push(`#${current.value}`)}
                    >
                        {current.label}
                    </ToggleButton>
                ))
            }
        </ToggleButtonGroup>
    )
}

export default TopMenu