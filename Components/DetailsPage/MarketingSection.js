import { Avatar, Box, Card, Grid, Typography } from '@mui/material'
import React, { useRef, useEffect, useState } from 'react'

function MarketingSection({ refCallback }) {

    const myDivRef = useRef(null);

    const [width, setWidth] = useState()


    useEffect(() => {
        if (myDivRef.current) {
            const myDiv = myDivRef.current;
            const widthCal = myDiv.offsetWidth;
            setWidth(widthCal)
            console.log('Width of the div:', width, 'pixels');
        }
    }, []);

    return (
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
        </Card >
    )
}

export default MarketingSection