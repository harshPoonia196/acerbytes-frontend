import React from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

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
            <ToggleButton
                sx={{
                    border: "1px solid gainsboro !important",
                    borderRadius: "0 !important",
                    justifyContent: 'flex-start'
                }}
                fullWidth
                size="small"
                value="location"
            >
                Location
            </ToggleButton>

            <ToggleButton
                sx={{
                    border: "1px solid gainsboro !important",
                    borderRadius: "0 !important",
                    justifyContent: 'flex-start'
                }}
                fullWidth
                size="small"
                value="project"
            >
                Project
            </ToggleButton>
            <ToggleButton
                sx={{
                    border: "1px solid gainsboro !important",
                    borderRadius: "0 !important",
                    justifyContent: 'flex-start'
                }}
                fullWidth
                size="small"
                value="unitType"
            >
                Unit type
            </ToggleButton>
            <ToggleButton
                sx={{
                    border: "1px solid gainsboro !important",
                    borderRadius: "0 !important",
                    justifyContent: 'flex-start'
                }}
                fullWidth
                size="small"
                value="documentation"
            >
                Documentation
            </ToggleButton>
            <ToggleButton
                sx={{
                    border: "1px solid gainsboro !important",
                    borderRadius: "0 !important",
                    justifyContent: 'flex-start'
                }}
                fullWidth
                size="small"
                value="bank"
            >
                Bank
            </ToggleButton>
            <ToggleButton
                sx={{
                    border: "1px solid gainsboro !important",
                    borderRadius: "0 !important",
                    justifyContent: 'flex-start'
                }}
                fullWidth
                size="small"
                value="status"
            >
                Status
            </ToggleButton>
            <ToggleButton
                sx={{
                    border: "1px solid gainsboro !important",
                    borderRadius: "0 !important",
                    justifyContent: 'flex-start'
                }}
                fullWidth
                size="small"
                value="price"
            >
                Price
            </ToggleButton>
            <ToggleButton
                sx={{
                    border: "1px solid gainsboro !important",
                    borderRadius: "0 !important",
                    justifyContent: 'flex-start'
                }}
                fullWidth
                size="small"
                value="sports"
            >
                Sports
            </ToggleButton>
            <ToggleButton
                sx={{
                    border: "1px solid gainsboro !important",
                    borderRadius: "0 !important",
                    justifyContent: 'flex-start'
                }}
                fullWidth
                size="small"
                value="Leisure"
            >
                leisure
            </ToggleButton>
            <ToggleButton
                sx={{
                    border: "1px solid gainsboro !important",
                    borderRadius: "0 !important",
                    justifyContent: 'flex-start'
                }}
                fullWidth
                size="small"
                value="Status"
            >
                status
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default LeftSideLink