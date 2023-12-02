import { Box, Card, Grid, Typography } from '@mui/material'
import React from 'react'

function MarketingSection() {
    return (
        <Card sx={{ p: 2, display: 'flex', background: 'whitesmoke' }}>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ my: 2 }}>
                    Bytes44
                </Typography>
                <Typography variant="h2" sx={{ mt: 2 }}>
                    Prateek Canary
                </Typography>
                <Typography variant='h4' sx={{ mb: 2 }}>
                    Noida expressway
                </Typography>
                <Typography variant='h1'>77</Typography>
                <Typography variant='h4' sx={{ mb: 2 }}>
                    Excellent
                </Typography>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant='h3'>
                            9.8
                        </Typography>
                        <Typography variant='h6'>
                            Investment
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h3'>
                            8.8
                        </Typography>
                        <Typography variant='h6'>
                            Facilities
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h3'>
                            9
                        </Typography>
                        <Typography variant='h6'>
                            Construction
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h3'>
                            10
                        </Typography>
                        <Typography variant='h6'>
                            Location
                        </Typography>
                    </Grid>
                </Grid>

            </Box>
            <Box sx={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ flex: 1 }}>
                    <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" height={180} />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" height={180} />
                </Box>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ flex: 1 }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30144.970768064195!2d72.8535903!3d19.1899016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6ee06ebad2b%3A0x9c288235c433657d!2sInfiniti%20Mall!5e0!3m2!1sen!2sin!4v1694174929476!5m2!1sen!2sin"
                        style={{ border: 0 }}
                        height="100%"
                        width="100%"
                        loading="lazy"
                    />
                </Box>
                <Box sx={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h2">
                        Are you interested
                    </Typography>
                    <Typography variant="h5">
                        Connect with approved consultants
                    </Typography>
                </Box>
            </Box>
        </Card>
    )
}

export default MarketingSection