import { Chip, Box, Card, Container, Grid, Typography, Divider } from '@mui/material'
import NewKeyValuePairStructure from 'Components/CommonLayouts/NewKeyValuePairStructure';
import React, { useRef, useEffect, useState } from 'react'
import colors from 'styles/theme/colors';

function MarketingSection({ refCallback }) {

    const myDivRef = useRef(null);

    const [width, setWidth] = useState()

    const GridItem = (props) => {
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
                        ...boxStyles,
                    }}
                >
                    {children}
                </Box>
            </Grid>
        );
    };


    // useEffect(() => {
    //     if (myDivRef.current) {
    //         const myDiv = myDivRef.current;
    //         const widthCal = myDiv.offsetWidth;
    //         setWidth(widthCal)
    //         console.log('Width of the div:', width, 'pixels');
    //     }
    // }, []);

    return (
        <>
            <Card sx={{
                background: 'whitesmoke',
                display: 'flex',
                height: '70vh',
                position: 'relative',
            }} ref={refCallback} id='project'>
                <Box sx={{
                    flex: 1,
                    backgroundImage: 'URL(https://lh3.googleusercontent.com/p/AF1QipN7N4JlL5zR8A0bTIa1uYmWuu4RKhGVmxiv9lhB=s1360-w1360-h1020)',
                    backgroundPosition: 'center center',
                    // backgroundRepeat: 'no-repeat'
                    backgroundSize: 'cover',
                }}></Box>
                {/* <Box sx={{
                flex: 1,
                backgroundImage: 'URL(https://is1-3.housingcdn.com/4f2250e8/d4c49fdb7326f44a91dadd6ac1b4462d/v0/medium/prateek_canary-sector_150-noida-prateek_group.jpeg)',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat'
            }}></Box> */}

                <Box sx={{ backgroundImage: 'linear-gradient(240deg,transparent,rgba(37,37,37,.21),#111);', height: '70vh', width: '100%', position: 'absolute', top: 0, left: 0 }}>

                </Box>
                <Card sx={{ position: 'absolute', top: 24, left: 24, opacity: 0.85, display: 'flex' }}>
                    <Box ref={myDivRef} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h2">
                            Prateek Canary
                        </Typography>
                        <Typography variant='h4' sx={{ mb: 2 }}>
                            Noida expressway
                        </Typography>
                        <Typography variant='h1'>77<Typography variant='h6' component='span'> / 100</Typography></Typography>
                        <Typography variant='h4' sx={{ mb: 2 }}>
                            Excellent
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Typography variant='h2'>
                                    9.8<Typography variant='h6' component='span'> / 10</Typography>
                                </Typography>
                                <Typography variant='h6'>
                                    Investment
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='h2'>
                                    8.8<Typography variant='h6' component='span'> / 10</Typography>
                                </Typography>
                                <Typography variant='h6'>
                                    Facilities
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='h2'>
                                    9<Typography variant='h6' component='span'> / 10</Typography>
                                </Typography>
                                <Typography variant='h6'>
                                    Construction
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='h2'>
                                    10<Typography variant='h6' component='span'> / 10</Typography>
                                </Typography>
                                <Typography variant='h6'>
                                    Location
                                </Typography>
                            </Grid>

                        </Grid>
                    </Box>
                    <Box>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30144.970768064195!2d72.8535903!3d19.1899016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6ee06ebad2b%3A0x9c288235c433657d!2sInfiniti%20Mall!5e0!3m2!1sen!2sin!4v1694174929476!5m2!1sen!2sin"
                            style={{ border: 0 }}
                            height="100%"
                            width={width}
                            loading="lazy"
                        />
                    </Box>
                </Card>
            </Card>
            <Container maxWidth="evmd" sx={{ pb: '0 !important' }}>
                <Card id="builder" ref={refCallback}>
                    <Box sx={{ display: 'flex', p: 2 }}>
                        <Typography variant='h4' sx={{ flex: 1, alignSelf: 'center' }}>
                            Builder
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
                    <Grid container spacing={1} sx={{ p: 2 }}>
                        <NewKeyValuePairStructure label="Builder" value="Prateek" />
                        <NewKeyValuePairStructure label="Project name" value="Canary" />
                        <NewKeyValuePairStructure label="Project type" value="Residential" />
                        <NewKeyValuePairStructure label="Project category" value="Luxury flats" />
                        <NewKeyValuePairStructure label="Expected possession" value="2025" />
                    </Grid>
                </Card>
            </Container >
        </>
    )
}

export default MarketingSection