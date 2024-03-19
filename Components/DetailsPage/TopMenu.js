import React from 'react'
import { Tabs, Tab, Card, Box, Typography, tabsClasses } from '@mui/material'
import { useRouter } from 'next/navigation'
import colors from 'styles/theme/colors'

function TopMenu(props) {
    const { value, handleChange, list, topMenu } = props
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
                        {topMenu?.overview?.projectName}
                    </Typography>
                    <Typography variant="h5" sx={{ alignSelf: "center" }}>
                        {topMenu?.overview?.status},  {topMenu?.location?.sector}, {topMenu?.location?.city}, {topMenu?.location?.state}
                        {/* &#183; ₹ 2.5 Cr – ₹ 5.6 Cr &#183;  */}
                    </Typography>
                </Box>
                <Box>
                    <Card
                        sx={{
                            width: "fit-content",
                            backgroundColor: colors?.BLUE,
                            borderRadius: "4px !important",
                            m: 0,
                            ml: "auto !important",
                            cursor: 'pointer'
                        }}
                        onClick={() => router.push("/research")}
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 600,
                                width: "fit-content",
                                color: "white",
                                p: 1,
                            }}
                        >
                            {topMenu?.overallAssessment?.score}
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