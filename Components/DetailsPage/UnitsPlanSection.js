import React from 'react'
import { Grid, Card, Typography, Box, Divider, Rating } from '@mui/material'
import NewKeyValuePairStructure from 'Components/CommonLayouts/NewKeyValuePairStructure'
import { useRouter } from 'next/navigation'
import colors from 'styles/theme/colors'

function UnitsPlanSection(props) {
    const  {refCallback, unitsPlan} = props
    const router = useRouter()

    const GridItemWithCard = (props) => {
        const { children, styles, boxStyles, ...rest } = props;
        return (
            <Grid
                item
                {...rest}
                sx={{
                    textAlign: "center",
                    ...styles,
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "whitesmoke",
                        p: 2,
                        borderRadius: "8px",
                        boxShadow:
                            "0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)",
                        ...boxStyles,
                    }}
                >
                    {children}
                </Box>
            </Grid>
        );
    };

    return (
        <Grid item xs={12} ref={refCallback} id='unitsPlan' >
            <Card>
                <Box sx={{ p: 2, display: 'flex' }}>
                    <Typography variant='h4' sx={{ flex: 1, alignSelf: 'center' }}>
                        Units plan
                    </Typography>
                    <Box sx={{ alignSelf: "center" }}>
                        <Card
                            sx={{
                                width: "fit-content",
                                backgroundColor: colors?.BLACK,
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
                                    cursor: 'pointer'
                                }}
                            >
                                99
                            </Typography>
                        </Card>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                        <GridItemWithCard
                            xs={6}
                            sm={3}
                            boxStyles={{ backgroundColor: "none" }}
                        >
                            <Typography variant="subtitle1">3 BHK</Typography>
                            <img
                                width="100%"
                                alt=""
                                src="https://projectcdn.99acres.com/project_data/8d33f2/block1_1927/3D/5309_B1_1F1_3D.jpg"
                            />

                            <Typography variant="h5">1545 Sq ft</Typography>
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                ₹ 2.3 Cr
                            </Typography>
                        </GridItemWithCard>
                    </Grid>
                </Box>
            </Card>
        </Grid>
    )
}

export default UnitsPlanSection