import React from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { listOfTabsInProperty } from 'Components/CommonLayouts/CommonUtils'

function LeftSideLink({ value, handleChange }) {
    return (
        <ToggleButtonGroup
            color="primary"
            value={value}
            exclusive
            fullWidth
            onChange={handleChange}
            aria-label="Platform"
            sx={{ display: "flex", flexDirection: "column" }}
        >
            {
                listOfTabsInProperty.map((current) => (
                    <ToggleButton
                        sx={{
                            border: "1px solid gainsboro !important",
                            borderRadius: "0 !important",
                            justifyContent: 'flex-start'
                        }}
                        fullWidth
                        size="small"
                        value={current.value}>
                        {current.label}
                    </ToggleButton>
                ))
            }
            <ToggleButton
                sx={{
                    border: "1px solid gainsboro !important",
                    borderRadius: "0 !important",
                    justifyContent: 'flex-start'
                }}
                fullWidth
                size="small"
                value="marketing"
            >
                Marketing
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default LeftSideLink