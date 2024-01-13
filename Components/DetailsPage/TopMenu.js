import React from 'react'
import { Tabs, Tab, Card, Box, Typography, tabsClasses } from '@mui/material'
import { useRouter } from 'next/navigation'
import colors from 'styles/theme/colors'

function TopMenu({ value, handleChange, list }) {

    const router = useRouter()

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
                    list.map((current) => (
                        <Tab label={current.text} value={current.hash} onClick={handleChange(current.hash)} />
                    ))
                }
            </Tabs >
        </>
    )
}

export default TopMenu