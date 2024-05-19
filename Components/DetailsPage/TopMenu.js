import React from 'react'
import { Tabs, Tab, Card, Box, Typography, tabsClasses, Chip } from '@mui/material'
import { useRouter } from 'next/navigation'
import colors from 'styles/theme/colors'
import Image from 'next/image'
import CircularWithValueLabel from 'Components/CommonLayouts/CircularProgressWithLabel'
import { boxShadowBottom } from 'utills/Constants'

function TopMenu(props) {
    const { value, handleChange, list, topMenu } = props
    const router = useRouter()
    // console.log(value)
    return (
        <>
            <Card
                sx={{ p: 2 }}
            >
                <Box sx={{ display: "flex" }}>
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {value && value !== 'project' && <Image
                                src={topMenu?.marketing?.image}
                                width={100}
                                height={50}
                                alt="Picture of the author"
                            />}
                            <Box>
                                <Typography
                                    variant="h2"
                                    sx={{ fontWeight: "700 !important", display: { xs: 'none', sm: 'block' } }}
                                >
                                    {topMenu?.overview?.builder} · {topMenu?.overview?.projectName}
                                </Typography>
                                <Typography
                                    variant="h3"
                                    sx={{ fontWeight: "700 !important", display: { xs: 'block', sm: 'none' } }}
                                >
                                    {topMenu?.overview?.builder} · {topMenu?.overview?.projectName}
                                </Typography>
                                <Typography variant="h5" sx={{ alignSelf: "center", textTransform: 'capitalize' }}>
                                    {topMenu?.location?.sector}, {topMenu?.location?.city}, {topMenu?.location?.state}
                                    {/* &#183; ₹ 2.5 Cr – ₹ 5.6 Cr &#183;  */}
                                </Typography>
                                <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                                    {topMenu?.overview?.status &&
                                        <Chip label={topMenu?.overview?.status}
                                            color='primary' size='small' />
                                    }
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', gap: 1 }}>
                        <Box>
                            <CircularWithValueLabel onClick={() => router.push("/research")}
                                progress={topMenu?.overallAssessment?.score} islarge />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'space-between', gap: 1 }}>
                    <Box sx={{ alignSelf: 'center' }}>
                        {topMenu?.overview?.status &&
                            <Chip label={topMenu?.overview?.status} color='primary' size='small' />
                        }
                    </Box>
                    <Box>
                        <CircularWithValueLabel onClick={() => router.push("/research")}
                            progress={topMenu?.overallAssessment?.score} />
                    </Box>
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
                    boxShadow: boxShadowBottom
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