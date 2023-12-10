import React from 'react'
import { Tabs, Tab, Card, Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import colors from 'styles/theme/colors'

function TopMenu({ value, handleChange }) {

    const router = useRouter()

    const listOfTabs = [
        {
            label: 'Project',
            value: 'project'
        }, {
            label: 'Builder',
            value: 'builder'
        }, {
            label: 'Landscape',
            value: 'landscape'
        }, {
            label: 'Amenities',
            value: 'amenities'
        }, {
            label: 'Clearance',
            value: 'clearance'
        }, {
            label: 'Pricing',
            value: 'pricing'
        }, {
            label: 'Value for money',
            value: 'value'
        }, {
            label: 'Units',
            value: 'units'
        }, {
            label: 'Floor design',
            value: 'floordesign'
        }, {
            label: 'Floor area',
            value: 'floorarea'
        }, {
            label: 'Location',
            value: 'location'
        }, {
            label: 'Assesment',
            value: 'assesment'
        }
    ]

    return (
        <>
            <Card
                sx={{
                    p: 2,
                    display: "flex",
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <Typography
                        variant="h2"
                        sx={{ fontWeight: "700 !important" }}
                    >
                        Prateek Canary
                    </Typography>
                    <Typography variant="h5" sx={{ alignSelf: "center" }}>
                        Under Construction &#183; ₹ 2.5 Cr – ₹ 5.6 Cr &#183; Sector 43, Noida, UP
                    </Typography>
                </Box>
                <Box sx={{ alignSelf: "center" }}>
                    <Card
                        sx={{
                            width: "fit-content",
                            backgroundColor: colors?.BLUE,
                            borderRadius: "4px !important",
                            m: 0,
                            ml: "auto !important",
                        }}
                        onClick={() => router.push("/research")}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                width: "fit-content",
                                color: "white",
                                p: 0.5,
                                px: 1,
                            }}
                        >
                            99
                        </Typography>
                    </Card>
                </Box>
            </Card>

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