import React from 'react'
import { ToggleButtonGroup, ToggleButton, Tabs, Tab } from '@mui/material'
import { useRouter } from 'next/navigation'

function TopMenu({ value, handleChange }) {

    const router = useRouter()

    const listOfTabs = [
        {
            label: 'Project',
            value: 'project'
        }, {
            label: 'Location',
            value: 'location'
        }, {
            label: 'Landscape',
            value: 'landscape'
        }, {
            label: 'Floor plans',
            value: 'floorplans'
        }, {
            label: 'Regulatory',
            value: 'regulatory'
        }, {
            label: 'Construction',
            value: 'construction'
        }, {
            label: 'Builder price',
            value: 'builderPrice'
        }, {
            label: 'Resale price',
            value: 'resalePrice'
        }, {
            label: 'Investment',
            value: 'investment'
        }, {
            label: 'Bank',
            value: 'bank'
        }, {
            label: 'Facilities',
            value: 'facilities'
        }, {
            label: 'Near by',
            value: 'nearby'
        }, {
            label: 'Landmarks',
            value: 'landmarks'
        }
    ]

    return (
        <>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                {
                    listOfTabs.map((current) => (
                        <Tab label={current.label} value={current.value} onClick={() => router.push(`#${current.value}`)} />
                    ))
                }
            </Tabs>
        </>
    )
}

export default TopMenu