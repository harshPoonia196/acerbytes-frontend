import React from 'react'
import {
    Box,
    Typography,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Tooltip,
    Container
  } from "@mui/material";
  
  const offers = [
    {
        id: 1,
        title: "Get a personalised link generated",
        subTitle: 'Title',
        content: [
            'Use link to market on social medial platforms',
            'Generated leads are received',
            'All leads are verified and self enquired',
            'Benefit 3'
        ]
    },
    {
        id: 2,
        title: "Get your name and contact added to most viewed property pages",
        subTitle: 'Get linked to a Property page',
        content: [
            'Get noticed by Customers who are enquiring',
            'Improve your chances of Customer reaches out to you by linking your name / contact to well researched property page',
        ]
    },
    {
        id: 3,
        title: "Get a panel to manage leads, notes and status",
        subTitle: 'Title',
        content: [
            'Easy and convenient way to manage leads status',
            'Update notes on your latest conversation',
            'Make the next action'
        ]
    },
    {
        id: 4,
        title: "Get Verified Customers enquiries for specific locations and projects",
        subTitle: 'Access verified leads',
        content: [
            'High chance of converting',
        ]
    },
    {
        id: 5,
        title: "Get personalised Digital Marketing",
        subTitle: 'Title',
        content: [
            'Low cost Digital marketing with Specialist',
            'Market your presence and brand'
        ]
    }
  ]
  
  const OfferCard = ({offer}) => {
    console.log("offer", offer);
    return(
        <Grid container spacing={2} className='offers'>
            <Grid item xs={12} sm={6} className='leftCard' sx={{p:0, background: '#e6e6e6'}}>
                <Box sx={{background: "transparent", padding: 6, pt: 2}}>
                    <Typography variant="h4" sx={{mb: 2}}>{offer.subTitle}</Typography>
                    <ol style={{ paddingLeft: "16px" }}>
                        {offer?.content?.map(item => {
                            return(
                            <li><Typography variant='body1'>{item}</Typography></li> 
                            )
                        })}
                    </ol>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} className='rightCard' sx={{p:0, background: "#c1c1c1"}} >
                <Box sx={{background: "transparent", p: 6, pt: 2}}>
                    <Typography variant='h2' fontWeight="bold">{offer.id}</Typography>
                    <Typography variant="h4" fontWeight="bold">{offer.title}</Typography>
                </Box>
            </Grid>
        </Grid>
    )
  }


function Offer() {

  return (
    <Container maxWidth="lg">
        <Box sx={{ mt: 4}}>
            
                {offers && offers.map((offer) => {
                    return(
                        <OfferCard offer={offer} key={offer.id}/>
                    )
                })}
            
        </Box>
    </Container>
  )
}

export default Offer