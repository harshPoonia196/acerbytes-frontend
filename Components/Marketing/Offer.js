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
  import ImageOne from "public/images/image1.jpg";
  import ImageTwo from "public/images/image2.jpg";
  import ImageThree from "public/images/image3.jpg";
  import ImageFour from "public/images/image4.jpg";
  import ImageFive from "public/images/image5.webp";
  
  const offers = [
    {
        id: 1,
        title: "Get a personalised link generated",
        subTitle: 'Title',
        image: ImageOne,
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
        image: ImageTwo,
        content: [
            'Get noticed by Customers who are enquiring',
            'Improve your chances of Customer reaches out to you by linking your name / contact to well researched property page',
        ]
    },
    {
        id: 3,
        title: "Get a panel to manage leads, notes and status",
        subTitle: 'Title',
        image: ImageThree,
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
        image: ImageFour,
        content: [
            'High chance of converting',
        ]
    },
    {
        id: 5,
        title: "Get personalised Digital Marketing",
        subTitle: 'Title',
        image: ImageFive,
        content: [
            'Low cost Digital marketing with Specialist',
            'Market your presence and brand'
        ]
    }
  ]
  
  const OfferCard = ({offer}) => {
    return(
        <Grid container className='offers'>
            <Grid item xs={12} sm={6} className='leftCard' sx={{padding:0, background: "#c1c1c1", position: "relative" }}>
                <CardMedia
                    sx={{ height: {xs: 200, sm: 250} }}
                    image={offer?.image?.src}
                    title={offer.title}
                />
                <Box sx={{color: 'white', background: "transparent", p: 4, zIndex: 1, boxShadow: "1px 2px 6px -2px gainsboro!important", height: "100%", width: "100%", position: "absolute", top: 0, left: 0, color: 'white'}}>
                    <Typography variant='h2' fontWeight="bold" sx={{fontSize: "3.5rem", color: 'white'}}>{offer.id}</Typography>
                    <Typography variant="h4" fontWeight="bold" sx={{fontSize: "2rem", color: 'white'}}>{offer.title}</Typography>
                </Box>
                <div className='overlay'></div>
            </Grid>
            <Grid item xs={12} sm={6} className='rightCard' sx={{padding:0, background: '#fff'}}>
                <Box sx={{padding: 4, height: "100%", boxShadow: "0px 2px 8px -1px gainsboro!important"}}>
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
        </Grid>
    )
  }


function Offer() {

  return (
    <Container maxWidth="lg">
        <Box sx={{ mt: 1}}>
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