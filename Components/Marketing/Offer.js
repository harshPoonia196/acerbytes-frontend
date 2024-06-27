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
  import DoneAllIcon from '@mui/icons-material/DoneAll';

  const offers = [
    {
        id: 1,
        title: "",
        subTitle: 'Get a personalised link generated',
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
        title: "",
        subTitle: 'Get your name and contact added to most viewed property pages',
        image: ImageTwo,
        content: [
            'Get noticed by Customers who are enquiring',
            'Improve your chances of Customer reaches out to you by linking your name / contact to well researched property page',
        ]
    },
    {
        id: 3,
        title: "",
        subTitle: 'Get a panel to manage leads, notes and status',
        image: ImageThree,
        content: [
            'Easy and convenient way to manage leads status',
            'Update notes on your latest conversation',
            'Make the next action'
        ]
    },
    {
        id: 4,
        title: "",
        subTitle: 'Get Verified Customers enquiries for specific locations and projects',
        image: ImageFour,
        content: [
            'High chance of converting',
        ]
    },
    {
        id: 5,
        title: "",
        subTitle: 'Get personalised Digital Marketing',
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
                    sx={{ height: {xs: 250, sm: 300} }}
                    image={offer?.image?.src}
                    title={offer.title}
                />
                <Box sx={{color: 'white', background: "transparent", p: 4, zIndex: 1, boxShadow: "1px 2px 6px -2px gainsboro!important", height: "100%", width: "100%", position: "absolute", top: 0, left: 0, color: 'white'}}>
                    
                    <Typography variant="h4" fontWeight="bold" sx={{fontSize: {md: "2rem !important", xs:"1.4rem !important"}, color: 'white'}}>{offer.title}</Typography>
                </Box>
                <div className='overlay'></div>
            </Grid>
            <Grid item xs={12} sm={6} className='rightCard' sx={{padding:0, background: '#fff'}}>
                <Box sx={{padding: 4, height: "100%", boxShadow: "0px 2px 8px -1px gainsboro!important"}}>
                {/* <Typography variant='h2' fontWeight="bold" sx={{fontSize: {md: "3.5rem !important", xs: "2.5rem !important"}}}>{offer.id}</Typography> */}
                    <Typography variant="h2" fontWeight="bold" sx={{mb: 2, fontSize: {md: "2rem !important", xs: "1.3rem !important"}}}>{offer.subTitle}</Typography>
                    <ol>
                        {offer?.content?.map(item => {
                            return(
                            <li><Typography variant='body1' sx={{display: "inline-block", paddingLeft: "8px"}}>{item}</Typography></li> 
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