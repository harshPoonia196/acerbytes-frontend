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
                value="landscape"
            >
                Landscape
            </ToggleButton>
            <ToggleButton
                sx={{
                    border: "1px solid gainsboro !important",
                    borderRadius: "0 !important",
                    justifyContent: 'flex-start'
                }}
                fullWidth
                size="small"
                value="floorplans"
            >
                Floor plans
            </ToggleButton>
            <ToggleButton
                sx={{
                    border: "1px solid gainsboro !important",
                    borderRadius: "0 !important",
                    justifyContent: 'flex-start'
                }}
                fullWidth
                size="small"
                value="regulatory"
            >
                Regulatory
            </ToggleButton>
            <ToggleButton
                sx={{
                    border: "1px solid gainsboro !important",
                    borderRadius: "0 !important",
                    justifyContent: 'flex-start'
                }}
                fullWidth
                size="small"
                value="construction"
            >
                Construction
            </ToggleButton>
            <ToggleButton
                sx={{
                    border: "1px solid gainsboro !important",
                    borderRadius: "0 !important",
                    justifyContent: 'flex-start'
                }}
                fullWidth
                size="small"
                value="builderPrice"
            >
                Builder price
            </ToggleButton>
            <ToggleButton
                sx={{
                    border: "1px solid gainsboro !important",
                    borderRadius: "0 !important",
                    justifyContent: 'flex-start'
                }}
                fullWidth
                size="small"
                value="resalePrice"
            >
                Resale price
            </ToggleButton>
            <ToggleButton
                sx={{
                    border: "1px solid gainsboro !important",
                    borderRadius: "0 !important",
                    justifyContent: 'flex-start'
                }}
                fullWidth
                size="small"
                value="investment"
            >
                Investment
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
                value="facilities"
            >
                Facilities
            </ToggleButton>
            <ToggleButton
                sx={{
                    border: "1px solid gainsboro !important",
                    borderRadius: "0 !important",
                    justifyContent: 'flex-start'
                }}
                fullWidth
                size="small"
                value="nearby"
            >
                Near by
            </ToggleButton>
            <ToggleButton
                sx={{
                    border: "1px solid gainsboro !important",
                    borderRadius: "0 !important",
                    justifyContent: 'flex-start'
                }}
                fullWidth
                size="small"
                value="landmarks"
            >
                Landmarks
            </ToggleButton>
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
                marketing
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export default LeftSideLink